'use client';

import { useState, useEffect } from 'react';
import { PasswordEntry, savePasswords, loadPasswords } from '@/lib/storage';
import PasswordList from '@/components/PasswordList';
import AddPasswordForm from '@/components/AddPasswordForm';
import PasswordGenerator from '@/components/PasswordGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

const MASTER_PASSWORD = 'admin123';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isUnlocked) {
      const storedPasswords = loadPasswords();
      setPasswords(storedPasswords);
    }
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPassword === MASTER_PASSWORD) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect master password');
    }
    setMasterPassword('');
  };

  const handleAddPassword = (entry: Omit<PasswordEntry, 'id'>) => {
    const newEntry: PasswordEntry = {
      ...entry,
      id: crypto.randomUUID(),
    };
    const updatedPasswords = [...passwords, newEntry];
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
  };

  const handleDeletePassword = (id: string) => {
    const updatedPasswords = passwords.filter((p) => p.id !== id);
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-6">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Password Manager</h1>
            <p className="text-muted-foreground">Enter master password to unlock</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <Input
              type="password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              placeholder="Master Password"
              className="w-full"
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Password Manager</h1>
        <Button onClick={() => setIsUnlocked(false)}>Lock</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <AddPasswordForm onAdd={handleAddPassword} />
          <PasswordGenerator />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Stored Passwords</h2>
          <PasswordList
            passwords={passwords}
            onDelete={handleDeletePassword}
          />
        </div>
      </div>
    </div>
  );
}