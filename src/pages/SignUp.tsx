import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../superBase/supabaseClient';
import { AuthForm } from '../components/auth/AuthForm';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {!success ? (
        <div style={styles.card}>
          <AuthForm
            title="Crear Cuenta"
            buttonText="Registrarse"
            onSubmit={handleSignUp}
            error={error}
            loading={loading}
          />
          <p style={styles.footerText}>
            ¿Ya tienes cuenta? <Link to="/login" style={styles.link}>Inicia sesión</Link>
          </p>
        </div>
      ) : (
        /* Esta vista reemplaza al formulario cuando success es true */
        <div style={styles.successCard}>
          <div style={styles.icon}>✉️</div>
          <h2 style={styles.title}>¡Cuenta creada!</h2>
          <p style={styles.message}>
            Hemos enviado un enlace de confirmación a tu correo. 
            Por favor, verifícalo para poder entrar.
          </p>
          <button 
            onClick={() => navigate('/login')} 
            style={styles.buttonLogin}
          >
            Ir al Login
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  card: { width: '100%', maxWidth: '400px', padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  successCard: { width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' as const, backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  icon: { fontSize: '48px', marginBottom: '16px' },
  title: { color: '#1a202c', marginBottom: '8px' },
  message: { color: '#4a5568', marginBottom: '24px', lineHeight: '1.5' },
  buttonLogin: { width: '100%', padding: '12px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' as const, cursor: 'pointer' },
  footerText: { marginTop: '20px', textAlign: 'center' as const },
  link: { color: '#4a90e2', textDecoration: 'none', fontWeight: 'bold' as const }
};

export default SignUp;