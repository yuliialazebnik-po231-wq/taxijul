import { useState } from 'react';
import { carClasses } from '../../data/carClasses';
import './styles/BookingForm.css';
 
const BookingForm = ({ onSubmit }) => {
  const [from, setFrom]         = useState('');
  const [to, setTo]             = useState('');
  const [carClass, setCarClass] = useState('Econom');
 
  // Розраховуємо орієнтовну ціну — спрощена формула без реальної відстані
  const selectedClass = carClasses.find((c) => c.id === carClass);
  const estimatedPrice = selectedClass
    ? selectedClass.baseFare + selectedClass.pricePerKm * 8   // 8 км — приклад
    : 0;
 
  const handleSubmit = (e) => {
    e.preventDefault();           // зупиняємо стандартну відправку форми
    if (!from || !to) return;     // проста валідація
    onSubmit({ from, to, carClass, estimatedPrice });
  };
 
  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <h4>Замовити таксі</h4>
      </div>
      <div className="booking-card-body">
        <form onSubmit={handleSubmit}>
 
          {/* Поле 'Звідки' */}
          <div className="form-group">
            <label className="form-label">Звідки</label>
            <input
              className="form-input"
              type="text"
              placeholder="Введіть адресу відправлення"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
 
          {/* Поле 'Куди' */}
          <div className="form-group">
            <label className="form-label">Куди</label>
            <input
              className="form-input"
              type="text"
              placeholder="Введіть адресу призначення"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
 
          {/* Вибір класу авто */}
          <div className="form-group">
            <label className="form-label">Клас авто</label>
            <div className="car-class-grid">
              {carClasses.map((cls) => (
                <label key={cls.id} className={`car-class-item ${carClass === cls.id ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="carClass"
                    value={cls.id}
                    checked={carClass === cls.id}
                    onChange={() => setCarClass(cls.id)}
                  />
                  <span className="car-class-label-text">
                    <strong>{cls.label}</strong>
                    <small>{cls.desc}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>
 
          {/* Орієнтовна ціна (показується лише коли заповнені обидва поля) */}
          {from && to && (
            <div className="price-estimate-box">
              <span className="price-estimate-label">Орієнтовна вартість</span>
              <span className="price-estimate-value">{estimatedPrice} грн</span>
            </div>
          )}
 
          <button type="submit" className="btn-taxi w-100">
            Знайти водія
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default BookingForm;
