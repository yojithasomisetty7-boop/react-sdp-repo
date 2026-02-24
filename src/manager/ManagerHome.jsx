import React, { useState, useEffect } from 'react';

export default function ManagerHome() {
  const [managerName, setManagerName] = useState('Manager');
  const [managerUsername, setManagerUsername] = useState('N/A');
  const [managerCompany, setManagerCompany] = useState('N/A');

  useEffect(() => {
    // Read from sessionStorage
    const name = sessionStorage.getItem('managerName');
    const username = sessionStorage.getItem('managerUsername');
    const company = sessionStorage.getItem('managerCompany');

    if (name) setManagerName(name);
    if (username) setManagerUsername(username);
    if (company) setManagerCompany(company);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Manager Dashboard</h2>
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h3>Profile Information</h3>
        <p><strong>Manager Name:</strong> {managerName}</p>
        <p><strong>Username:</strong> {managerUsername}</p>
        <p><strong>Company:</strong> {managerCompany}</p>
      </div>
    </div>
  );
}
