'use client'
import React, { useState, useEffect } from 'react';

const DebugPage = () => {
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [cookies, setCookies] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      const data = await response.json();
      setAuthStatus({
        status: response.status,
        data: data
      });
    } catch (error) {
      setAuthStatus({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const checkCookies = () => {
    const cookieString = document.cookie;
    setCookies(cookieString);
  };

  useEffect(() => {
    checkAuth();
    checkCookies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Authentication Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auth Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
            <button
              onClick={checkAuth}
              disabled={loading}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Auth'}
            </button>
            
            {authStatus && (
              <div className="bg-gray-100 p-4 rounded">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(authStatus, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Browser Cookies</h2>
            <button
              onClick={checkCookies}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Refresh Cookies
            </button>
            
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm font-medium mb-2">Document Cookies:</p>
              <pre className="text-xs overflow-auto">
                {cookies || 'No cookies found'}
              </pre>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/admin/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Login
            </a>
            <a
              href="/admin/test-login"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Test Login
            </a>
            <a
              href="/admin"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Go to Admin Panel
            </a>
            <button
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                window.location.reload();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage; 