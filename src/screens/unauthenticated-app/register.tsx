import { useAuth } from '../../context/auth-context';
import { Button, Form, Input } from 'antd';

export const Register = () => {
    const { register } = useAuth();

    const handleSubmit = ({
        username,
        password
    }: {
        username: string;
        password: string;
    }) => {
        register({ username, password });
    };

    return (
        <div>
            <Form onFinish={handleSubmit}>
                <Form.Item name="username">
                    <Input type="text" placeholder="用户名" />
                </Form.Item>
                <Form.Item name="password">
                    <Input type="password" placeholder="密码" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form>
        </div>
    );
};
