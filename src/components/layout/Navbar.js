import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';
 
const NavbarMain = () => {
  const { user, logout } = useAuth();  // беремо стан авторизації з контексту
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
 
  return (
    <Navbar className="taxijul-navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <span>taxi</span> TaxiJul
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center gap-1">
 
            {user ? (
              // --- Меню для авторизованого юзера ---
              <>
                <NavLink to="/book"    className="nav-link">Замовити</NavLink>
                <NavLink to="/rides"   className="nav-link">Мої поїздки</NavLink>
                <NavLink to="/profile" className="nav-link">Профіль</NavLink>
                <div className="nav-user-info ms-2">
                  <div className="nav-avatar">{user.name[0]}</div>
                  <span>{user.name}</span>
                </div>
                <button className="btn-nav-cta ms-2" onClick={handleLogout}>Вийти</button>
              </>
            ) : (
              // --- Меню для гостя ---
              <>
                <NavLink to="/login"  className="nav-link">Увійти</NavLink>
                <button className="btn-nav-cta ms-2" onClick={() => navigate('/signup')}>
                  Реєстрація
                </button>
              </>
            )}
 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
 
export default NavbarMain;
