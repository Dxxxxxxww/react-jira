import { Table } from 'antd';
import { User } from './search-panel';

interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
}

interface ListProp {
    list: Project[];
    users: User[];
}

export const List = ({ users, list }: ListProp) => {
    return (
        <Table
            pagination={false}
            rowKey="id"
            columns={[
                {
                    title: '名称',
                    dataIndex: 'name',
                    sorter(a, b) {
                        return a.name.localeCompare(b.name);
                    }
                },
                {
                    title: '负责人',
                    render(value, project) {
                        return (
                            <span>
                                {users.find(
                                    (user) => user.id === project.personId
                                )?.name || '未知'}
                            </span>
                        );
                    }
                }
            ]}
            dataSource={list}
        />
    );
};
