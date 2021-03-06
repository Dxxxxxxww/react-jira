import { ProjectListScreen } from './screens/project-list'
import { useAuth } from './context/auth-context'
import styled from '@emotion/styled'
import { Row } from './components/row/row'
import { ReactComponent as SoftwareLog } from './assets/img/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
// import {Navigate, Routes, Route} from 'react-router'
import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route
} from 'react-router-dom'
import { ProjectScreen } from './screens/project'
import { resetRoute } from './utils'
import { ProjectModal } from './screens/project-list/project-modal'
import { ProjectPopover } from './components/project-popover/project-popover'
import { ButtonNoPadding } from './components/lib'

export const AuthenticatedApp = () => {
    return (
        <Container>
            <Router>
                <PageHeader />
                <Main>
                    <Routes>
                        <Route
                            path={'/projectList'}
                            element={<ProjectListScreen />}
                        />
                        <Route
                            path="/projectList/:projectId/*"
                            element={<ProjectScreen />}
                        />
                        <Navigate
                            to={window.location.pathname + '/projectList'}
                            replace={true}
                        />
                    </Routes>
                </Main>
                <ProjectModal />
            </Router>
        </Container>
    )
}

const PageHeader = () => {
    return (
        <Header>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type="link" onClick={resetRoute}>
                    <SoftwareLog width="18rem" color="#2684ff" />
                </ButtonNoPadding>
                <ProjectPopover />
                <span>列表</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { logout, user } = useAuth()

    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key="logout">
                        <Button type="link" onClick={logout}>
                            登出
                        </Button>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type="link">HI, {user?.username}</Button>
        </Dropdown>
    )
}

/**
 * grid 和 flex 各自的使用场景
 * 1. 要考虑是一维布局(只有横向/纵向)还是二维布局(横纵皆有)
 * 一般来说，一维用 flex ，二维用 grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：flex。先有一组内容(数量一般不固定)，通过内容自身的样式均匀的分布在容器中
 * 从布局出发：grid。先规划网格(数量比较固定)，再把元素往里填充
 */

// 这里使用 const 定义的变量却在上面已经使用了，但是没有触发 TDZ 的报错是为啥？
// 这是因为上面函数里虽然使用了，但是上面函数并没有真正的去运行。
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        'header'
        'main';
    height: 100vh; ;
`

// grid-area 用于给 grid 子元素起名，用于 grid-template-areas
const Header = styled(Row)`
    grid-area: header;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`
    grid-area: main;
`
// const Nav = styled.main`
//     grid-area: nav;
// `;
// const Aside = styled.main`
//     grid-area: aside;
// `;
// const Footer = styled.main`
//     grid-area: footer;
// `;
