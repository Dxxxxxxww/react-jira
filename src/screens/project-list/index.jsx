import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "../../utils";

const apiUrl = process.env.REACT_APP_BASE_URL;
export const ProjectListScreen = () => {
    // select options 用户下拉框数据
    const [users, setUsers] = useState([]);

    // input 输入参数
    const [param, setParam] = useState({
        name: "",
        id: "",
    });
    // table 展示的请求结果
    const [list, setList] = useState([]);
    const debouncedValue = useDebounce(param, 2000);

    useEffect(() => {
        fetch(
            `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedValue))}`
        ).then(async (response) => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [debouncedValue]);

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json());
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
