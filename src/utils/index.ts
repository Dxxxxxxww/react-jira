import { useEffect, useState } from "react";

export const isFalsy = (param: unknown) => (param === 0 ? false : !param);

export const cleanObject = (object: object) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        // @ts-ignore
        const value = result[key];
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key];
        }
    });
    return result;
};

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line
    }, []);
};

export const useDebounce = (value: unknown, delay?: number): any => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};
