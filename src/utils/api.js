import axios from 'axios';
 
// Базова адреса реального API (замінити при підключенні бекенду)
const BASE_URL = 'https://api.taxijul.com/v1';
 
// =============================================
// AXIOS — централізований клієнт
// =============================================
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});
 
// Інтерсептор запиту: автоматично додає токен до кожного запиту
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('taxijul_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
 
// Інтерсептор відповіді: при помилці 401 (не авторизований) — перенаправляємо на логін
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('taxijul_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
 
// =============================================
// FETCH API — альтернативний підхід
// =============================================
// Отримати всі поїздки юзера
export const fetchRides = async (userId) => {
  const response = await fetch(`${BASE_URL}/rides?userId=${userId}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
};
 
// =============================================
// AXIOS — ендпоінти TaxiJul
// =============================================
// Створити замовлення
export const bookRide = async (bookingData) => {
  const { data } = await apiClient.post('/bookings', bookingData);
  return data;
};
 
// Знайти водіїв поблизу
export const getDriversNearby = async ({ lat, lng, carClass }) => {
  const { data } = await apiClient.get('/drivers', { params: { lat, lng, carClass } });
  return data;
};
 
// Отримати статус поїздки
export const getRideStatus = async (rideId) => {
  const { data } = await apiClient.get(`/rides/${rideId}/status`);
  return data;
};
 
// Утиліта: форматування ціни в гривнях
export const formatPrice = (amount) =>
  new Intl.NumberFormat('uk-UA', {
    style: 'currency', currency: 'UAH', maximumFractionDigits: 0
  }).format(amount);
