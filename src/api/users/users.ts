import { useHttp } from '../../utils/http';
import { useCallback, useState } from 'react';
import { useMount } from '../../utils';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const client = useHttp();
    // useMount 的回调参数可以加上 async
    useMount(
        useCallback(() => {
            client(`users`)
                .then(({ userOptions }) => {
                    setUsers(userOptions);
                })
                .catch((message) => {
                    console.log(message);
                });
        }, [client])
    );

    return { users };
};
