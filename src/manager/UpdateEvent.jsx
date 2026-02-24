import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateEvent() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [managerUsername, setManagerUsername] = useState('N/A');
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    capacity: '',
    imageUrl: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get manager username from sessionStorage
    const username = sessionStorage.getItem('managerUsername');
    setManagerUsername(username);

    // Get all events from localStorage
    const allEvents = JSON.parse(localStorage.getItem('managerEvents')) || [];

    // Filter events by current manager username
    const managerEvents = allEvents.filter(event => event.managerUsername === username);

    setEvents(managerEvents);
    setLoading(false);
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      capacity: event.capacity,
      imageUrl: event.imageUrl
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrorMessage('');
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      const updatedEvents = events.filter(event => event.eventId !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem('managerEvents', JSON.stringify(updatedEvents));
      setSuccessMessage('Event deleted successfully.');
      setSelectedEvent(null);
      setFormData({
        eventName: '',
        eventDescription: '',
        capacity: '',
        imageUrl: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.eventName.trim()) {
      setErrorMessage('Event name is required');
      return;
    }
    if (!formData.eventDescription.trim()) {
      setErrorMessage('Event description is required');
      return;
    }
    if (!formData.capacity || formData.capacity <= 0) {
      setErrorMessage('Capacity must be a positive number');
      return;
    }
    if (!formData.imageUrl.trim()) {
      setErrorMessage('Image URL is required');
      return;
    }

    // Update event
    const updatedEvents = events.map(event =>
      event.eventId === selectedEvent.eventId
        ? {
            ...event,
            eventName: formData.eventName,
            eventDescription: formData.eventDescription,
            capacity: formData.capacity,
            imageUrl: formData.imageUrl,
            updatedAt: new Date().toLocaleString()
          }
        : event
    );

    setEvents(updatedEvents);
    localStorage.setItem('managerEvents', JSON.stringify(updatedEvents));
    setSuccessMessage(`Event "${formData.eventName}" has been updated successfully.`);
    setSelectedEvent(null);
    setFormData({
      eventName: '',
      eventDescription: '',
      capacity: '',
      imageUrl: ''
    });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return <div style={{ padding: '20px' }}><h2>Loading events...</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Event</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>Manager: <strong>{managerUsername}</strong></p>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Events List */}
        <div>
          <h3>Your Events</h3>
          {events.length === 0 ? (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              textAlign: 'center',
              color: '#666'
            }}>
              <p>No events to update.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {events.map(event => (
                <div
                  key={event.eventId}
                  onClick={() => handleSelectEvent(event)}
                  style={{
                    padding: '12px',
                    border: selectedEvent?.eventId === event.eventId ? '2px solid #007bff' : '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: selectedEvent?.eventId === event.eventId ? '#e7f3ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedEvent?.eventId !== event.eventId) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedEvent?.eventId !== event.eventId) {
                      e.currentTarget.style.backgroundColor = '#fff';
                    }
                  }}
                >
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{event.eventName}</h4>
                  <p style={{ margin: '3px 0', fontSize: '12px', color: '#666' }}>
                    ID: {event.eventId}
                  </p>
                  <p style={{ margin: '3px 0', fontSize: '12px', color: '#666' }}>
                    Capacity: {event.capacity}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Form */}
        <div>
          {selectedEvent ? (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}>
              <h3>Edit Event</h3>
              <form onSubmit={handleUpdateEvent}>
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="eventName"><strong>Event Name *</strong></label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    required
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
                    value={formData.eventDescription}
                    onChange={handleInputChange}
                    required
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
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
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
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Update Event
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(selectedEvent.eventId)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Delete Event
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '40px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              textAlign: 'center',
              color: '#666'
            }}>
              <p>Select an event from the list to edit or delete it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
