import { AES, enc } from 'crypto-js';

const ENCRYPTION_KEY = 'your-secure-key-here';

export const encryptData = (data: string): string => {
  return AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(enc.Utf8);
};

export const generatePassword = (
  length: number = 12,
  includeUppercase: boolean = true,
  includeLowercase: boolean = true,
  includeNumbers: boolean = true,
  includeSpecial: boolean = true
): string => {
  let chars = '';
  if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) chars += '0123456789';
  if (includeSpecial) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};