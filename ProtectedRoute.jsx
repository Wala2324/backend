import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, authReady } = useAuth();

  if (!authReady) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
