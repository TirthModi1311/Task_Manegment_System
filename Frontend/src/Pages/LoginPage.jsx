import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login user using Axios
      const response = await axios.post(
        'https://taskmanegmentsystem.netlify.app/api/auth/login',
        {
          Username: username,
          Password: password,
        }
      );

      // Get token from backend response
      const data = response.data;
      const token = data.token || data.accessToken;

      if (token) {
        onLoginSuccess(token);
        navigate('/dashboard');
      } else {
        setError('Login successful, but no token received from server.');
      }

    } catch (err) {
      console.error('Login error:', err);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        (err.response
          ? 'Invalid username or password.'
          : 'Could not connect to the server. Make sure your backend is running.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="brand-icon">📦</span>
          <h3>Welcome Back to TASKVIEW</h3>
        </div>

        <p className="auth-subtitle">
          Please enter your details to sign in.
        </p>

        {error && <div className="error-badge">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="switch-auth-text">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
