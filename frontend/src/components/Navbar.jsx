import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      background: 'white',
      padding: '20px 0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginBottom: '40px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                fontSize: '32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>🔐</span>
              SecureAuth
            </h1>
          </Link>
          <nav style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <Link
              to="/"
              style={{
                color: isActive('/') ? 'var(--primary-color)' : 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                background: isActive('/') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.target.style.background = 'rgba(99, 102, 241, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              Home
            </Link>
            {!user ? (
              <>
                <Link
                  to="/register"
                  style={{
                    color: isActive('/register') ? 'var(--primary-color)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: isActive('/register') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                if (!isActive('/register')) {
                  e.target.style.background = 'rgba(99, 102, 241, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/register')) {
                  e.target.style.background = 'transparent';
                }
              }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '10px 24px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '15px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
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
                    color: isActive('/dashboard') ? 'var(--primary-color)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    background: isActive('/dashboard') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                if (!isActive('/dashboard')) {
                  e.target.style.background = 'rgba(99, 102, 241, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/dashboard')) {
                  e.target.style.background = 'transparent';
                }
              }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
