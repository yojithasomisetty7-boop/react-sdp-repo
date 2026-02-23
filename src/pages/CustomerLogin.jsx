import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const registrations = JSON.parse(localStorage.getItem('customerRegistrations')) || [];
    
    const customer = registrations.find(
      (reg) => reg.username === formData.username && reg.password === formData.password
    );
    
    if (customer) 
    {
      sessionStorage.setItem('isCustomer', 'true');
      alert(`Login successful! Welcome, ${customer.fullName}!`);
      console.log('Login successful:', customer);
      setFormData({
        username: '',
        password: '',
      });
      navigate('/');
      window.location.reload();
    } 
    else 
      {
      alert('Invalid username or password. Please try again.');
      console.log('Login failed: Invalid credentials');
      setFormData({
        username: '',
        password: '',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Customer Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
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

export default CustomerLogin;
