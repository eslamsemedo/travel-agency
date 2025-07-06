'use client'
import React, { useState, useEffect } from 'react';

const TestAdmin = () => {
  const [authStatus, setAuthStatus] = useState('checking');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setAuthStatus(`authenticated: ${data.admin.username}`);
        } else {
          setAuthStatus('not authenticated');
        }
      } catch (error) {
        setAuthStatus(`error: ${error}`);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Test Page</h1>
      <div className="space-y-4">
        <p><strong>Auth Status:</strong> {authStatus}</p>
        <p><strong>Page:</strong> /admin/test-admin</p>
        <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TestAdmin; 