'use client'
import React, { useState } from 'react';

const TestLogin = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log('Testing login...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Test login response:', data);

      if (response.ok) {
        // Test the auth check
        const authResponse = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        const authData = await authResponse.json();
        
        setResult({
          success: true,
          login: data,
          auth: authData,
          message: 'Login test successful!'
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Login test failed'
        });
      }
    } catch (error) {
      console.error('Test error:', error);
      setResult({
        success: false,
        message: 'Network error during test'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Login Test
          </h1>
          <p className="text-gray-600">
            Test the login functionality
          </p>
        </div>

        <button
          onClick={testLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Testing...' : 'Test Login'}
        </button>

        {result && (
          <div className="mt-6">
            <div className={`border px-4 py-3 rounded-md ${
              result.success 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              <p className="font-medium">{result.message}</p>
              {result.success && (
                <div className="mt-4">
                  <details className="text-sm">
                    <summary className="cursor-pointer font-medium">View Details</summary>
                    <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <a 
            href="/admin/login" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go to Login Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestLogin; 