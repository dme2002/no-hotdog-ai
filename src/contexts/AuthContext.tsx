import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi } from '@/services/api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (creds: { username: string; password: string }) => Promise<void>;
  register: (creds: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = authApi.getStoredUser();
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (creds: { username: string; password: string }) => {
    setError(null);
    try {
      const data = await authApi.login(creds);
      setUser(data.user);
    } catch (err) {
      setError('Login failed');
      throw err;
    }
  };

  const register = async (creds: { username: string; email: string; password: string }) => {
    setError(null);
    try {
      await authApi.register(creds);
      await login({ username: creds.username, password: creds.password });
    } catch (err) {
      setError('Registration failed');
      throw err;
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      error,
      clearError: () => setError(null),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
