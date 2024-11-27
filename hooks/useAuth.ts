import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { verifyMasterPassword, initializeVault } from '../utils/storage';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (masterPassword: string) => {
    if (masterPassword.length < 8) {
      throw new Error('Master password must be at least 8 characters');
    }

    if (!localStorage.getItem('masterPasswordHash')) {
      initializeVault(masterPassword);
      setIsAuthenticated(true);
      router.push('/dashboard');
      return;
    }

    if (verifyMasterPassword(masterPassword)) {
      setIsAuthenticated(true);
      router.push('/dashboard');
    } else {
      throw new Error('Invalid master password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push('/');
  };

  return { isAuthenticated, login, logout };
};
