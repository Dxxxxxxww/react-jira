export const isFalsy = (param) => (param === 0 ? false : !param);

export const cleanupObject = (object) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isFalsy(value)) {
            delete result[key];
        }
    });
    return result;
};
