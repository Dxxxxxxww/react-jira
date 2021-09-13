import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from '../../utils';
import { useHttp } from 'utils/http';

export const ProjectListScreen = () => {
    // select options 用户下拉框数据
    const [users, setUsers] = useState([]);

    // input 输入参数
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    // table 展示的请求结果
    const [list, setList] = useState([]);
    const debouncedValue = useDebounce(param, 200);
    const client = useHttp();
    // useEffect 的回调参数不能加上 async
    useEffect(() => {
        client(`projects`, { data: cleanObject(debouncedValue) })
            .then(({ result }) => {
                setList(result.projectList);
            })
            .catch(({ message }) => {
                console.log(message);
            });
    }, [client, debouncedValue]);
    // useMount 的回调参数可以加上 async
    useMount(async () => {
        client(`users`)
            .then(({ result }) => {
                setUsers(result.userOptions);
            })
            .catch(({ message }) => {
                console.log(message);
            });
    });

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
};
