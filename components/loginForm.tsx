import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm: React.FC = () => {
  const [masterPassword, setMasterPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(masterPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="bg-dark-card p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl text-dark-text mb-6 text-center">
          Password Manager
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="masterPassword"
              className="block text-dark-text mb-2"
            >
              Master Password
            </label>
            <input
              type="password"
              id="masterPassword"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-dark-primary text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
