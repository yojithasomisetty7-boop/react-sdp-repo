import React, { useState, useEffect } from 'react';

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [managerUsername, setManagerUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Get manager username from sessionStorage
    const username = sessionStorage.getItem('managerUsername');
    setManagerUsername(username);

    // Get all bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('customerBookings')) || [];

    // Debug: Log bookings and manager username
    console.log('Manager Username (ViewBookings):', username);
    console.log('All Bookings:', allBookings);
    console.log('Bookings with managerUsername:', allBookings.map(b => ({
      bookingId: b.bookingId,
      eventName: b.eventName,
      managerUsername: b.managerUsername
    })));

    // Filter bookings for current manager's events
    const managerBookings = allBookings.filter(booking => booking.managerUsername === username);

    console.log('Filtered Manager Bookings:', managerBookings);
    setBookings(managerBookings);
    setLoading(false);
  }, []);

  const handleUpdateStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.bookingId === bookingId
        ? { ...booking, status: newStatus, updatedAt: new Date().toLocaleString() }
        : booking
    );

    setBookings(updatedBookings);

    // Update all bookings in localStorage
    const allBookings = JSON.parse(localStorage.getItem('customerBookings')) || [];
    const updatedAllBookings = allBookings.map(booking =>
      booking.bookingId === bookingId
        ? { ...booking, status: newStatus, updatedAt: new Date().toLocaleString() }
        : booking
    );

    localStorage.setItem('customerBookings', JSON.stringify(updatedAllBookings));

    setStatusMessage(`Booking #${bookingId} status updated to ${newStatus.toUpperCase()}.`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'registered':
        return { bg: '#fff3cd', color: '#856404', text: 'Registered' };
      case 'confirmed':
        return { bg: '#fff3cd', color: '#856404', text: 'Confirmed' };
      case 'accepted':
        return { bg: '#d4edda', color: '#155724', text: 'Accepted' };
      case 'rejected':
        return { bg: '#f8d7da', color: '#721c24', text: 'Rejected' };
      default:
        return { bg: '#e2e3e5', color: '#383d41', text: status };
    }
  };

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  if (loading) {
    return <div style={{ padding: '20px' }}><h2>Loading bookings...</h2></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Event Bookings</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>Manager: <strong>{managerUsername}</strong></p>

      {statusMessage && (
        <div style={{
          color: '#28a745',
          marginBottom: '15px',
          padding: '12px',
          backgroundColor: '#d4edda',
          borderRadius: '4px',
          border: '1px solid #c3e6cb'
        }}>
          {statusMessage}
        </div>
      )}

      {/* Filter Section */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <label style={{ marginRight: '15px' }}><strong>Filter by Status:</strong></label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <option value="all">All Bookings</option>
          <option value="registered">Registered</option>
          <option value="confirmed">Confirmed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <span style={{ marginLeft: '15px', color: '#666' }}>
          Total: <strong>{filteredBookings.length}</strong>
        </span>
      </div>

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
          <p>No customers have booked your events yet.</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '40px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center',
          color: '#666'
        }}>
          <h3>No {filterStatus} bookings</h3>
          <p>No bookings with this status.</p>
        </div>
      ) : (
        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '4px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Booking ID</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Event Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Customer</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Start Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>End Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 'bold' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => {
                const statusColor = getStatusColor(booking.status);
                return (
                  <tr
                    key={index}
                    style={{ borderBottom: '1px solid #dee2e6', transition: 'background-color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    <td style={{ padding: '12px', fontSize: '12px' }}>{booking.bookingId}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{booking.eventName}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{booking.customerUsername}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{booking.startDate}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{booking.endDate}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        backgroundColor: statusColor.bg,
                        color: statusColor.color,
                        padding: '5px 10px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {statusColor.text}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {(booking.status === 'registered' || booking.status === 'confirmed') && (
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleUpdateStatus(booking.bookingId, 'accepted')}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: '#28a745',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(booking.bookingId, 'rejected')}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: '#dc3545',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {(booking.status === 'accepted') && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: '#999', marginBottom: '5px' }}>
                            {booking.updatedAt ? `Updated: ${booking.updatedAt}` : '-'}
                          </span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Revert booking #${booking.bookingId} back to Registered status?`)) {
                                handleUpdateStatus(booking.bookingId, 'registered');
                              }
                            }}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#6c757d',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                          >
                            Revert
                          </button>
                        </div>
                      )}
                      {(booking.status === 'rejected') && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: '#999', marginBottom: '5px' }}>
                            {booking.updatedAt ? `Updated: ${booking.updatedAt}` : '-'}
                          </span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Revert booking #${booking.bookingId} back to Registered status?`)) {
                                handleUpdateStatus(booking.bookingId, 'registered');
                              }
                            }}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#6c757d',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                          >
                            Revert
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Bookings Summary */}
      {bookings.length > 0 && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Booking Summary</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '12px' }}>Total Bookings</p>
              <h4 style={{ margin: 0, fontSize: '24px', color: '#333' }}>{bookings.length}</h4>
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '12px' }}>Pending</p>
              <h4 style={{ margin: 0, fontSize: '24px', color: '#856404' }}>
                {bookings.filter(b => b.status === 'registered' || b.status === 'confirmed').length}
              </h4>
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '12px' }}>Accepted</p>
              <h4 style={{ margin: 0, fontSize: '24px', color: '#28a745' }}>
                {bookings.filter(b => b.status === 'accepted').length}
              </h4>
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '12px' }}>Rejected</p>
              <h4 style={{ margin: 0, fontSize: '24px', color: '#dc3545' }}>
                {bookings.filter(b => b.status === 'rejected').length}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
