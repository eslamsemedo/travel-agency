'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Setup = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handleSetup = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/auth/setup-admin', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          credentials: data.credentials
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to create admin account'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Travel Agency Admin Setup
          </h1>
          <p className="text-gray-600">
            Create the first admin account for your travel agency
          </p>
        </div>

        {!result && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
              <p className="text-sm">
                This will create the first admin account with the following credentials:
              </p>
              <ul className="mt-2 text-sm">
                <li><strong>Username:</strong> admin</li>
                <li><strong>Password:</strong> admin123</li>
                <li><strong>Email:</strong> admin@travelagency.com</li>
                <li><strong>Role:</strong> super_admin</li>
              </ul>
            </div>

            <button
              onClick={handleSetup}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
            </button>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className={`border px-4 py-3 rounded-md ${
              result.success 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              <p className="font-medium">{result.message}</p>
              
              {result.success && result.credentials && (
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-sm font-medium mb-2">Your login credentials:</p>
                  <div className="space-y-1 text-sm">
                    <p><strong>Username:</strong> {result.credentials.username}</p>
                    <p><strong>Password:</strong> {result.credentials.password}</p>
                  </div>
                </div>
              )}
            </div>

            {result.success && (
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/admin/login')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Go to Admin Login
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Create Another Admin
                </button>
              </div>
            )}

            {!result.success && (
              <button
                onClick={() => setResult(null)}
                className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            After creating the admin account, you can login and manage your travel agency content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Setup; 