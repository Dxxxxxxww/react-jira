import { useEffect, useRef, useState } from 'react';
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
    // 使用 useRef 而非闭包来保存在整个 hook 生命周期中不会改变的值，解决 react 的警告
    const oldTitle = useRef(document.title).current;
    // const oldTitle = document.title;

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

export const useUrlQueryParam = (keys: string[]) => {
    const [searchParams] = useSearchParams();
    keys.reduce((initValue, key) => {
        initValue[key] = searchParams.get(key) ?? '';
        return initValue;
    }, {} as { [key: string]: string });
};
