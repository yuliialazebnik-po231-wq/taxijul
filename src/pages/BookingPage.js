import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/booking/BookingForm';
import DriverCard from '../components/booking/DriverCard';
import { mockDrivers } from '../data/drivers';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './styles/BookingPage.css';

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [driver, setDriver]           = useState(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [formData, setFormData]       = useState(null);

  if (!user) { navigate('/login'); return null; }

  const handleBook = async (data) => {
    setLoading(true);
    setError(null);
    setDriver(null);
    setFormData(data);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const found = mockDrivers.find((d) => d.carClass === data.carClass) || mockDrivers[0];
      setDriver(found);
    } catch (err) {
      setError('Не вдалося знайти водія. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      // Зберігаємо поїздку в Firestore
      await addDoc(collection(db, 'rides'), {
        userId: user.id,
        from: formData.from,
        to: formData.to,
        carClass: formData.carClass,
        price: formData.estimatedPrice,
        driver: driver.name,
        status: 'Завершена',
        duration: '—',
        date: new Date().toLocaleString('uk-UA'),
        createdAt: serverTimestamp(),
      });
      setBookingDone(true);
    } catch (err) {
      setError('Помилка збереження замовлення');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-taxi">
        <h1 className="page-title">Замовлення таксі</h1>
        <p className="page-subtitle">Введіть маршрут і оберіть клас авто</p>

        <div className="booking-layout">
          <div>
            <BookingForm onSubmit={handleBook} />
          </div>

          <div className="booking-result">
            {loading && <div className="spinner-taxi">Шукаємо водія...</div>}
            {error && !loading && <div className="error-box">{error}</div>}

            {bookingDone && (
              <div className="booking-confirmed">
                <div className="confirmed-icon">✅</div>
                <h5>Замовлення підтверджено!</h5>
                <p>Поїздку збережено у вашій історії</p>
                <button className="btn-outline" onClick={() => navigate('/rides')}>
                  Мої поїздки
                </button>
              </div>
            )}

            {driver && !loading && !bookingDone && (
              <div>
                <p className="found-label">Знайдено водія:</p>
                <DriverCard driver={driver} />
                <button className="btn-taxi btn-confirm" onClick={handleConfirm}>
                  Підтвердити замовлення
                </button>
              </div>
            )}

            {!loading && !error && !driver && !bookingDone && (
              <div className="booking-hint">
                <p>Заповни форму зліва і натисни Знайти водія</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;