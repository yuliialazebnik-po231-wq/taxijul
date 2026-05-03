import './styles/RideCard.css';
 
// Маппінг статусу -> клас бейджу
const statusClass = {
  'Завершена': 'badge-success',
  'Скасована': 'badge-danger',
  'В дорозі':  'badge-warning',
};
 
const RideCard = ({ ride }) => {
  const { from, to, date, price, status, driver, carClass, duration } = ride;
 
  return (
    <div className="ride-card">
      <div className="ride-route">
        <div className="ride-point">
          <span className="ride-dot ride-dot-from"></span>
          <div>
            <p className="ride-point-label">Звідки</p>
            <p className="ride-point-addr">{from}</p>
          </div>
        </div>
        <div className="ride-connector"></div>
        <div className="ride-point">
          <span className="ride-dot ride-dot-to"></span>
          <div>
            <p className="ride-point-label">Куди</p>
            <p className="ride-point-addr">{to}</p>
          </div>
        </div>
      </div>
      <div className="ride-meta">
        <div className="ride-meta-left">
          <p className="ride-date">{date}</p>
          <p className="ride-driver">Водій: {driver}</p>
          <p className="ride-class">{carClass} &bull; {duration}</p>
        </div>
        <div className="ride-meta-right">
          <p className="ride-price">{price} грн</p>
          <span className={`badge-status ${statusClass[status] || 'badge-warning'}`}>{status}</span>
        </div>
      </div>
    </div>
  );
};
 
export default RideCard;
