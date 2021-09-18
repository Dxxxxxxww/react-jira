import { useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDocumentTitle, useMount, useUrlQueryParam } from '../../utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjectList } from '../../api/project-list/project-list';

export const ProjectListScreen = () => {
    // select options 用户下拉框数据
    const [users, setUsers] = useState([]);
    // input 输入参数
    const [, setParam] = useState({
        name: '',
        personId: 0
    });
    const [param] = useUrlQueryParam(['name', 'personId']);
    // table 展示的请求结果
    const client = useHttp();
    const { isLoading, error, data } = useProjectList(param);
    // useMount 的回调参数可以加上 async
    useMount(async () => {
        client(`users`)
            .then(({ userOptions }) => {
                setUsers(userOptions);
            })
            .catch((message) => {
                console.log(message);
            });
    });

    useDocumentTitle('项目列表');

    return (
        <Container>
            <SearchPanel users={users} param={param} setParam={setParam} />
            {error ? (
                <Typography.Text type="danger">{error.message}</Typography.Text>
            ) : null}
            <List
                users={users}
                dataSource={data?.projectList ?? []}
                loading={isLoading}
            />
        </Container>
    );
};

const Container = styled.div`
    padding: 3.2rem;
`;
