import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage        from './pages/HomePage';
import BookingPage     from './pages/BookingPage';
import RideHistoryPage from './pages/RideHistoryPage';
import ProfilePage     from './pages/ProfilePage';
import LoginPage       from './pages/LoginPage';
import SignupPage      from './pages/SignupPage';
 
function App() {
  return (
    // AuthProvider — даємо всьому застосунку доступ до стану авторизації
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Кожен Route — це пара: адреса -> компонент-сторінка */}
              <Route path="/"        element={<HomePage />} />
              <Route path="/book"    element={<BookingPage />} />
              <Route path="/rides"   element={<RideHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login"   element={<LoginPage />} />
              <Route path="/signup"  element={<SignupPage />} />
              {/* Будь-яка невідома адреса — перенаправляємо на головну */}
              <Route path="*"        element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
 
export default App;
