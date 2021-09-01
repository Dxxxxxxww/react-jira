import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from '../../utils';
import { http } from 'utils/http';

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

    useEffect(() => {
        http(`/projects`, { data: cleanObject(debouncedValue) }).then(
            async (response) => {
                if (response.ok) {
                    setList(await response.json());
                }
            }
        );
    }, [debouncedValue]);

    useMount(() => {
        http(`/users`).then(async (response) => {
            if (response.ok) {
                const { result } = await response.json();
                setUsers(result.userOptions);
            }
        });
    });

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
};
