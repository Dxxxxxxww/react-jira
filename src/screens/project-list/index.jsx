import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

const apiUrl = process.env.REACT_APP_BASE_URL;
export const ProjectListScreen = () => {
    // select options 用户下拉框数据
    const [users, setUsers] = useState([]);

    // input 输入参数
    const [param, setParam] = useState({
        name: "",
        personId: "",
    });
    // table 展示的请求结果
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/projects`).then(async (response) => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [param]);

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    }, []);

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
};
