import './Footer.css';
 
const Footer = () => (
  <footer className="taxijul-footer">
    <div className="footer-brand">TaxiJul</div>
    <div className="footer-links">
      <a href="/book">Замовити таксі</a>
      <a href="/rides">Мої поїздки</a>
      <a href="/profile">Профіль</a>
    </div>
    <p className="footer-copy">2025 TaxiJul. Всі права захищено.</p>
  </footer>
);
 
export default Footer;
