import { useAuth } from '@/hooks/useAuth'
import { supabase } from '../superBase/supabaseClient'
import { Button, DashboardCard } from '@/components'

const Dashboard = () => {
  const { user } = useAuth()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error al cerrar sesión:', error.message)
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-500 animate-pulse">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="flex justify-between items-center border-b bg-white px-8 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">Panel de Control</h1>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </header>

      <main className="container mx-auto flex flex-col items-center gap-8 py-10 px-4">
        <DashboardCard userEmail={user.email} />
      </main>
    </div>
  )
}

export default Dashboard
