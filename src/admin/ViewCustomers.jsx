import React, { useState, useEffect } from 'react';
import '../admin/admin.css';

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customerRegistrations')) || [];
    setCustomers(storedCustomers);
  }, []);

  const handleDelete = (customerId) => {
    if (window.confirm(`Are you sure you want to delete customer with ID ${customerId}? This action cannot be undone.`)) {
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
      localStorage.setItem('customerRegistrations', JSON.stringify(updatedCustomers));
      setDeleteMessage(`Customer with ID ${customerId} has been deleted successfully.`);
      setTimeout(() => setDeleteMessage(''), 3000);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Customers</h2>
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

      {customers.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#666' }}>No customers registered yet.</p>
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
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Full Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Gender</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Username</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Contact No</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Location</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>Registered At</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #dee2e6', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  <td style={{ padding: '12px' }}>{customer.id}</td>
                  <td style={{ padding: '12px' }}>{customer.fullName}</td>
                  <td style={{ padding: '12px' }}>{customer.gender}</td>
                  <td style={{ padding: '12px' }}>{customer.email}</td>
                  <td style={{ padding: '12px' }}>{customer.username}</td>
                  <td style={{ padding: '12px' }}>{customer.contactNo}</td>
                  <td style={{ padding: '12px' }}>{customer.location}</td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>{customer.registeredAt}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(customer.id)}
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
