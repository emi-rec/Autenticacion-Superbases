import { useAuth } from '../context/auth';
import { supabase } from '../superBase/supabaseClient';

const Dashboard = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error al cerrar sesión:', error.message);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Panel de Control</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h3>Bienvenido,</h3>
          <p style={styles.email}>{user?.email}</p>
          <hr />
          <p>Tu ID de usuario es:</p>
          <code style={styles.code}>{user?.id}</code>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  logoutBtn: { backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' },
  main: { marginTop: '30px', display: 'flex', justifyContent: 'center' },
  card: { padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' as const },
  email: { fontWeight: 'bold', color: '#007bff', fontSize: '1.2rem' },
  code: { backgroundColor: '#f4f4f4', padding: '5px', borderRadius: '3px', fontSize: '0.8rem' }
};

export default Dashboard;