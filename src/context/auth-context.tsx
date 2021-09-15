import React, { ReactNode, useContext, useState } from 'react';
import * as auth from 'auth-provider';
import { User } from '../screens/project-list/search-panel';
import { http } from 'utils/http';
import { useMount } from 'utils';

interface AuthForm {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        user = await http('info', { token });
    }
    return user;
};

const AuthContext = React.createContext<
    | {
          user: User | null;
          login: (form: AuthForm) => void;
          register: (form: AuthForm) => void;
          logout: () => void;
      }
    | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(async () => {
        // async 标记的函数返回值都会变成 promise，所以这里需要 then 来接受
        bootstrapUser().then(setUser);
        // 又或者这里也是用 async await 包裹一层
        // setUser(await bootstrapUser());
    });

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
