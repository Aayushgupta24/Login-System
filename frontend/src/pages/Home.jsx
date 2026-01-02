import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🗄️', text: 'MongoDB for data storage' },
  { icon: '🔒', text: 'bcrypt for password hashing' },
  { icon: '🎫', text: 'JWT for authentication' },
  { icon: '🍪', text: 'Secure cookies for session management' },
  { icon: '⚛️', text: 'React.js for modern frontend' },
  { icon: '🛡️', text: 'XSS and injection attack protection' },
];

function Home() {
  const { user } = useAuth();

  return (
    <div className="container">
      <main className="fade-in">
        <div className="hero-section">
          <h1 className="hero-title">
            Welcome to SecureAuth
          </h1>
          <p className="hero-subtitle">
            A modern, secure authentication system built with cutting-edge technology
            to keep your data safe and your experience seamless.
          </p>
        </div>

        <div className="card">
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '12px',
              color: 'var(--text-primary)',
            }}>
              Why Choose SecureAuth?
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
            }}>
              Experience enterprise-grade security with a beautiful, intuitive interface.
              Our system combines robust backend protection with a modern React frontend.
            </p>
          </div>

          <ul className="feature-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <span className="feature-text">{feature.text}</span>
              </li>
            ))}
          </ul>

          <div style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {!user ? (
              <>
                <Link to="/register" className="btn btn-primary" style={{ minWidth: '200px' }}>
                  🚀 Get Started - Register
                </Link>
                <Link to="/login" className="btn btn-secondary" style={{ minWidth: '200px' }}>
                  🔑 Already have an account? Login
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn btn-primary" style={{ minWidth: '200px' }}>
                📊 Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
