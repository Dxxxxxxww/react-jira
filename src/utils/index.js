import { useEffect, useState } from "react";

export const isFalsy = (param) => (param === 0 ? false : !param);

export const cleanObject = (object) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isFalsy(value)) {
            delete result[key];
        }
    });
    return result;
};

export const useMount = (callback) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line
    }, []);
};

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};
