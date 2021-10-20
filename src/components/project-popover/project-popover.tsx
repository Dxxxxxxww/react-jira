import { Divider, List, Popover, Typography } from 'antd'
import { useProjectList } from '../../api/project-list/project-list'
import styled from '@emotion/styled'

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
    const { data } = useProjectList()
    const projectList = data?.projectList

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
            {props.projectButton || null}
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
