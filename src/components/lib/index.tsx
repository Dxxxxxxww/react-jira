import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'

const isError = (value: any): value is Error => value?.message

export const FullPageLoading = () => {
    return (
        <FullPage>
            <Spin size="large" />
        </FullPage>
    )
}

export const FullPageError = ({ error }: { error: Error | null }) => {
    return (
        <FullPage>
            <ErrorBox error={error} />
            <Button type="link">点此返回登录页面</Button>
        </FullPage>
    )
}

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (!isError(error)) return null
    return <Typography.Text type="danger">{error?.message}</Typography.Text>
}

export const ButtonNoPadding = styled(Button)`
    padding: 0;
`

const FullPage = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
`
