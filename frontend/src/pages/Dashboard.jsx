import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/protected/dashboard');
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      setError('Error loading dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="fade-in">
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            }}>
              👤
            </div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Protected Dashboard
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
              Your secure authentication workspace
            </p>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}
          
          {user && (
            <>
              <div style={{
                textAlign: 'center',
                marginBottom: '32px',
                padding: '24px',
                background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(99, 102, 241, 0.1)',
              }}>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: 'var(--text-primary)',
                }}>
                  Welcome, <span className="gradient-text">{user.username}</span>! 👋
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                  You're successfully authenticated and ready to go
                </p>
              </div>

              <div className="user-info-card">
                <div className="user-info-item">
                  <span className="user-info-label">🆔 User ID</span>
                  <span className="user-info-value">{user.id}</span>
                </div>
                <div className="user-info-item">
                  <span className="user-info-label">📧 Email</span>
                  <span className="user-info-value">{user.email}</span>
                </div>
                <div className="user-info-item">
                  <span className="user-info-label">👤 Username</span>
                  <span className="user-info-value">{user.username}</span>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                borderLeft: '4px solid var(--primary-color)',
                padding: '24px',
                borderRadius: '16px',
                margin: '32px 0',
                boxShadow: 'var(--shadow)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>✅</span>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}>
                    Authentication Status
                  </h4>
                </div>
                <p style={{
                  margin: '8px 0 0 0',
                  color: 'var(--text-secondary)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                }}>
                  You are successfully authenticated! This is a protected route that requires a valid JWT token.
                  Your session is secure and encrypted.
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                marginTop: '32px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <div className="status-badge">
                  🛡️ Secure Session Active
                </div>
                <div className="status-badge" style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
                }}>
                  🔒 Protected Route
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
