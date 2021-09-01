import { getToken } from 'auth-provider';
import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';

interface Config extends RequestInit {
    token?: string;
    data?: object;
    contentType?: string;
}
const apiUrl = process.env.REACT_APP_BASE_URL;

/**
 * @description 底层 fetch 包装
 * @param endpoint 接口地址
 * @param config 配置参数
 * @returns 请求结果
 */
export const http = (
    endpoint: string,
    // 当一个参数有默认值时，自动变为可选
    { contentType, data, ...customConfig }: Config = {}
) => {
    const token = getToken();
    const config: Config = {
        headers: {
            Authorization: token ? ` Bearer ${token}` : '',
            'Content-Type': contentType ?? 'application/json'
        },
        method: 'GET',
        ...customConfig
    };
    // 根据 method 将请求参数传入不同位置
    if (config.method?.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data ?? {});
    }
    // axios 和 fetch 的区别，axios可以直接在返回状态不为2xx的时候抛出异常
    return fetch(`${apiUrl}${endpoint}`, config).then(async (res) => {
        if (res.status === 401) {
            await auth.logout();
            window.location.reload();
            return Promise.reject({ message: '请重新登录' });
        }
        const data = await res.json();
        if (res.ok) {
            return data;
        }
        return Promise.reject(data);
    });
};

export const useHttp = ([endpoint, config]: Parameters<typeof http>) => {
    const { user } = useAuth();
    return http(endpoint, { token: user?.token, ...config });
};
