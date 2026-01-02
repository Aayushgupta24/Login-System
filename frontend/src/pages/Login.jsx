import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = await login(formData.login, formData.password);

    if (result.success) {
      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError(result.message || 'Invalid credentials');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <main className="fade-in">
        <div className="card auth-card">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            }}>
              🔑
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Welcome Back
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Login to access your secure dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login">
                <span style={{ marginRight: '8px' }}>👤</span>
                Email or Username
              </label>
              <input
                type="text"
                id="login"
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
                placeholder="Enter your email or username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <span style={{ marginRight: '8px' }}>🔐</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            {error && <div className="error-message">⚠️ {error}</div>}
            {success && <div className="success-message">✅ {success}</div>}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? (
                <span>⏳ Logging in...</span>
              ) : (
                <span>🚀 Login to Dashboard</span>
              )}
            </button>
          </form>

          <p className="text-center" style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              Register here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
