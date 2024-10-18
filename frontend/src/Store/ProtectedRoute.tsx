import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Optionally return a loading spinner
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Redirect to login, and store the route user was trying to visit
        return <Navigate to="/SignIn" state={{ from: location }} />;
    }

    return children; // If authenticated, return the protected content
};

export default ProtectedRoute;
