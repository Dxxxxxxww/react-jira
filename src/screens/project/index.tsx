import { Link } from 'react-router-dom';

export const ProjectScreen = () => {
    return (
        <div>
            Project
            <div>
                <Link to="board">看板</Link>
                <Link to="epic">任务</Link>
            </div>
        </div>
    );
};
