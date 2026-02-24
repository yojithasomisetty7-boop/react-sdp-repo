import React, { useState, useEffect } from 'react';

export default function CustomerHome() {
  const [customerName, setCustomerName] = useState('Customer');
  const [customerUsername, setCustomerUsername] = useState('N/A');
  const [customerEmail, setCustomerEmail] = useState('N/A');

  useEffect(() => {
    // Read from sessionStorage
    const name = sessionStorage.getItem('customerName');
    const username = sessionStorage.getItem('customerUsername');
    const email = sessionStorage.getItem('customerEmail');

    if (name) setCustomerName(name);
    if (username) setCustomerUsername(username);
    if (email) setCustomerEmail(email);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Customer Dashboard</h2>
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h3>Profile Information</h3>
        <p><strong>Name:</strong> {customerName}</p>
        <p><strong>Username:</strong> {customerUsername}</p>
        <p><strong>Email:</strong> {customerEmail}</p>
      </div>
    </div>
  );
}
