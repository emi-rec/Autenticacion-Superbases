import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../superBase/supabaseClient'
import { useToast } from '@/hooks/use-toast'
import { AuthForm } from '../components/auth/AuthForm'
import { Button } from '@components'

const SignUp = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignUp = async (email: string, password: string) => {
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // configurar esta URL en tu dashboard de Supabase
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })

      if (error) {
        setError(error.message)
      } else {
        // En Supabase, por defecto se requiere confirmación de email,
        // actualmente esta deshabilitado.
        toast({
          title: '¡Registro exitoso!',
          description: 'Te hemos enviado un correo de confirmación.',
        })
        navigate('/login')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ocurrió un error inesperado'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-4 bg-slate-50/30">
      <AuthForm
        title="Crear Cuenta"
        description="Regístrate para comenzar a usar la plataforma"
        buttonText="Registrarse"
        onSubmit={handleSignUp}
        error={error}
        loading={loading}
      />

      <div className="mt-6 text-sm text-slate-600 animate-in fade-in slide-in-from-bottom-2 duration-500">
        ¿Ya tienes una cuenta?{' '}
        <Button
          variant="link"
          className="p-0 h-auto font-semibold text-primary"
          asChild
        >
          <Link to="/login">Inicia sesión aquí</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignUp
