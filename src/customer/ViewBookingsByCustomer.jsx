import React, { useState, useEffect } from 'react';

export default function ViewBookingsByCustomer() {
  const [bookings, setBookings] = useState([]);
  const [customerUsername, setCustomerUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    // Get customer username from sessionStorage
    const username = sessionStorage.getItem('customerUsername');
    setCustomerUsername(username);

    // Get all bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('customerBookings')) || [];

    // Filter bookings for current customer
    const customerBookings = allBookings.filter(booking => booking.customerUsername === username);

    setBookings(customerBookings);
    setLoading(false);
  }, []);

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm(`Are you sure you want to cancel booking ID ${bookingId}? This action cannot be undone.`)) {
      const allBookings = JSON.parse(localStorage.getItem('customerBookings')) || [];
      const updatedBookings = allBookings.filter(booking => booking.bookingId !== bookingId);

      localStorage.setItem('customerBookings', JSON.stringify(updatedBookings));

      const customerBookings = updatedBookings.filter(booking => booking.customerUsername === customerUsername);
      setBookings(customerBookings);

      setDeleteMessage(`Booking #${bookingId} has been cancelled successfully.`);
      setTimeout(() => setDeleteMessage(''), 3000);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}><h2>Loading bookings...</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Bookings</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>Customer: <strong>{customerUsername}</strong></p>

      {deleteMessage && (
        <div style={{
          color: '#28a745',
          marginBottom: '15px',
          padding: '12px',
          backgroundColor: '#d4edda',
          borderRadius: '4px',
          border: '1px solid #c3e6cb'
        }}>
          {deleteMessage}
        </div>
      )}

      {bookings.length === 0 ? (
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '40px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center',
          color: '#666'
        }}>
          <h3>No bookings yet</h3>
          <p>You haven't booked any events yet. <a href="/customer/view-events" style={{ color: '#007bff' }}>Browse events</a> to make your first booking!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
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
                height: '200px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {booking.imageUrl ? (
                  <img
                    src={booking.imageUrl}
                    alt={booking.eventName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="width: 100%; height: 100%; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; color: #999;"><div><div style="font-size: 40px; margin-bottom: 10px;">🎪</div><p style="margin: 0; font-size: 12px;">Event Image</p></div></div>';
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎪</div>
                      <p style={{ margin: 0, fontSize: '12px' }}>Event Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Details */}
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>
                  {booking.eventName}
                </h3>

                <div style={{
                  backgroundColor: '#f9f9f9',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  fontSize: '13px'
                }}>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Start Date:</strong> {booking.startDate}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>End Date:</strong> {booking.endDate}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Event Manager:</strong> {booking.managerUsername}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #eee',
                  paddingTop: '10px',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    backgroundColor: booking.status === 'registered' ? '#fff3cd' : 
                                    booking.status === 'accepted' ? '#d4edda' : 
                                    booking.status === 'rejected' ? '#f8d7da' : '#e2e3e5',
                    color: booking.status === 'registered' ? '#856404' : 
                           booking.status === 'accepted' ? '#155724' : 
                           booking.status === 'rejected' ? '#721c24' : '#383d41',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {booking.status === 'registered' ? 'REGISTERED' :
                     booking.status === 'accepted' ? 'ACCEPTED' :
                     booking.status === 'rejected' ? 'REJECTED' :
                     booking.status.toUpperCase()}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: '#999'
                  }}>
                    Booked: {booking.bookedAt}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteBooking(booking.bookingId)}
                  style={{
                    width: '100%',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookings Summary */}
      {bookings.length > 0 && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Booking Summary</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '12px' }}>Total Bookings</p>
              <h4 style={{ margin: 0, fontSize: '24px', color: '#007bff' }}>{bookings.length}</h4>
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '12px' }}>Confirmed Bookings</p>
              <h4 style={{ margin: 0, fontSize: '24px', color: '#28a745' }}>
                {bookings.filter(b => b.status === 'confirmed').length}
              </h4>
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '12px' }}>Upcoming Events</p>
              <h4 style={{ margin: 0, fontSize: '24px', color: '#ffc107' }}>
                {bookings.filter(b => new Date(b.endDate) >= new Date()).length}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
