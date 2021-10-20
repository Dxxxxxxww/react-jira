import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDocumentTitle, useUrlQueryParam } from '../../utils'
import styled from '@emotion/styled'
import { Row, Typography } from 'antd'
import { useProjectList } from '../../api/project-list/project-list'
import { useUsers } from '../../api/users/users'

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
    useDocumentTitle('项目列表')
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const { isLoading, error, data, retry } = useProjectList(param)
    const { users } = useUsers()

    return (
        <Container>
            <Row justify="space-between">
                <h1>项目列表</h1>
                {props.projectButton || null}
            </Row>
            <SearchPanel users={users} param={param} setParam={setParam} />
            {error ? (
                <Typography.Text type="danger">{error.message}</Typography.Text>
            ) : null}
            <List
                users={users}
                dataSource={data?.projectList ?? []}
                loading={isLoading}
                refresh={retry}
                projectButton={props.projectButton}
            />
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding: 3.2rem;
`
