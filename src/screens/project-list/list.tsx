import { Table, TableProps } from 'antd';
import { User } from '../../types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from '../../components/pin/pin';
import { useEditProject } from '../../api/project-list/project-list';
import { Project } from '../../types';

interface ListProp extends TableProps<Project> {
    users: User[];
}

export const List = ({ users, ...props }: ListProp) => {
    const { mutate } = useEditProject();
    // project.id 这个参数是先知道的，而 pin 需要等到点击事件触发的时候才知道，
    // 参数有先后，可以使用科里化来进行关注点分离
    const onEdit = (id: number) => (pin: boolean) => mutate({ id, pin });
    return (
        <Table
            pagination={false}
            rowKey="id"
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    render(value, project) {
                        return (
                            <Pin
                                checked={project.pin}
                                onChange={onEdit(project.id)}
                            />
                        );
                    }
                },
                {
                    title: '名称',
                    dataIndex: 'projectName',
                    sorter(a, b) {
                        return a.projectName.localeCompare(b.projectName);
                    },
                    render(value, project) {
                        return (
                            <Link to={`${project.id}`}>
                                {project.projectName}
                            </Link>
                        );
                    }
                },
                {
                    title: '部门',
                    dataIndex: 'organization'
                },
                {
                    title: '负责人',
                    render(value, project) {
                        return (
                            <span>
                                {users.find(
                                    (user) => user.id === project.personId
                                )?.username || '未知'}
                            </span>
                        );
                    }
                },
                {
                    title: '创建时间',
                    render(value, project) {
                        return (
                            <span>
                                {project.created
                                    ? dayjs(project.created).format(
                                          'YYYY-MM-DD'
                                      )
                                    : '无'}
                            </span>
                        );
                    }
                }
            ]}
            {...props}
        />
    );
};
