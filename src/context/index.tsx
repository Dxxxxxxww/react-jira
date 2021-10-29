import { ReactNode } from 'react'
import { AuthProvider } from './auth-context'
import { Provider } from 'react-redux'
import { store } from '../store'

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>;
        </Provider>
    )
}
