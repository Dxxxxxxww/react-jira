import { useCallback, useReducer, useState } from 'react'
import { useMountRef } from './index'

interface State<D> {
    data: D | null
    error: Error | null
    status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitState: State<null> = {
    data: null,
    error: null,
    status: 'idle'
}

const defaultConfig = {
    throwError: false
}

// 从功能上来说，useState 与 useReducer 可以互换的，用其中一个实现的功能，使用另一个也是可以实现的
// useState 适合定义单个的状态，useReducer 适合定义一群/多个互相影响的状态
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    // 设置一个挂载标识
    const mountedRef = useMountRef()
    return useCallback(
        (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
        [dispatch, mountedRef]
    )
}

export const useAsync = <D>(
    initState?: State<D>,
    initConfig?: typeof defaultConfig
) => {
    const config = {
        ...defaultConfig,
        ...initConfig
    }
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({
            ...state,
            ...action
        }),
        {
            ...defaultInitState,
            ...initState
        }
    )
    // 初始值必须为一个返回函数的函数
    const [retry, setRetry] = useState(() => () => {})
    // 获取有保护的 dispatch
    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback(
        (data: D) => {
            safeDispatch({
                data,
                error: null,
                status: 'success'
            })
        },
        [safeDispatch]
    )

    const setError = useCallback(
        (error: Error) => {
            safeDispatch({
                data: null,
                error,
                status: 'error'
            })
        },
        [safeDispatch]
    )

    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry?: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入 promise')
            }
            safeDispatch({ status: 'loading' })
            // 保存重新加载的请求函数
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig)
                }
            })
            return promise
                .then((result) => {
                    setData(result)
                    return result
                })
                .catch((error) => {
                    setError(error)
                    if (config.throwError) {
                        return Promise.reject(error)
                    }
                    return error
                })
        },
        [config.throwError, setData, setError, safeDispatch]
    )

    return {
        isIdle: state.status === 'idle',
        isLoading: state.status === 'loading',
        isError: state.status === 'error',
        isSuccess: state.status === 'success',
        setData,
        setError,
        run,
        retry,
        ...state
    }
}
