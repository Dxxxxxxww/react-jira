import { FormEvent } from "react";

interface LoginParam {
    username: string;
    password: string;
}

const apiUrl = process.env.REACT_APP_BASE_URL;

export const Login = () => {
    const login = (param: LoginParam) => {
        fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
        }).then(async (response) => {
            if (response.ok) {
            }
        });
    };

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
        </div>
    );
};
