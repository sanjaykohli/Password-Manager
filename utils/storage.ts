import { v4 as uuidv4 } from 'uuid';
import { encryptData, decryptData } from './encryption';
import { PasswordEntry } from '../types';
const CryptoJS = require("crypto-js");


const MASTER_PASSWORD_HASH_KEY = 'masterPasswordHash';
const PASSWORD_VAULT_KEY = 'passwordVault';

export const initializeVault = (masterPassword: string): void => {
  const passwordHash = CryptoJS.SHA256(masterPassword).toString();
  localStorage.setItem(MASTER_PASSWORD_HASH_KEY, passwordHash);
  savePasswords([], masterPassword);
};

export const verifyMasterPassword = (masterPassword: string): boolean => {
  const storedHash = localStorage.getItem(MASTER_PASSWORD_HASH_KEY);
  if (!storedHash) return false;
  const passwordHash = CryptoJS.SHA256(masterPassword).toString();
  return passwordHash === storedHash;
};

export const savePasswords = (
  passwords: PasswordEntry[],
  masterPassword: string
): void => {
  try {
    const encryptedPasswords = encryptData(JSON.stringify(passwords), masterPassword);
    localStorage.setItem(PASSWORD_VAULT_KEY, encryptedPasswords);
  } catch (error) {
    console.error('Error saving passwords:', error);
    throw new Error('Failed to save passwords');
  }
};

export const loadPasswords = (masterPassword: string): PasswordEntry[] => {
  try {
    const encryptedData = localStorage.getItem(PASSWORD_VAULT_KEY);
    if (!encryptedData) return [];
    const decryptedData = decryptData(encryptedData, masterPassword);
    return JSON.parse(decryptedData);
  } catch {
    throw new Error('Failed to load passwords');
  }
};

export const addPassword = (
  entry: Omit<PasswordEntry, 'id'>,
  passwords: PasswordEntry[],
  masterPassword: string
): PasswordEntry[] => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  };
  const updatedPasswords = [...passwords, newEntry];
  savePasswords(updatedPasswords, masterPassword);
  return updatedPasswords;
};

export const deletePassword = (
  id: string,
  passwords: PasswordEntry[],
  masterPassword: string
): PasswordEntry[] => {
  const updatedPasswords = passwords.filter(p => p.id !== id);
  savePasswords(updatedPasswords, masterPassword);
  return updatedPasswords;
};
