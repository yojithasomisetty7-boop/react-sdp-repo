import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './customer.css';
import CustomerHome from './CustomerHome';
import ViewEvents from './ViewEvents';
import BookEvent from './BookEvent';
import ViewBookingsByCustomer from './ViewBookingsByCustomer';
import CustomerLogout from './CustomerLogout';

export default function CustomerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isCustomer');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="customer-container">
      <nav className="customer-navbar">
        <div className="navbar-header">
          <h1>Customer Dashboard</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/customer/home" className="nav-link">Home</Link></li>
          <li><Link to="/customer/view-events" className="nav-link">View Events</Link></li>
          <li><Link to="/customer/book-event" className="nav-link">Book Event</Link></li>
          <li><Link to="/customer/view-bookings" className="nav-link">My Bookings</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      <div className="customer-content">
        <Routes>
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/view-events" element={<ViewEvents />} />
          <Route path="/customer/book-event" element={<BookEvent />} />
          <Route path="/customer/view-bookings" element={<ViewBookingsByCustomer />} />
          <Route path="/customer/logout" element={<CustomerLogout />} />
        </Routes>
      </div>
    </div>
  );
}
