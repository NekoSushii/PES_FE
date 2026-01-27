import React, { useState } from 'react';
import { getPendingContributions, approveContribution, rejectContribution, PendingContribution } from '../firebase/adminService';
import Toast from './Toast';

// Hardcoded credentials - in production, use Firebase Auth
const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'peanuts123',
};

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [contributions, setContributions] = useState<PendingContribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setLoginError('');
      fetchContributions();
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const data = await getPendingContributions();
      setContributions(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setToast({ message: 'Failed to fetch contributions', type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (contribution: PendingContribution) => {
    if (!confirm(`Approve "${contribution.title}" by ${contribution.reviewBy}?`)) return;
    
    setProcessing(contribution.docId);
    const success = await approveContribution(contribution);
    setProcessing(null);
    
    if (success) {
      setToast({ message: 'Contribution approved!', type: 'success' });
      setContributions(prev => prev.filter(c => c.docId !== contribution.docId));
    } else {
      setToast({ message: 'Failed to approve', type: 'error' });
    }
  };

  const handleReject = async (contribution: PendingContribution) => {
    if (!confirm(`Reject and delete "${contribution.title}" by ${contribution.reviewBy}? This cannot be undone.`)) return;
    
    setProcessing(contribution.docId);
    const success = await rejectContribution(contribution);
    setProcessing(null);
    
    if (success) {
      setToast({ message: 'Contribution rejected and deleted', type: 'success' });
      setContributions(prev => prev.filter(c => c.docId !== contribution.docId));
    } else {
      setToast({ message: 'Failed to reject', type: 'error' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setContributions([]);
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}>
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Admin Login</h2>
          
          {loginError && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{loginError}</p>
          )}
          
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <h1 style={{ color: '#333' }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <button
        onClick={fetchContributions}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
        }}
      >
        {loading ? 'Loading...' : 'Refresh'}
      </button>

      <h2 style={{ color: '#333', marginBottom: '15px' }}>
        Pending Contributions ({contributions.length})
      </h2>

      {contributions.length === 0 ? (
        <p style={{ color: '#666' }}>No pending contributions.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {contributions.map((contribution) => (
            <div
              key={contribution.docId}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{contribution.title}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    <strong>By:</strong> {contribution.reviewBy}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    <strong>Type:</strong> {contribution.type} | <strong>Tenure:</strong> {contribution.tenure}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    <strong>District ID:</strong> {contribution.districtId} | <strong>Polygon ID:</strong> {contribution.id}
                  </p>
                  <p style={{ margin: '5px 0', color: '#999', fontSize: '12px' }}>
                    Submitted: {contribution.createdAt.toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleApprove(contribution)}
                    disabled={processing === contribution.docId}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: processing === contribution.docId ? '#ccc' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: processing === contribution.docId ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {processing === contribution.docId ? '...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleReject(contribution)}
                    disabled={processing === contribution.docId}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: processing === contribution.docId ? '#ccc' : '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: processing === contribution.docId ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {processing === contribution.docId ? '...' : 'Reject'}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setExpandedId(expandedId === contribution.docId ? null : contribution.docId)}
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                {expandedId === contribution.docId ? 'Hide Content' : 'Show Content'}
              </button>

              {expandedId === contribution.docId && (
                <div
                  style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    maxHeight: '600px',
                    overflow: 'auto',
                    color: 'black',
                    textAlign: 'left',
                  }}
                  dangerouslySetInnerHTML={{ __html: contribution.content }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Admin;
