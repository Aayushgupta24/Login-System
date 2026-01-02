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
      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
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
      <main>
        <div className="card auth-card">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
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
              />
              {validationErrors.username && (
                <small style={{ color: 'var(--danger-color)' }}>{validationErrors.username}</small>
              )}
              {!validationErrors.username && (
                <small>3-30 characters, letters, numbers, and underscores only</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {validationErrors.email && (
                <small style={{ color: 'var(--danger-color)' }}>{validationErrors.email}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
              {validationErrors.password && (
                <small style={{ color: 'var(--danger-color)' }}>{validationErrors.password}</small>
              )}
              {!validationErrors.password && (
                <small>At least 8 characters with uppercase, lowercase, and number</small>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center" style={{ marginTop: '20px' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}>Login here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;

