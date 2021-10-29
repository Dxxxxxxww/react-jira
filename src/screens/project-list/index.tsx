import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDocumentTitle, useUrlQueryParam } from '../../utils'
import styled from '@emotion/styled'
import { Row, Typography } from 'antd'
import { useProjectList } from '../../api/project-list/project-list'
import { useUsers } from '../../api/users/users'
import { ButtonNoPadding } from '../../components/styled-components'
import { useDispatch } from 'react-redux'
import { projectListActions } from './project-list.slice'

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表')
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const { isLoading, error, data, retry } = useProjectList(param)
    const { users } = useUsers()
    const dispatch = useDispatch()

    return (
        <Container>
            <Row justify="space-between">
                <h1>项目列表</h1>
                <ButtonNoPadding
                    type={'link'}
                    onClick={() =>
                        dispatch(projectListActions.openProjectModal())
                    }
                >
                    创建项目
                </ButtonNoPadding>
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
            />
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding: 3.2rem;
`
