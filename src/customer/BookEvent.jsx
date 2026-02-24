import React, { useState, useEffect } from 'react';

export default function BookEvent() {
  const [events, setEvents] = useState([]);
  const [customerUsername, setCustomerUsername] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: ''
  });
  const [bookings, setBookings] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Get customer username from sessionStorage
    const username = sessionStorage.getItem('customerUsername');
    setCustomerUsername(username);

    // Get all events from localStorage
    const allEvents = JSON.parse(localStorage.getItem('managerEvents')) || [];
    setEvents(allEvents);

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem('customerBookings')) || [];
    setBookings(existingBookings);

    setLoading(false);
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setBookingData({
      startDate: '',
      endDate: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
    setErrorMessage('');
  };

  const validateBooking = () => {
    if (!bookingData.startDate) {
      setErrorMessage('Start date is required');
      return false;
    }
    if (!bookingData.endDate) {
      setErrorMessage('End date is required');
      return false;
    }

    const startDate = new Date(bookingData.startDate);
    const endDate = new Date(bookingData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      setErrorMessage('Start date cannot be in the past');
      return false;
    }
    if (endDate < startDate) {
      setErrorMessage('End date must be same or after start date');
      return false;
    }

    return true;
  };

  const handleBookEvent = (e) => {
    e.preventDefault();

    if (!validateBooking()) {
      return;
    }

    // Generate booking ID
    const bookingId = Math.floor(Math.random() * 900000) + 100000;

    // Create booking object
    const newBooking = {
      bookingId: bookingId,
      eventId: selectedEvent.eventId,
      eventName: selectedEvent.eventName,
      managerUsername: selectedEvent.managerUsername,
      customerUsername: customerUsername,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      capacity: selectedEvent.capacity,
      imageUrl: selectedEvent.imageUrl,
      eventDescription: selectedEvent.eventDescription,
      bookedAt: new Date().toLocaleString(),
      status: 'registered'
    };

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem('customerBookings')) || [];

    // Add new booking
    existingBookings.push(newBooking);

    // Save to localStorage
    localStorage.setItem('customerBookings', JSON.stringify(existingBookings));
    setBookings(existingBookings);

    console.log('Event booked:', newBooking);
    setSuccessMessage(`Successfully booked "${selectedEvent.eventName}" from ${bookingData.startDate} to ${bookingData.endDate}. Booking ID: ${bookingId}`);

    // Reset form
    setSelectedEvent(null);
    setBookingData({
      startDate: '',
      endDate: ''
    });

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  if (loading) {
    return <div style={{ padding: '20px' }}><h2>Loading...</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Event</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>Customer: <strong>{customerUsername}</strong></p>

      {successMessage && (
        <div style={{
          color: '#28a745',
          marginBottom: '15px',
          padding: '12px',
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
          padding: '12px',
          backgroundColor: '#f8d7da',
          borderRadius: '4px',
          border: '1px solid #f5c6cb'
        }}>
          {errorMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Events List */}
        <div>
          <h3>Available Events</h3>
          {events.length === 0 ? (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              textAlign: 'center',
              color: '#666'
            }}>
              <p>No events available at the moment.</p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '600px',
              overflowY: 'auto'
            }}>
              {events.map(event => (
                <div
                  key={event.eventId}
                  onClick={() => handleSelectEvent(event)}
                  style={{
                    padding: '15px',
                    border: selectedEvent?.eventId === event.eventId ? '2px solid #28a745' : '1px solid #ddd',
                    borderRadius: '6px',
                    backgroundColor: selectedEvent?.eventId === event.eventId ? '#e8f5e9' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedEvent?.eventId !== event.eventId) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                      e.currentTarget.style.borderColor = '#28a745';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedEvent?.eventId !== event.eventId) {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.borderColor = '#ddd';
                    }
                  }}
                >
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#333' }}>
                    {event.eventName}
                  </h4>
                  <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>
                    {event.eventDescription.substring(0, 60)}...
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '12px', color: '#28a745' }}>
                    <strong>Capacity:</strong> {event.capacity}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '11px', color: '#999' }}>
                    ID: {event.eventId}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div>
          {selectedEvent ? (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}>
              <h3>Book Event</h3>
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #ddd' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{selectedEvent.eventName}</h4>
                <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>
                  {selectedEvent.eventDescription}
                </p>
                <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>
                  <strong>Capacity:</strong> {selectedEvent.capacity} people
                </p>
              </div>

              <form onSubmit={handleBookEvent}>
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="startDate"><strong>Start Date *</strong></label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={bookingData.startDate}
                    onChange={handleDateChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
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
                  <label htmlFor="endDate"><strong>End Date *</strong></label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={bookingData.endDate}
                    onChange={handleDateChange}
                    required
                    min={bookingData.startDate || new Date().toISOString().split('T')[0]}
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

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                  Confirm Booking
                </button>
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
              <p>Select an event to book</p>
            </div>
          )}
        </div>
      </div>

      {/* Bookings Summary */}
      {bookings.filter(b => b.customerUsername === customerUsername).length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Your Bookings ({bookings.filter(b => b.customerUsername === customerUsername).length})</h3>
          <div style={{
            overflowX: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              marginTop: '10px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Booking ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Event Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Start Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>End Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Booked At</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter(b => b.customerUsername === customerUsername)
                  .map((booking, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px', fontSize: '12px' }}>{booking.bookingId}</td>
                      <td style={{ padding: '12px', fontSize: '12px' }}>{booking.eventName}</td>
                      <td style={{ padding: '12px', fontSize: '12px' }}>{booking.startDate}</td>
                      <td style={{ padding: '12px', fontSize: '12px' }}>{booking.endDate}</td>
                      <td style={{ padding: '12px', fontSize: '12px' }}>
                        <span style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          padding: '4px 8px',
                          borderRadius: '3px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          {booking.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '12px', color: '#999' }}>{booking.bookedAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
