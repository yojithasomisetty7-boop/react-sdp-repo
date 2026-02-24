import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManagerLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      // Clear manager session
      sessionStorage.removeItem('isManager');
      sessionStorage.removeItem('managerUsername');
      sessionStorage.removeItem('managerName');
      sessionStorage.removeItem('managerCompany');

      console.log('Manager logged out successfully');

      // Redirect to home page
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    };

    handleLogout();
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Logging out...</h2>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  );
}
