import React, { useState, useEffect } from 'react';

export default function ViewEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState(new Set());
  const [filters, setFilters] = useState({
    eventName: '',
    companyName: ''
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Load events from localStorage
    const events = JSON.parse(localStorage.getItem('managerEvents')) || [];
    setAllEvents(events);
    
    // Extract unique company names
    const uniqueCompanies = [...new Set(events.map(event => {
      // Get manager details to find company name
      const managers = JSON.parse(localStorage.getItem('managerRegistrations')) || [];
      const manager = managers.find(m => m.username === event.managerUsername);
      return manager ? manager.companyName : 'Unknown';
    }))].filter(Boolean);
    
    setCompanies(uniqueCompanies);
    setFilteredEvents(events);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = allEvents;

    if (filters.eventName.trim()) {
      filtered = filtered.filter(event =>
        event.eventName.toLowerCase().includes(filters.eventName.toLowerCase())
      );
    }

    if (filters.companyName) {
      filtered = filtered.filter(event => {
        const managers = JSON.parse(localStorage.getItem('managerRegistrations')) || [];
        const manager = managers.find(m => m.username === event.managerUsername);
        return manager && manager.companyName === filters.companyName;
      });
    }

    setFilteredEvents(filtered);
  }, [filters, allEvents]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleImageError = (eventId) => {
    setFailedImages(prev => new Set(prev).add(eventId));
  };

  const clearFilters = () => {
    setFilters({
      eventName: '',
      companyName: ''
    });
  };

  if (loading) {
    return <div style={{ padding: '20px' }}><h2>Loading events...</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Events</h2>

      {/* Filter Section */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h3>Filter Events</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          <div>
            <label htmlFor="eventName"><strong>Event Name</strong></label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={filters.eventName}
              onChange={handleFilterChange}
              placeholder="Search by event name..."
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

          <div>
            <label htmlFor="companyName"><strong>Company Name</strong></label>
            <select
              id="companyName"
              name="companyName"
              value={filters.companyName}
              onChange={handleFilterChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={clearFilters}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Events Count */}
      <p style={{ color: '#666', marginBottom: '20px' }}>
        <strong>Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}</strong>
      </p>

      {/* Events Display */}
      {filteredEvents.length === 0 ? (
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '40px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center',
          color: '#666'
        }}>
          <h3>No events found</h3>
          <p>Try adjusting your filters or check back later for more events.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {filteredEvents.map((event) => {
            const managers = JSON.parse(localStorage.getItem('managerRegistrations')) || [];
            const manager = managers.find(m => m.username === event.managerUsername);

            return (
              <div
                key={event.eventId}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                {/* Event Image */}
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
                      <p style={{ margin: 0, fontSize: '12px' }}>Event Image</p>
                    </div>
                  ) : (
                    <img
                      src={event.imageUrl}
                      alt={event.eventName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={() => handleImageError(event.eventId)}
                    />
                  )}
                </div>

                {/* Event Details */}
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>
                    {event.eventName}
                  </h3>
                  
                  {manager && (
                    <p style={{ margin: '5px 0', fontSize: '13px', color: '#007bff' }}>
                      <strong>Company:</strong> {manager.companyName}
                    </p>
                  )}

                  <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px', lineHeight: '1.5' }}>
                    {event.eventDescription.length > 100
                      ? `${event.eventDescription.substring(0, 100)}...`
                      : event.eventDescription}
                  </p>

                  <div style={{
                    borderTop: '1px solid #eee',
                    paddingTop: '10px',
                    fontSize: '13px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span>
                        <strong>Capacity:</strong> {event.capacity} people
                      </span>
                    </div>

                    <p style={{ margin: '5px 0', color: '#999', fontSize: '12px' }}>
                      <strong>Event ID:</strong> {event.eventId}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
