import { Form, Input, Select } from 'antd';
export interface User {
    name: string;
    id: number;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string;
    };
    setParam: (param: SearchPanelProps['param']) => void;
}

const { Option } = Select;

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => (
    <Form style={{ marginBottom: '2rem' }} layout="inline">
        <Form.Item>
            <Input
                type="text"
                value={param.name}
                onChange={(evt) =>
                    setParam({
                        ...param,
                        name: evt.target.value
                    })
                }
            />
        </Form.Item>
        <Form.Item>
            <Select
                defaultValue=""
                value={param.personId}
                onChange={(value: string) =>
                    setParam({
                        ...param,
                        personId: value
                    })
                }
            >
                <Option value={''}>负责人</Option>
                {users.map((user) => (
                    <Option key={user.id} value={user.id}>
                        {user.name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    </Form>
);
