import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/AuthPages.css';

const LoginPage = () => {
  const { login, loginWithGoogle, authError, clearError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/');
  };

  const handleGoogle = async () => {
    const ok = await loginWithGoogle();
    if (ok) navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Вхід в TaxiJul</h2>
          <p>Увійди щоб замовити таксі</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError(); }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              className="form-input"
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
              required
            />
          </div>

          {authError && <div className="error-box">{authError}</div>}

          <button type="submit" className="btn-taxi btn-auth">
            Увійти
          </button>

          <div className="auth-divider">або</div>

          <button type="button" className="btn-google" onClick={handleGoogle}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
            Увійти через Google
          </button>

        </form>
        <p className="auth-switch">
          Немає акаунту? <Link to="/signup">Зареєструватись</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;