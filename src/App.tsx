import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import Login from './pages/Login'
import { PageLoader, Toaster } from './components'
import { DashboardLayout } from './components/layouts/DashboardLayout'

const SignUp = lazy(() => import('./pages/SignUp'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas Privadas (Protegidas) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/perfil"
                element={<div className="p-4">Página de Perfil</div>}
              />
              <Route
                path="/settings"
                element={<div className="p-4">Configuración</div>}
              />
            </Route>
          </Route>

          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
