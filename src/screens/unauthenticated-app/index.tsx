import { Login } from './login';
import { Register } from './register';
import { useState } from 'react';
import { Button, Card, Divider } from 'antd';
import styled from '@emotion/styled';
import logo from 'assets/img/logo.svg';
import left from 'assets/img/left.svg';
import right from 'assets/img/right.svg';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <Container>
            <Header />
            <Background />
            <ShadowCard>
                {isRegister ? <Register /> : <Login />}
                <Divider />
                <Button type="link" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已有账号？请登录' : '没有账号？快来注册'}
                </Button>
            </ShadowCard>
        </Container>
    );
};

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    // 该属性决定图片是否跟随滑动，此处设置为不跟随
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
        calc(((100vw - 40rem) / 2) - 3.2rem), cover;
    background-image: url(${left}), url(${right});
`;

const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`;

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;
