import { useCallback, useState } from 'react';
import { useMountRef } from './index';

interface State<D> {
    data: D | null;
    error: Error | null;
    status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitState: State<null> = {
    data: null,
    error: null,
    status: 'idle'
};

const defaultConfig = {
    throwError: false
};

export const useAsync = <D>(
    initState?: State<D>,
    initConfig?: typeof defaultConfig
) => {
    const config = {
        ...defaultConfig,
        ...initConfig
    };
    const [state, setState] = useState({
        ...defaultInitState,
        ...initState
    });
    // 初始值必须为一个返回函数的函数
    const [retry, setRetry] = useState(() => () => {});
    // 设置一个挂载标识
    const mountedRef = useMountRef();

    const setData = useCallback((data: D) => {
        setState({
            data,
            error: null,
            status: 'success'
        });
    }, []);

    const setError = (error: Error) => {
        setState({
            data: null,
            error,
            status: 'error'
        });
    };

    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry?: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入 promise');
            }
            setState((prevState) => ({ ...prevState, status: 'loading' }));
            // 保存重新加载的请求函数
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            return promise
                .then((result) => {
                    if (mountedRef.current) {
                        setData(result);
                    }
                    return result;
                })
                .catch((error) => {
                    setError(error);
                    if (config.throwError) {
                        return Promise.reject(error);
                    }
                    return error;
                });
        },
        [config.throwError, mountedRef, setData]
    );

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
    };
};
