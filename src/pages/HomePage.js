import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Star, Clock } from 'lucide-react';
import './styles/HomePage.css';

const features = [
  { icon: <Car size={36} />,   title: 'Швидке замовлення', desc: 'Таксі за 3 хвилини. Введи адресу — знайдемо найближчого водія.' },
  { icon: <Star size={36} />,  title: 'Перевірені водії',  desc: 'Рейтинг кожного водія. Лише ті, хто отримав понад 4.7 зірки.' },
  { icon: <Clock size={36} />, title: 'Будь-коли',          desc: 'Сервіс працює 24/7 — вдень, вночі та у свята.' },
];

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🚖 Сервіс №1 в місті</div>
          <h1 className="hero-title">
            Твоє таксі <span className="hero-accent">тут і зараз</span>
          </h1>
          <p className="hero-subtitle">
            Замов поїздку за 30 секунд. Перевірені водії, фіксована ціна, жодних сюрпризів.
          </p>
          <div className="hero-actions">
            <button className="btn-taxi btn-hero" onClick={() => navigate(user ? '/book' : '/signup')}>
              Замовити таксі
            </button>
            {!user && (
              <button className="btn-outline btn-hero-sec" onClick={() => navigate('/login')}>
                Увійти
              </button>
            )}
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>1 200+</strong><span>водіїв</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>50 000+</strong><span>поїздок</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>4.9 ★</strong><span>рейтинг</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-illustration">
            <div className="hero-car-wrap">🚖</div>
            <div className="hero-glow" />
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container-taxi">
          <h2 className="features-title">Чому TaxiJul?</h2>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Готовий їхати?</h2>
        <p>Зареєструйся і отримай першу поїздку зі знижкою 20%</p>
        <button className="btn-taxi" onClick={() => navigate(user ? '/book' : '/signup')}>
          Почати
        </button>
      </section>

    </div>
  );
};

export default HomePage;