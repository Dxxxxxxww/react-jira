import { FormEvent } from "react";
import { useAuth } from "../../context/auth-context";

export const Login = () => {
    const { user, login } = useAuth();

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const username = (evt.currentTarget.elements[0] as HTMLInputElement)
            .value;
        const password = (evt.currentTarget.elements[1] as HTMLInputElement)
            .value;

        login({ username, password });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">用户名：</label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">密码：</label>
                    <input type="password" id="password" />
                </div>
                <button type="submit">登录</button>
            </form>
            <div>
                {user ? <div>登录成功！用户名为：{user?.name}</div> : null}
            </div>
        </div>
    );
};
