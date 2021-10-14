import React, { ReactNode, useCallback, useContext } from 'react';
import * as auth from 'auth-provider';
import { User } from '../types';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from '../utils/use-async';
import {
    FullPageError,
    FullPageLoading
} from '../components/full-page/full-page';

interface AuthForm {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        user = await http('userInfo', { token });
    }
    return user;
};

const AuthContext = React.createContext<
    | {
          user: User | null;
          login: (form: AuthForm) => Promise<void>;
          register: (form: AuthForm) => Promise<void>;
          logout: () => void;
      }
    | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        run,
        setData: setUser
    } = useAsync<User | null>();

    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(
        useCallback(async () => {
            // async 标记的函数返回值都会变成 promise
            await run(bootstrapUser());
        }, [run])
    );

    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }

    if (isError) {
        return <FullPageError error={error} />;
    }

    return (
        <AuthContext.Provider
            children={children}
            value={{ user, login, register, logout }}
        />
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用');
    }
    return context;
};
