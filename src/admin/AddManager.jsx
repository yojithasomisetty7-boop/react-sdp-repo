import React, { useState } from 'react';
import '../pages/style.css';

export default function AddManager() {
  const [formData, setFormData] = useState({
    managerName: '',
    companyName: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    contactNo: '',
    location: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.managerName.trim()) {
      setErrorMessage('Manager name is required');
      return false;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage('Company name is required');
      return false;
    }
    if (!formData.gender) {
      setErrorMessage('Gender is required');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!formData.username.trim()) {
      setErrorMessage('Username is required');
      return false;
    }
    if (!formData.password.trim()) {
      setErrorMessage('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return false;
    }
    if (!formData.contactNo.trim()) {
      setErrorMessage('Contact number is required');
      return false;
    }
    if (!formData.location.trim()) {
      setErrorMessage('Location is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const existingManagers = JSON.parse(localStorage.getItem('managerRegistrations')) || [];

    // Check if username already exists
    const usernameExists = existingManagers.some(manager => manager.username === formData.username);
    if (usernameExists) {
      setErrorMessage('Username already exists. Please choose a different username.');
      return;
    }

    const newManager = {
      ...formData,
      id: Math.floor(Math.random() * 900000) + 100000,
      registeredAt: new Date().toLocaleString(),
    };

    existingManagers.push(newManager);

    localStorage.setItem('managerRegistrations', JSON.stringify(existingManagers));

    console.log('Manager added:', newManager);
    setSuccessMessage(`Manager "${formData.managerName}" has been added successfully with ID: ${newManager.id}`);

    // Reset form
    setFormData({
      managerName: '',
      companyName: '',
      gender: '',
      email: '',
      username: '',
      password: '',
      contactNo: '',
      location: '',
    });

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Add Manager</h1>
        {successMessage && (
          <div style={{
            color: '#28a745',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#d4edda',
            borderRadius: '4px',
            border: '1px solid #c3e6cb'
          }}>
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div style={{
            color: '#dc3545',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="managerName">Manager Name *</label>
            <input
              type="text"
              id="managerName"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              required
              placeholder="Enter manager's full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
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
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNo">Contact No *</label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              placeholder="Enter contact number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter location/city"
            />
          </div>

          <button type="submit" className="submit-btn">Add Manager</button>
        </form>
      </div>
    </div>
  );
}
