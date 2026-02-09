import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import PageLoader from './components/ui/PageLoader';

const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />

        {/* Rutas Privadas (Protegidas) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<div>Tu Perfil de Usuario</div>} />
        </Route>

        {/* Redirección por defecto si la ruta no existe */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;