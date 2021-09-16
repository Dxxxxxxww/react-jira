import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';
import { API_STATUS } from '../assets/constant';

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
    { contentType, token, data, ...customConfig }: Config = {}
) => {
    token = token ?? auth.getToken();
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
    return fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
        if (res.status === 401) {
            await auth.logout();
            window.location.reload();
            return Promise.reject({ message: '请重新登录' });
        }
        const { code, result, message } = await res.json();
        if (res.ok && code === API_STATUS.OK) {
            return result;
        }
        return Promise.reject({
            code,
            result,
            message: message ?? '服务端异常，请与管理员确认'
        });
    });
};

// 使用 useHttp 封装从 user 中拿取 token 是因为相对于从内存中拿数据来说，localstorage 中拿数据太慢了
export const useHttp = () => {
    const { user } = useAuth();
    // utility type 用法： 使用泛型传入一个类型，utility type 会对这个类型进行某种操作
    return (...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, { token: user?.token, ...config });
};
