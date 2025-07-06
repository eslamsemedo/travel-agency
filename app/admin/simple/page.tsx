'use client'
import React from 'react';

const SimpleAdmin = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Simple Admin Panel</h1>
      <div className="space-y-4">
        <p>✅ You are successfully logged in!</p>
        <p>This is a simple admin page to test routing.</p>
        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-bold">Admin Panel Features:</h2>
          <ul className="mt-2 space-y-1">
            <li>• Manage Hotels</li>
            <li>• Manage Sea Trips</li>
            <li>• Manage Safari Trips</li>
            <li>• Secure Authentication</li>
          </ul>
        </div>
        <a 
          href="/admin" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Go to Full Admin Panel
        </a>
      </div>
    </div>
  );
};

export default SimpleAdmin; 