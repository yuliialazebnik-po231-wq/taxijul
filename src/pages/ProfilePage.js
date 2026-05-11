import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/ProfilePage.css';
 
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
 
  if (!user) { navigate('/login'); return null; }
 
  const handleLogout = () => { logout(); navigate('/login'); };
 
  return (
    <div className="page-wrapper">
      <div className="container-taxi">
        <div className="profile-card">
 
          {/* Шапка профілю */}
          <div className="profile-header">
            <div className="profile-avatar-big">{user.name[0]}</div>
            <div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-since">З нами з {user.memberSince}</p>
            </div>
          </div>
 
          {/* Статистика */}
          <div className="profile-stats">
            <div className="p-stat">
              <span className="p-stat-val">{user.totalRides}</span>
              <span className="p-stat-lbl">Поїздок</span>
            </div>
            <div className="p-stat">
              <span className="p-stat-val">{user.rating}</span>
              <span className="p-stat-lbl">Рейтинг</span>
            </div>
            <div className="p-stat">
            <span className="p-stat-val">{user.experience}</span>
              <span className="p-stat-lbl">Досвід</span>
            </div>
          </div>
 
          {/* Контактні дані */}
          <div className="profile-info">
            <div className="profile-field">
              <span className="field-label">Email</span>
              <span className="field-value">{user.email}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Телефон</span>
              <span className="field-value">{user.phone}</span>
            </div>
          </div>
 
          <div className="profile-actions">
            <button className="btn-taxi" onClick={() => navigate('/book')}>
              Замовити таксі
            </button>
            <button className="btn-outline btn-logout" onClick={handleLogout}>
              Вийти з акаунту
            </button>
          </div>
 
        </div>
      </div>
    </div>
  );
};
 
export default ProfilePage;
