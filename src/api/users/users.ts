import { useHttp } from '../../utils/http';
import { useState } from 'react';
import { useMount } from '../../utils';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const client = useHttp();
    // useMount 的回调参数可以加上 async
    useMount(() => {
        client(`users`)
            .then(({ userOptions }) => {
                setUsers(userOptions);
            })
            .catch((message) => {
                console.log(message);
            });
    });

    return { users };
};
