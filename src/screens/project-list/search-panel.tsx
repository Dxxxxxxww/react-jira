import { Button, Form, Input } from 'antd';
import { Project } from '../../types';
import { UserSelect } from '../../components/user-select/user-select';
export interface User {
    name: string;
    username?: string;
    id: number;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: Partial<Pick<Project, 'name' | 'personId'>>;
    setParam: (param: SearchPanelProps['param']) => void;
    reload?: () => void;
}

export const SearchPanel = ({
    users,
    param,
    setParam,
    reload
}: SearchPanelProps) => (
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
            <UserSelect
                defaultValue={0}
                defaultOptionName={'负责人'}
                options={users}
                value={param.personId}
                onChange={(value) =>
                    setParam({
                        ...param,
                        personId: value
                    })
                }
            />
        </Form.Item>
        <Form.Item>
            <Button onClick={reload}>刷新</Button>
        </Form.Item>
    </Form>
);

SearchPanel.whyDidYouRender = false;
