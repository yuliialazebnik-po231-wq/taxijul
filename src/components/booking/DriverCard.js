import './styles/BookingForm.css';
 
const DriverCard = ({ driver }) => {
  return (
    <div className="driver-card">
      <div className="driver-avatar">{driver.name[0]}</div>
      <div className="driver-info">
        <h5>{driver.name}</h5>
        <p>{driver.car}</p>
        <p className="driver-plate">{driver.plate}</p>
      </div>
      <div className="driver-meta">
        <div className="driver-rating">{driver.rating} star</div>
        <div className="driver-eta">Прибуде: {driver.eta}</div>
        <div className="driver-trips">{driver.trips} поїздок</div>
      </div>
    </div>
  );
};
 
export default DriverCard;
