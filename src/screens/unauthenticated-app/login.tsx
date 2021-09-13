import { useAuth } from '../../context/auth-context';
import { Button, Form, Input } from 'antd';

export const Login = () => {
    const { login } = useAuth();

    // const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    //     evt.preventDefault();
    //     const username = (evt.currentTarget.elements[0] as HTMLInputElement)
    //         .value;
    //     const password = (evt.currentTarget.elements[1] as HTMLInputElement)
    //         .value;
    //
    //     login({ username, password });
    // };
    const handleSubmit = ({
        username,
        password
    }: {
        username: string;
        password: string;
    }) => {
        login({ username, password });
    };

    return (
        <div>
            <Form onFinish={handleSubmit}>
                <Form.Item name="username">
                    <Input placeholder="用户名" type="text" />
                </Form.Item>
                <Form.Item name="password">
                    <Input placeholder="用户名" type="password" />
                </Form.Item>
                <Button htmlType="submit" type={'primary'}>
                    登录
                </Button>
            </Form>
        </div>
    );
};
