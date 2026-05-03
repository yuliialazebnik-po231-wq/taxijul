// Тестові поїздки — імітують відповідь GET /api/rides
export const mockRides = [
  {
    id: 1, userId: 1,
    from: 'вул. Хрещатик, 1, Київ',
    to: 'Аеропорт Бориспіль',
    date: '20.04.2025, 14:30',
    price: 450,
    status: 'Завершена',
    driver: 'Олег М.',
    carClass: 'Comfort',
    duration: '42 хв',
  },
  {
    id: 2, userId: 1,
    from: 'пл. Незалежності, 3, Київ',
    to: 'вул. Велика Васильківська, 50',
    date: '18.04.2025, 09:15',
    price: 120,
    status: 'Завершена',
    driver: 'Андрій К.',
    carClass: 'Econom',
    duration: '18 хв',
  },
  {
    id: 3, userId: 1,
    from: 'ст. метро Лівобережна',
    to: 'вул. Дніпровська набережна, 7',
    date: '15.04.2025, 19:00',
    price: 89,
    status: 'Скасована',
    driver: 'Іван П.',
    carClass: 'Econom',
    duration: '-',
  },
  {
    id: 4, userId: 1,
    from: 'вул. Саксаганського, 12',
    to: 'ТЦ Gulliver, пр. Перемоги, 4',
    date: '12.04.2025, 11:00',
    price: 210,
    status: 'Завершена',
    driver: 'Михайло Р.',
    carClass: 'Business',
    duration: '25 хв',
  },
  {
    id: 5, userId: 1,
    from: 'вул. Антоновича, 33',
    to: 'вул. Набережно-Хрещатицька, 5',
    date: '08.04.2025, 21:45',
    price: 175,
    status: 'Завершена',
    driver: 'Сергій Т.',
    carClass: 'Comfort',
    duration: '31 хв',
  },
];
 
// Тестові водії — імітують відповідь GET /api/drivers
export const mockDrivers = [
  { id: 1, name: 'Олег М.',    car: 'Toyota Camry - Білий',    plate: 'AA 1234 KK', rating: 4.9,  trips: 1240, eta: '3 хв', carClass: 'Comfort'  },
  { id: 2, name: 'Андрій К.',  car: 'Hyundai Sonata - Сірий',  plate: 'KA 5678 HH', rating: 4.8,  trips: 867,  eta: '5 хв', carClass: 'Econom'   },
  { id: 3, name: 'Іван П.',    car: 'BMW 5 Series - Чорний',   plate: 'AI 9012 BB', rating: 4.95, trips: 2105, eta: '7 хв', carClass: 'Business' },
];
 
// Класи авто для форми замовлення
export const carClasses = [
  { id: 'Econom',   label: 'Econom',   icon: 'car',    desc: 'Бюджетно та швидко', pricePerKm: 12, baseFare: 40  },
  { id: 'Comfort',  label: 'Comfort',  icon: 'car',    desc: 'Комфортне авто',     pricePerKm: 18, baseFare: 60  },
  { id: 'Business', label: 'Business', icon: 'car',    desc: 'Преміум клас',       pricePerKm: 30, baseFare: 100 },
];
