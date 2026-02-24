import React, { useState, useEffect } from 'react';

export default function AddEvent() {
  const [managerUsername, setManagerUsername] = useState('N/A');
  const [eventFormData, setEventFormData] = useState({
    eventName: '',
    eventDescription: '',
    capacity: '',
    imageUrl: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Read manager username from sessionStorage
    const username = sessionStorage.getItem('managerUsername');
    if (username) setManagerUsername(username);
  }, []);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventFormData({
      ...eventFormData,
      [name]: value,
    });
    setErrorMessage('');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    // Validate form
    if (!eventFormData.eventName.trim()) {
      setErrorMessage('Event name is required');
      return;
    }
    if (!eventFormData.eventDescription.trim()) {
      setErrorMessage('Event description is required');
      return;
    }
    if (!eventFormData.capacity || eventFormData.capacity <= 0) {
      setErrorMessage('Capacity must be a positive number');
      return;
    }
    if (!eventFormData.imageUrl.trim()) {
      setErrorMessage('Image URL is required');
      return;
    }

    // Generate 6-digit random event ID
    const eventId = Math.floor(Math.random() * 900000) + 100000;

    // Create event object
    const newEvent = {
      eventId: eventId,
      eventName: eventFormData.eventName,
      eventDescription: eventFormData.eventDescription,
      capacity: eventFormData.capacity,
      imageUrl: eventFormData.imageUrl,
      managerUsername: managerUsername,
      createdAt: new Date().toLocaleString()
    };

    // Get existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('managerEvents')) || [];

    // Add new event
    existingEvents.push(newEvent);

    // Save to localStorage
    localStorage.setItem('managerEvents', JSON.stringify(existingEvents));

    console.log('Event added:', newEvent);
    setSuccessMessage(`Event "${eventFormData.eventName}" has been created successfully with ID: ${eventId}`);

    // Reset form
    setEventFormData({
      eventName: '',
      eventDescription: '',
      capacity: '',
      imageUrl: ''
    });

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh'
    }}>
      <h2>Add Event</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>Manager: <strong>{managerUsername}</strong></p>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        maxWidth: '600px',
        width: '100%'
      }}>
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
        <form onSubmit={handleAddEvent}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="eventName"><strong>Event Name *</strong></label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventFormData.eventName}
              onChange={handleEventChange}
              required
              placeholder="Enter event name"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="eventDescription"><strong>Event Description *</strong></label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={eventFormData.eventDescription}
              onChange={handleEventChange}
              required
              placeholder="Enter event description"
              rows="4"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="capacity"><strong>Capacity *</strong></label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={eventFormData.capacity}
              onChange={handleEventChange}
              required
              placeholder="Enter event capacity"
              min="1"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="imageUrl"><strong>Image URL *</strong></label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={eventFormData.imageUrl}
              onChange={handleEventChange}
              required
              placeholder="Enter image URL (https://...)"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button type="submit" style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
