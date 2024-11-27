import { encryptData, decryptData } from './crypto';

export interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
}

const STORAGE_KEY = 'password_manager_data';

export const savePasswords = (passwords: PasswordEntry[]): void => {
  const encryptedData = encryptData(JSON.stringify(passwords));
  localStorage.setItem(STORAGE_KEY, encryptedData);
};

export const loadPasswords = (): PasswordEntry[] => {
  const encryptedData = localStorage.getItem(STORAGE_KEY);
  if (!encryptedData) return [];
  
  try {
    const decryptedData = decryptData(encryptedData);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Error loading passwords:', error);
    return [];
  }
};