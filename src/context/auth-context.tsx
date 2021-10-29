import React, { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import { AuthForm, User } from '../types'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from '../utils/use-async'
import { FullPageError, FullPageLoading } from '../components/styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as authStore from 'store/auth.slice'
import { bootstrap, selectUser } from 'store/auth.slice'

export const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        user = await http('userInfo', { token })
    }
    return user
}
// 这里已经不再是一个 context 了，只是一个普通的组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()

    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

    useMount(
        useCallback(async () => {
            // async 标记的函数返回值都会变成 promise
            await run(dispatch(bootstrap()))
        }, [run, dispatch])
    )

    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageError error={error} />
    }

    return <div>{children}</div>
}

export const useAuth = () => {
    // 这里需要给 dispatch 加上类型声明，显示声明下面三个函数返回的是 promise
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    const user = useSelector(selectUser)
    const login = useCallback(
        (form: AuthForm) => dispatch(authStore.login(form)),
        [dispatch]
    )
    const register = useCallback(
        (form: AuthForm) => dispatch(authStore.register(form)),
        [dispatch]
    )
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

    return {
        user,
        login,
        register,
        logout
    }
}
