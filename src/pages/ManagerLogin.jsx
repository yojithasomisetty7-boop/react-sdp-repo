import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ManagerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get all managers from localStorage
    const managers = JSON.parse(localStorage.getItem('managerRegistrations')) || [];

    // Find manager with matching credentials
    const manager = managers.find(
      m => m.username === formData.username && m.password === formData.password
    );

    if (manager) {
      // Set manager session
      sessionStorage.setItem('isManager', 'true');
      sessionStorage.setItem('managerUsername', manager.username);
      sessionStorage.setItem('managerName', manager.managerName);
      sessionStorage.setItem('managerCompany', manager.companyName);
      console.log('Manager Login successful!');

      // Reset form and redirect to manager dashboard
      setFormData({
        username: '',
        password: '',
      });

      // Redirect to home page
      window.location.href = '/';
    } else {
      setError('Invalid username or password');
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Manager Login</h1>
        {error && (
          <div style={{
            color: '#dc3545',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;
