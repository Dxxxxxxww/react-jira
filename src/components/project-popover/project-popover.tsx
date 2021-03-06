import { Divider, List, Popover, Typography } from 'antd'
import { useProjectList } from '../../api/project-list/project-list'
import styled from '@emotion/styled'
import { ButtonNoPadding } from '../lib'
import { useProjectModal } from '../../screens/project-list/utils'
import { Project } from '../../types'

export const ProjectPopover = () => {
    const { data } = useProjectList()
    const { open } = useProjectModal()
    const pinnedProjects = data?.projectList?.filter(
        (project: Project) => project.pin
    )

    const content = (
        <ContentContainer>
            <Typography.Text type="secondary">收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((project: Project) => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.projectName} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            <ButtonNoPadding type={'link'} onClick={open}>
                创建项目
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
