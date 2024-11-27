import { useState } from 'react';
import { encryptData, decryptData } from '../utils/encryption';

export const useEncryption = () => {
  const [error, setError] = useState<string | null>(null);

  const encrypt = (data: string, masterPassword: string) => {
    try {
      return encryptData(data, masterPassword);
    } catch (err) {
      setError('Encryption failed');
      return null;
    }
  };

  const decrypt = (encryptedData: string, masterPassword: string) => {
    try {
      return decryptData(encryptedData, masterPassword);
    } catch (err) {
      setError('Decryption failed');
      return null;
    }
  };

  const resetError = () => {
    setError(null);
  };

  return { 
    encrypt, 
    decrypt, 
    error, 
    resetError 
  };
};