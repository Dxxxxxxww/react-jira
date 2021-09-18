import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { BoardScreen } from '../board/board';
import { EpicScreen } from '../epic/epic';

export const ProjectScreen = () => {
    return (
        <div>
            Project
            <div>
                <Link to="board">看板</Link>
                <Link to="epic">任务</Link>
            </div>
            <Routes>
                <Route path={'/board'} element={<BoardScreen />} />
                <Route path={'/epic'} element={<EpicScreen />} />
                <Navigate to={window.location.pathname + '/board'} />
            </Routes>
        </div>
    );
};
