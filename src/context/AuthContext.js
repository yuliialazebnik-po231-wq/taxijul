import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]           = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const creationTime = firebaseUser.metadata.creationTime;
        const date = new Date(creationTime);

        const memberSince = date.toLocaleDateString('uk-UA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });

        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        let experience;
        if (diffDays < 30) {
          experience = `${diffDays} дн.`;
        } else if (diffDays < 365) {
          const months = Math.floor(diffDays / 30);
          experience = `${months} міс.`;
        } else {
          const years = Math.floor(diffDays / 365);
          experience = `${years} рік`;
        }

        setUser({
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email,
          email: firebaseUser.email,
          phone: '+38 099 123 45 67',
          totalRides: 5,
          memberSince,
          experience,
          rating: 4.9,
        });

      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (err) {
      setAuthError('Помилка входу через Google');
      return false;
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      setAuthError('Невірний email або пароль');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('Цей email вже зареєстрований. Спробуйте увійти.');
      } else if (err.code === 'auth/weak-password') {
        setAuthError('Пароль занадто короткий. Мінімум 6 символів.');
      } else if (err.code === 'auth/invalid-email') {
        setAuthError('Невірний формат email.');
      } else {
        setAuthError('Помилка реєстрації. Спробуйте ще раз.');
      }
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setAuthError(null);
  };

  const clearError = () => setAuthError(null);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      Завантаження...
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, authError, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};