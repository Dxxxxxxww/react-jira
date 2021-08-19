import React, { ReactNode, useContext, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../screens/project-list/search-panel";

interface AuthForm {
    username: string;
    password: string;
}

const AuthContext = React.createContext<
    | {
          user: User | null;
          login: (form: AuthForm) => void;
          register: (form: AuthForm) => void;
          logout: () => void;
      }
    | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => {};
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
        throw new Error("useAuth 必须在 AuthProvider 中使用");
    }
    return context;
};
