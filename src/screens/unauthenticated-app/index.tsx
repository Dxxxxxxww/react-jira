import { Login } from './login';
import { Register } from './register';
import { useState } from 'react';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div>
            {isRegister ? <Register /> : <Login />}
            <button onClick={() => setIsRegister(!isRegister)}>
                切换{isRegister ? '登录' : '注册'}
            </button>
        </div>
    );
};
