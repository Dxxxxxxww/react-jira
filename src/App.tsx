import './App.css'
import { useAuth } from './context/auth-context'
import { UnauthenticatedApp } from './screens/unauthenticated-app'
import { AuthenticatedApp } from './authenticated-app'
import { ErrorBoundary } from './components/error-boundary/error-boundary'
import { FullPageError } from './components/lib'

function App() {
    const { user } = useAuth()
    return (
        <div className="App">
            <ErrorBoundary fallBackRender={FullPageError}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </ErrorBoundary>
        </div>
    )
}

export default App
