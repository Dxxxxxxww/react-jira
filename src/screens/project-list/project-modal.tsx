import { Button, Drawer } from 'antd'

export const ProjectModal = (props: {
    visible: boolean
    handleClose: (value: boolean) => void
}) => {
    return (
        <Drawer
            width={'100%'}
            visible={props.visible}
            onClose={() => props.handleClose(false)}
        >
            <h1>Project Model</h1>
            <Button onClick={() => props.handleClose(false)}>关闭</Button>
        </Drawer>
    )
}
