import { useState } from 'react';

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string | null;
  loading?: boolean;
}

export const AuthForm = ({ title, buttonText, onSubmit, error, loading }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{title}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        required
      />
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Cargando...' : buttonText}
      </button>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
    </form>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column' as const, gap: '15px', width: '100%' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd' },
  button: { padding: '10px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }
};