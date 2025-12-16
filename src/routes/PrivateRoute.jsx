import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context-provider/AuthContext';
import Loading from '../components/shared/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
