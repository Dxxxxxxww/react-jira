import { useAuth } from '../../context/auth-context';
import { Button, Form, Input } from 'antd';
import { useAsync } from '../../utils/use-async';

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwError: true });

    const handleSubmit = async ({
        cpassword,
        ...value
    }: {
        username: string;
        password: string;
        cpassword: string;
    }) => {
        if (value.password !== cpassword) {
            return onError(new Error('两次密码不一致'));
        }
        await run(register(value)).catch(onError);
    };

    return (
        <div>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input type="text" placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input type="password" placeholder="密码" />
                </Form.Item>
                <Form.Item
                    name="cpassword"
                    rules={[{ required: true, message: '请确认密码' }]}
                >
                    <Input type="password" placeholder="确认密码" />
                </Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit">
                    注册
                </Button>
            </Form>
        </div>
    );
};
