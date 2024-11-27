// File: pages/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PasswordEntry } from '../types';
import { loadPasswords, addPassword, deletePassword, verifyMasterPassword } from '../utils/storage';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const [masterPassword, setMasterPassword] = useState('');
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ website: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('masterPasswordHash')) {
      router.push('/');
    }
  }, []);

  const handleLoadPasswords = () => {
    try {
      if (!verifyMasterPassword(masterPassword)) {
        setError('Invalid master password');
        return;
      }
      const loadedPasswords = loadPasswords(masterPassword);
      setPasswords(loadedPasswords);
      setIsVaultUnlocked(true);
      setError('');
    } catch (err) {
      setError('Failed to load passwords');
      setIsVaultUnlocked(false);
    }
  };

  const handleAddPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVaultUnlocked) {
      setError('Please unlock the vault first');
      return;
    }
    
    try {
      const updatedPasswords = addPassword(newEntry, passwords, masterPassword);
      setPasswords(updatedPasswords);
      setNewEntry({ website: '', username: '', password: '' });
      setError('');
    } catch (err) {
      setError('Failed to add password');
    }
  };

  const handleDeletePassword = (id: string) => {
    if (!isVaultUnlocked) {
      setError('Please unlock the vault first');
      return;
    }

    try {
      const updatedPasswords = deletePassword(id, passwords, masterPassword);
      setPasswords(updatedPasswords);
      setError('');
    } catch (err) {
      setError('Failed to delete password');
    }
  };

  const handleRevealPassword = (password: string) => {
    if (!isVaultUnlocked) {
      setError('Please unlock the vault first');
      return;
    }
    // You could implement a more secure way to show the password
    alert(`Password: ${password}`);
  };

  return (
    <Layout title="Dashboard - Password Manager">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6">Password Manager</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {!isVaultUnlocked && (
          <div className="mb-6">
            <input 
              type="password"
              placeholder="Enter Master Password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent transition-all duration-200 ease-in-out
          hover:bg-gray-750"/>
            <button 
              onClick={handleLoadPasswords}
              className="mt-2 bg-dark-primary text-white px-4 py-2 rounded-md"
            >
              Unlock Vault
            </button>
          </div>
        )}

        {isVaultUnlocked && (
          <>
            <form onSubmit={handleAddPassword} className="mb-6 bg-dark-card p-4 rounded-md">
              <input 
                type="text" 
                placeholder="Website"
                value={newEntry.website}
                onChange={(e) => setNewEntry({...newEntry, website: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent transition-all duration-200 ease-in-out
                hover:bg-gray-750"
                required 
              />
              <input 
                type="text" 
                placeholder="Username"
                value={newEntry.username}
                onChange={(e) => setNewEntry({...newEntry, username: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent transition-all duration-200 ease-in-out
          hover:bg-gray-750"
          required 
              />
              <input 
                type="password" 
                placeholder="Password"
                value={newEntry.password}
                onChange={(e) => setNewEntry({...newEntry, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent transition-all duration-200 ease-in-out
          hover:bg-gray-750"
                        required 
              />
              <button 
                type="submit"
                className="bg-dark-secondary text-white px-4 py-2 rounded-md"
              >
                Add Password
              </button>
            </form>

            <div>
              {passwords.map((entry) => (
                <div 
                  key={entry.id} 
                  className="bg-dark-card p-4 mb-2 rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{entry.website}</p>
                    <p>{entry.username}</p>
                    <button
                      onClick={() => handleRevealPassword(entry.password)}
                      className="text-blue-500 text-sm hover:text-blue-700"
                    >
                      Show Password
                    </button>
                  </div>
                  <button 
                    onClick={() => handleDeletePassword(entry.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;