import './App.css';
import { useAuth } from './context/auth-context';
import { UnauthenticatedApp } from './screens/unauthenticated-app';
import { AuthenticatedApp } from './authenticated-app';

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
    );
}

export default App;
