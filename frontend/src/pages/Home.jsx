import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Welcome to the Secure Auth System</h2>
          <p>This is a secure user authentication system built with:</p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li style={{ padding: '8px 0', paddingLeft: '25px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: '12px', width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></span>
              ✅ MongoDB for data storage
            </li>
            <li style={{ padding: '8px 0', paddingLeft: '25px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: '12px', width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></span>
              ✅ bcrypt for password hashing
            </li>
            <li style={{ padding: '8px 0', paddingLeft: '25px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: '12px', width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></span>
              ✅ JWT for authentication
            </li>
            <li style={{ padding: '8px 0', paddingLeft: '25px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: '12px', width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></span>
              ✅ Secure cookies for session management
            </li>
            <li style={{ padding: '8px 0', paddingLeft: '25px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: '12px', width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></span>
              ✅ React.js for modern frontend
            </li>
            <li style={{ padding: '8px 0', paddingLeft: '25px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: '12px', width: '8px', height: '8px', background: 'var(--primary-color)', borderRadius: '50%' }}></span>
              ✅ XSS and injection attack protection
            </li>
          </ul>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
            {!user ? (
              <>
                <Link to="/register" className="btn btn-primary">
                  Get Started - Register
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Already have an account? Login
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

