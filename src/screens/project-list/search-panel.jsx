export const SearchPanel = ({ users, param, setParam }) => (
    <form>
        <input
            type="text"
            value={param.name}
            onChange={(evt) =>
                setParam({
                    ...param,
                    name: evt.target.value,
                })
            }
        />
        <select
            value={param.personId}
            onChange={(evt) =>
                setParam({
                    ...param,
                    id: evt.target.value,
                })
            }
        >
            <option value={""}>负责人</option>
            {users.map((user) => (
                <option key={user.id} value={user.id}>
                    user.name
                </option>
            ))}
        </select>
    </form>
);
