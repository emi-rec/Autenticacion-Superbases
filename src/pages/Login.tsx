import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../superBase/supabaseClient'
import { AuthForm } from '../components/auth/AuthForm'
import { Button } from '@components'

const Login = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-4 bg-slate-50/30">
      <AuthForm
        title="Iniciar Sesión"
        description="Ingresa tus credenciales para acceder"
        buttonText="Entrar"
        onSubmit={handleLogin}
        error={error}
        loading={loading}
      />

      <div className="mt-6 text-sm text-slate-600">
        ¿No tienes cuenta?{' '}
        <Button variant="link" className="p-0 h-auto font-semibold" asChild>
          <Link to="/signup">Regístrate aquí</Link>
        </Button>
      </div>
    </div>
  )
}

export default Login
