import React, { useState, useEffect } from 'react';

export default function ViewEventsByManager() {
  const [events, setEvents] = useState([]);
  const [managerUsername, setManagerUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    // Get manager username from sessionStorage
    const username = sessionStorage.getItem('managerUsername');
    setManagerUsername(username);

    // Get all events from localStorage
    const allEvents = JSON.parse(localStorage.getItem('managerEvents')) || [];

    // Debug: Log all events and filtered events
    console.log('Manager Username:', username);
    console.log('All Events in localStorage:', allEvents);
    console.log('Events with managerUsername field:', allEvents.map(e => ({
      eventId: e.eventId,
      eventName: e.eventName,
      managerUsername: e.managerUsername
    })));

    // Filter events by current manager username
    const managerEvents = allEvents.filter(event => event.managerUsername === username);

    console.log('Filtered Manager Events:', managerEvents);
    setEvents(managerEvents);
    setLoading(false);
  }, []);

  const handleImageError = (eventId) => {
    setFailedImages(prev => new Set(prev).add(eventId));
  };

  if (loading) {
    return <div style={{ padding: '20px' }}><h2>Loading events...</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Events</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>Showing events for: <strong>{managerUsername}</strong></p>

      {events.length === 0 ? (
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center',
          color: '#666'
        }}>
          <p>No events created yet. <a href="/manager/add-event" style={{ color: '#007bff' }}>Create your first event</a></p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {events.map((event) => (
            <div
              key={event.eventId}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{
                width: '100%',
                height: '220px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {failedImages.has(event.eventId) ? (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#999'
                  }}>
                    <div style={{ fontSize: '50px', marginBottom: '10px' }}>🎉</div>
                    <p style={{ margin: 0, fontSize: '12px' }}>Image not available</p>
                  </div>
                ) : (
                  <img
                    src={event.imageUrl}
                    alt={event.eventName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={() => handleImageError(event.eventId)}
                    loading="lazy"
                  />
                )}
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{event.eventName}</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                  {event.eventDescription}
                </p>
                <div style={{
                  borderTop: '1px solid #ddd',
                  paddingTop: '10px',
                  fontSize: '14px'
                }}>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Event ID:</strong> {event.eventId}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Capacity:</strong> {event.capacity} people
                  </p>
                  <p style={{ margin: '5px 0', color: '#999' }}>
                    <strong>Created:</strong> {event.createdAt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
