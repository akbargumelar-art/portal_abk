import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MOCK_USERS } from '../constants';
import { SparklesIcon } from '@heroicons/react/24/solid';

const LoginPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(Object.keys(MOCK_USERS)[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(selectedUser);
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-telkomsel-gray-50 to-red-100 p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-red-100/50">
        <div className="text-center mb-8">
            <div className="inline-block bg-telkomsel-red p-3 rounded-full mb-4">
                <SparklesIcon className="h-8 w-8 text-white"/>
            </div>
          <h1 className="text-3xl font-bold text-telkomsel-red">Portal Cirebon Raya</h1>
          <p className="text-telkomsel-gray-600 mt-2">PT Agrabudi Komunika</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="user-select" className="block text-sm font-medium text-telkomsel-gray-700 mb-2">
              Select Role to Login As
            </label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-3 border border-telkomsel-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-telkomsel-red focus:border-transparent transition-all"
            >
              {Object.entries(MOCK_USERS).map(([key, user]) => (
                <option key={key} value={key}>{user.role}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-red-500/30 text-sm font-medium text-white bg-telkomsel-red hover:bg-telkomsel-dark-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-telkomsel-red disabled:bg-telkomsel-gray-400 disabled:shadow-none transition-all duration-300"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;