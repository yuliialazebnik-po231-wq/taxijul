import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRideHistory } from '../hooks/useRideHistory';
import RideCard from '../components/ride/RideCard';
import './styles/RideHistoryPage.css';

const FILTERS = ['Всі', 'Завершена', 'Скасована'];

const RideHistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { rides, loading, error, filter, changeFilter, stats } = useRideHistory(user?.uid);

  if (!user) { navigate('/login'); return null; }

  return (
    <div className="page-wrapper">
      <div className="container-taxi">
        <h1 className="page-title">Мої поїздки</h1>

        <div className="rides-stats">
          <div className="stat-box stat-box--total">
            <span className="stat-val">{stats.total}</span>
            <span className="stat-lbl">Всього</span>
          </div>
          <div className="stat-box stat-box--completed">
            <span className="stat-val">{stats.completed}</span>
            <span className="stat-lbl">Завершено</span>
          </div>
          <div className="stat-box stat-box--cancelled">
            <span className="stat-val">{stats.cancelled}</span>
            <span className="stat-lbl">Скасовано</span>
          </div>
          <div className="stat-box stat-box--spent">
            <span className="stat-val">{stats.totalSpent} грн</span>
            <span className="stat-lbl">Витрачено</span>
          </div>
        </div>

        <div className="rides-filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => changeFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && <div className="spinner-taxi">Завантаження...</div>}
        {error   && <div className="error-box">{error}</div>}

        {!loading && !error && (
          rides.length > 0
            ? rides.map((ride) => <RideCard key={ride.id} ride={ride} />)
            : <p className="empty-msg">Поїздок не знайдено</p>
        )}
      </div>
    </div>
  );
};

export default RideHistoryPage;