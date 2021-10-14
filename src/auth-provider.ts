// 模拟第三方auth服务
import { User } from './types';
import { API_STATUS } from './assets/constant';

const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_BASE_URL;

export const getToken = () =>
    window.localStorage.getItem(localStorageKey) ?? '';

export const handleUserResponse = (user: User) => {
    window.localStorage.setItem(localStorageKey, user.token ?? '');
    return user;
};

export const login = (params: { username: string; password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(async (response) => {
        const data = await response.json();
        if (response.ok && data.code === API_STATUS.OK) {
            return handleUserResponse(data.result);
        }
        return Promise.reject(data);
    });
};

export const register = (params: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
            return handleUserResponse(data);
        }
        return Promise.reject(data);
    });
};

export const logout = async () =>
    window.localStorage.removeItem(localStorageKey);
