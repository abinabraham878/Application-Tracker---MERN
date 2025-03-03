import { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
  
    if (isLoading) {
      // You can replace this with a loading spinner
      return <div>Loading...</div>;
    }
  
    if (!isAuthenticated()) {
      return <Navigate to="/auth" />;
    }
  
    return <>{children}</>;
  };
  
  export default ProtectedRoute;