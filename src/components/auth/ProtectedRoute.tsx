import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';
//import { useAuth } from './auth';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, permitimos el acceso a las rutas hijas protegidas.
  return <Outlet />;
};