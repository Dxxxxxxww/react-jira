import { User } from "./search-panel";

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
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {list.map((project) => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>
                            {users.find((user) => user.id === project.personId)
                                ?.name || "未知"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
