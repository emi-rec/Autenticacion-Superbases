import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LayoutDashboard, User, Settings, LogOut, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/superBase/supabaseClient'
import { useToast } from '@/hooks/use-toast'

export const DashboardLayout = () => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        toast({
          title: 'Error al cerrar sesión',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        navigate('/login')
      }
    } catch (err) {
      console.error('Error inesperado:', err)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Perfil', path: '/perfil', icon: User },
    { title: 'Configuración', path: '/settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR LATERAL */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary tracking-tight">
            Genius
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3 mb-1 ${
                    isActive
                      ? 'bg-slate-100 font-semibold text-primary'
                      : 'text-slate-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* PIE DEL SIDEBAR: USUARIO Y LOGOUT */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-sm">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-900">
                Usuario
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            {isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
          </Button>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main className="flex-1 md:pl-64">
        <div className="p-8 max-w-6xl mx-auto">
          {/* Aquí es donde se inyectan las páginas como Dashboard o Perfil */}
          <Outlet />
        </div>
      </main>
    </div>
  )
}
