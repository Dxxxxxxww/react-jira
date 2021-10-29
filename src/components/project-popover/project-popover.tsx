import { Divider, List, Popover, Typography } from 'antd'
import { useProjectList } from '../../api/project-list/project-list'
import styled from '@emotion/styled'
import { ButtonNoPadding } from '../styled-components'
import { useDispatch } from 'react-redux'
import { projectListActions } from '../../screens/project-list/project-list.slice'

export const ProjectPopover = () => {
    const { data } = useProjectList()
    const projectList = data?.projectList
    const dispatch = useDispatch()

    const content = (
        <ContentContainer>
            <Typography.Text type="secondary">收藏项目</Typography.Text>
            <List>
                {projectList
                    ?.filter((project) => project.pin)
                    .map((project) => (
                        <List.Item key={project.id}>
                            <List.Item.Meta title={project.projectName} />
                        </List.Item>
                    ))}
            </List>
            <Divider />
            <ButtonNoPadding
                type={'link'}
                onClick={() => dispatch(projectListActions.openProjectModal())}
            >
                创建
            </ButtonNoPadding>
        </ContentContainer>
    )
    return (
        <Popover trigger="hover" placement="bottom" content={content}>
            <span>项目</span>
        </Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`
