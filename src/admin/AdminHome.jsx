import React from 'react';

export default function AdminHome() {
  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Admin Dashboard</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Logged in as: <strong>{adminUsername}</strong>
      </p>
    
    </div>
  );
}
