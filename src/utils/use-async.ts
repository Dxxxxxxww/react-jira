import { useState } from 'react';

interface State<D> {
    data: D | null;
    error: Error | null;
    status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitState: State<null> = {
    data: null,
    error: null,
    status: 'idle'
};

const defaultConfig = {
    throwError: false
};

export const useAsync = <D>(
    initState?: State<D>,
    initConfig?: typeof defaultConfig
) => {
    const [state, setState] = useState({
        ...defaultInitState,
        ...initState
    });
    const config = {
        ...defaultConfig,
        ...initConfig
    };

    const setData = (data: D) => {
        setState({
            data,
            error: null,
            status: 'success'
        });
    };

    const setError = (error: Error) => {
        setState({
            data: null,
            error,
            status: 'error'
        });
    };

    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 promise');
        }
        setState({ ...state, status: 'loading' });
        return promise
            .then((result) => {
                setData(result);
                return result;
            })
            .catch((error) => {
                setError(error);
                if (config.throwError) {
                    return Promise.reject(error);
                }
                return error;
            });
    };

    return {
        isIdle: state.status === 'idle',
        isLoading: state.status === 'loading',
        isError: state.status === 'error',
        isSuccess: state.status === 'success',
        setData,
        setError,
        run,
        ...state
    };
};
