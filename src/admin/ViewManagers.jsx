import React, { useState, useEffect } from 'react';
import '../admin/admin.css';

export default function ViewManagers() {
  const [managers, setManagers] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const storedManagers = JSON.parse(localStorage.getItem('managerRegistrations')) || [];
    setManagers(storedManagers);
  }, []);

  const handleDelete = (managerId) => {
    if (window.confirm(`Are you sure you want to delete manager with ID ${managerId}? This action cannot be undone.`)) {
      const updatedManagers = managers.filter(manager => manager.id !== managerId);
      setManagers(updatedManagers);
      localStorage.setItem('managerRegistrations', JSON.stringify(updatedManagers));
      setDeleteMessage(`Manager with ID ${managerId} has been deleted successfully.`);
      setTimeout(() => setDeleteMessage(''), 3000);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Managers</h2>
      {deleteMessage && (
        <div style={{
          color: '#28a745',
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#d4edda',
          borderRadius: '4px',
          border: '1px solid #c3e6cb'
        }}>
          {deleteMessage}
        </div>
      )}

      {managers.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#666' }}>No managers registered yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '4px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Manager Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Company Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Contact No</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Location</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Registered At</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #dee2e6', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  <td style={{ padding: '12px' }}>{manager.id}</td>
                  <td style={{ padding: '12px' }}>{manager.managerName}</td>
                  <td style={{ padding: '12px' }}>{manager.companyName}</td>
                  <td style={{ padding: '12px' }}>{manager.email}</td>
                  <td style={{ padding: '12px' }}>{manager.contactNo}</td>
                  <td style={{ padding: '12px' }}>{manager.location}</td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>{manager.registeredAt}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(manager.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
