import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDocumentTitle, useUrlQueryParam } from '../../utils'
import styled from '@emotion/styled'
import { Row, Typography } from 'antd'
import { useProjectList } from '../../api/project-list/project-list'
import { useUsers } from '../../api/users/users'
import { ButtonNoPadding, ErrorBox } from '../../components/lib'
import { useProjectModal } from './utils'

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表')
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const { isLoading, error, data } = useProjectList(param)
    const { users } = useUsers()
    const { open } = useProjectModal()

    return (
        <Container>
            <Row justify="space-between">
                <h1>项目列表</h1>
                <ButtonNoPadding type={'link'} onClick={open}>
                    创建项目
                </ButtonNoPadding>
            </Row>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <ErrorBox error={error} />
            <List
                users={users}
                dataSource={data?.projectList ?? []}
                loading={isLoading}
            />
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding: 3.2rem;
`
