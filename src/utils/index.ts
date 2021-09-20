import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const isFalsy = (param: unknown) => (param === 0 ? false : !param);
export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === '';

/**
 * @description 清除对象上没有值的键
 * @param object 需要清理的对象
 * @returns 清理完成的对象
 */
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
};

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};

export const useArray = <V>(arr: Array<V>) => {
    const [value, setValue] = useState(arr);

    const clear: () => void = () => {
        setValue([]);
    };

    const removeIndex = (index: number): void => {
        const res = [...value];
        res.splice(index, 1);
        setValue(res);
    };

    const add = (item: V): void => {
        const res = [...value, item];
        setValue(res);
    };

    return {
        value,
        clear,
        removeIndex,
        add
    };
};

export const useDocumentTitle = (
    title: string,
    keepOnUnmount: boolean = false
) => {
    // useRef 创建一个在整个 hook 生命周期中不会改变的值
    // 使用 useRef 而非闭包来保存，是为了解决 react 对没有收集 oldTitle 作为依赖的警告
    // 如果使用闭包变量并且还添加了依赖的话，那么 oldTitle 的值在每次渲染后都会变为新的 title，
    // 就失去了保存原来旧 title 的目的
    const oldTitle = useRef(document.title).current;
    // const oldTitle = document.title;
    // useEffect 中如果使用了外部的变量或者状态，而没有在第二个参数中加入依赖的话，就会产生闭包的问题
    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle;
            }
        };
    }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    // useMemo 会返回一个 被缓存的值，而 useEffect 返回的是 销毁钩子
    // 这里如果不使用 useMemo 的话，每次组件重新渲染，这里就会返回一个新生成的对象，
    // 由于新老对象的地址不同（===），就会被认为是不同的对象，继而又触发渲染，
    // 陷入无限渲染
    // 使用 useMemo 的返回值，相当于是只在初次渲染时建立了一个缓存的公共常量对象
    // 以后每次的修改都会取这个对象
    return [
        useMemo(
            () =>
                keys.reduce((initValue, key) => {
                    initValue[key] = searchParams.get(key) ?? '';
                    return initValue;
                }, {} as { [key in K]: any }),
            [searchParams, keys]
        ),
        setSearchParams
    ] as const;
};
