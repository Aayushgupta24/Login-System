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
      <main>
        <div className="card">
          <h2>Protected Dashboard</h2>
          {error && <div className="error-message">{error}</div>}
          {user && (
            <>
              <h3 style={{ marginTop: '20px' }}>Welcome, {user.username}!</h3>
              <div style={{
                background: 'var(--background)',
                padding: '20px',
                borderRadius: '6px',
                margin: '20px 0',
              }}>
                <p style={{ margin: '10px 0' }}>
                  <strong>User ID:</strong> {user.id}
                </p>
                <p style={{ margin: '10px 0' }}>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div style={{
                background: '#dbeafe',
                borderLeft: '4px solid var(--primary-color)',
                padding: '15px',
                borderRadius: '6px',
                margin: '20px 0',
              }}>
                <p style={{ margin: '5px 0' }}>✅ You are successfully authenticated!</p>
                <p style={{ margin: '5px 0' }}>This is a protected route that requires a valid JWT token.</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

