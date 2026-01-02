import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header style={{
      background: 'var(--card-background)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: 'var(--shadow)',
      marginBottom: '30px',
    }}>
      <div className="container">
        <h1 style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--primary-color)' }}>
          🔐 Secure Authentication System
        </h1>
        <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '500',
            }}
          >
            Home
          </Link>
          {!user ? (
            <>
              <Link
                to="/register"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                }}
              >
                Register
              </Link>
              <Link
                to="/login"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                }}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'var(--danger-color)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

