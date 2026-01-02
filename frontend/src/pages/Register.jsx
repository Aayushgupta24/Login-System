import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setValidationErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setValidationErrors({});
    setLoading(true);

    const result = await register(formData.username, formData.email, formData.password);

    if (result.success) {
      setSuccess('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      if (result.errors) {
        const errors = {};
        result.errors.forEach((err) => {
          errors[err.param] = err.msg;
        });
        setValidationErrors(errors);
      }
      setError(result.message || 'Registration failed');
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
              ✨
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
              Create an Account
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Join us and experience secure authentication
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                <span style={{ marginRight: '8px' }}>👤</span>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
                maxLength="30"
                pattern="[a-zA-Z0-9_]+"
                title="Username can only contain letters, numbers, and underscores"
                placeholder="Enter your username"
              />
              {validationErrors.username && (
                <small style={{ color: 'var(--danger-color)', fontWeight: '600' }}>
                  {validationErrors.username}
                </small>
              )}
              {!validationErrors.username && (
                <small>3-30 characters, letters, numbers, and underscores only</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <span style={{ marginRight: '8px' }}>📧</span>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
              {validationErrors.email && (
                <small style={{ color: 'var(--danger-color)', fontWeight: '600' }}>
                  {validationErrors.email}
                </small>
              )}
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
                minLength="8"
                placeholder="Create a strong password"
              />
              {validationErrors.password && (
                <small style={{ color: 'var(--danger-color)', fontWeight: '600' }}>
                  {validationErrors.password}
                </small>
              )}
              {!validationErrors.password && (
                <small>At least 8 characters with uppercase, lowercase, and number</small>
              )}
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
                <span>⏳ Registering...</span>
              ) : (
                <span>🚀 Create Account</span>
              )}
            </button>
          </form>

          <p className="text-center" style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link
              to="/login"
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
              Login here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;
