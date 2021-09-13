import { ProjectListScreen } from './screens/project-list';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
import { Row } from './components/row';

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <Container>
            <Header>
                <HeaderLeft gap={true}>
                    <h3>logo</h3>
                    <h3>项目</h3>
                    <h3>列表</h3>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
                </HeaderRight>
            </Header>
            <Nav />
            <Main>
                <ProjectListScreen />
            </Main>
            <Aside />
            <Footer />
        </Container>
    );
};

/**
 * grid 和 flex 各自的使用场景
 * 1. 要考虑是一维布局(只有横向/纵向)还是二维布局(横纵皆有)
 * 一般来说，一维用 flex ，二维用 grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：flex。先有一组内容(数量一般不固定)，通过内容自身的样式均匀的分布在容器中
 * 从布局出发：grid。先规划网格(数量比较固定)，再把元素往里填充
 */

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    grid-template-columns: 20rem 1fr 20rem;
    grid-template-areas:
        'header header header'
        'nav main aside'
        'footer footer footer';
    height: 100vh; ;
`;

// grid-area 用于给 grid 子元素起名
const Header = styled(Row)`
    grid-area: header;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
    grid-area: main;
`;
const Nav = styled.main`
    grid-area: nav;
`;
const Aside = styled.main`
    grid-area: aside;
`;
const Footer = styled.main`
    grid-area: footer;
`;
