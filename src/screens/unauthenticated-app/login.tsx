import { useAuth } from '../../context/auth-context';
import { Button, Form, Input } from 'antd';
import { useAsync } from '../../utils/use-async';

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
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
    const { run, isLoading } = useAsync(undefined, { throwError: true });
    const handleSubmit = async ({
        username,
        password
    }: {
        username: string;
        password: string;
    }) => {
        await run(login({ username, password })).catch(onError);
        // 这里不能使用 useAsync 里的 error 是因为 setState 是异步的过程，
        // 在 catch 进行 setError 异步尚未结束，这边就已经打印了
        // console.log('error:', error);
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
                <Button loading={isLoading} htmlType="submit" type={'primary'}>
                    登录
                </Button>
            </Form>
        </div>
    );
};
