import { useState, useEffect, useCallback } from 'react';
import { mockRides } from '../data/rides';

export const useRideHistory = (userId) => {
  const [rides, setRides]     = useState([]);
  const [loading, setLoading] = useState(true);
const [error] = useState(null);
  const [filter, setFilter]   = useState('Всі');

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    setLoading(true);

    const timer = setTimeout(() => {
     const userRides = mockRides;
      setRides(userRides);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [userId]);

  const filteredRides = filter === 'Всі'
    ? rides
    : rides.filter((r) => r.status === filter);

  const stats = {
    total:      rides.length,
    completed:  rides.filter((r) => r.status === 'Завершена').length,
    cancelled:  rides.filter((r) => r.status === 'Скасована').length,
    totalSpent: rides
      .filter((r) => r.status === 'Завершена')
      .reduce((sum, r) => sum + r.price, 0),
  };

  const changeFilter = useCallback((f) => setFilter(f), []);

  return { rides: filteredRides, loading, error, filter, changeFilter, stats };
};