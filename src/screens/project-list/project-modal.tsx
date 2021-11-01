import { Button, Drawer } from 'antd'
import { useProjectModal } from './utils'

export const ProjectModal = () => {
    const { projectModalOpen, close } = useProjectModal()
    return (
        <Drawer width={'100%'} visible={projectModalOpen} onClose={close}>
            <h1>Project Model</h1>
            <Button onClick={close}>关闭</Button>
        </Drawer>
    )
}
