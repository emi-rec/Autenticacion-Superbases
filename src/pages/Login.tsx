import { useState } from 'react';
import { AuthForm } from '../components/auth/AuthForm';
import { supabase } from '../superBase/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={containerStyle}>
      <AuthForm 
        title="Iniciar Sesión" 
        buttonText="Entrar" 
        onSubmit={handleLogin} 
        error={error}
        loading={loading}
      />
      <p>¿No tienes cuenta? <Link to="/signup">Regístrate</Link></p>
    </div>
  );
};

const containerStyle = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', marginTop: '50px' };

export default Login;