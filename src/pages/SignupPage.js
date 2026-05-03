import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/AuthPages.css';

const SignupPage = () => {
  const { signup, loginWithGoogle, authError, clearError } = useAuth();
  const navigate = useNavigate();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signup(name, email, password);
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
          <h2>Реєстрація</h2>
          <p>Приєднуйся до TaxiJul</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Імʼя</label>
            <input className="form-input" type="text" placeholder="Твоє імʼя"
              value={name} onChange={(e) => { setName(e.target.value); clearError(); }} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="your@email.com"
              value={email} onChange={(e) => { setEmail(e.target.value); clearError(); }} required />
          </div>
          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input className="form-input" type="password" placeholder="Мінімум 6 символів"
              value={password} onChange={(e) => { setPassword(e.target.value); clearError(); }} required />
          </div>
          {authError && <div className="error-box">{authError}</div>}
          <button type="submit" className="btn-taxi btn-auth">Зареєструватись</button>
          <div className="auth-divider">або</div>
          <button type="button" className="btn-google" onClick={handleGoogle}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
            Увійти через Google
          </button>
        </form>
        <p className="auth-switch">
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;