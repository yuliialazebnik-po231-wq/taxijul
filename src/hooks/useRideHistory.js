import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const useRideHistory = (userId) => {
  const [rides, setRides]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [filter, setFilter]   = useState('Всі');

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    setLoading(true);
    setError(null);

    // Підписуємось на зміни в Firestore — оновлюється в реальному часі
const q = query(
  collection(db, 'rides'),
  where('userId', '==', userId)
);
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRides(data);
        setLoading(false);
      },
      (err) => {
        setError('Не вдалося завантажити поїздки');
        setLoading(false);
      }
    );

    // Cleanup: відписуємось при розмонтуванні
    return () => unsubscribe();
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