import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useProjectModal } from './utils'
import { UserSelect } from '../../components/user-select/user-select'
import {
    useAddProject,
    useEditProject
} from '../../api/project-list/project-list'
import { useForm } from 'antd/es/form/Form'
import { ErrorBox } from '../../components/lib'
import { useEffect } from 'react'
import styled from '@emotion/styled'

export const ProjectModal = () => {
    // 获取模态窗状态及方法
    const { projectModalOpen, close, editingProject, isLoading } =
        useProjectModal()
    const useMutateProjet = editingProject ? useEditProject : useAddProject
    // 获取请求函数及对应状态
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProjet()
    // 获取 form 实例
    const [form] = useForm()
    // 表单提交
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields()
            close()
        })
    }

    setTimeout(() => console.log(editingProject), 3000)

    const title = editingProject ? '编辑项目' : '创建项目'
    // 当项目信息改变时，重置表单
    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])

    return (
        <Drawer
            forceRender={true}
            width={'100%'}
            visible={projectModalOpen}
            onClose={close}
        >
            <Container>
                {isLoading ? (
                    <Spin size={'large'} />
                ) : (
                    <>
                        <h1>{title}</h1>
                        <ErrorBox error={error} />
                        <Form
                            form={form}
                            layout={'vertical'}
                            style={{ width: '40rem' }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label={'名称'}
                                name={'projectName'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入项目名称'
                                    }
                                ]}
                            >
                                <Input placeholder={'请输入项目名称'} />
                            </Form.Item>
                            <Form.Item
                                label={'部门'}
                                name={'organization'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入部门名称'
                                    }
                                ]}
                            >
                                <Input placeholder={'请输入部门名称'} />
                            </Form.Item>
                            <Form.Item label={'负责人'} name={'personId'}>
                                <UserSelect defaultOptionName={'负责人'} />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    textAlign: 'right'
                                }}
                            >
                                <Button
                                    type={'primary'}
                                    htmlType={'submit'}
                                    loading={mutateLoading}
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;
`
