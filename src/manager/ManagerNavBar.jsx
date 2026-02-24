import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './manager.css';
import ManagerHome from './ManagerHome';
import AddEvent from './AddEvent';
import ViewEventsByManager from './ViewEventsByManager';
import UpdateEvent from './UpdateEvent';
import ViewBookings from './ViewBookings';
import ManagerLogout from './ManagerLogout';

export default function ManagerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isManager');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="manager-container">
      <nav className="manager-navbar">
        <div className="navbar-header">
          <h1>Manager Dashboard</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/manager/home" className="nav-link">Home</Link></li>
          <li><Link to="/manager/add-event" className="nav-link">Add Event</Link></li>
          <li><Link to="/manager/view-events" className="nav-link">View My Events</Link></li>
          <li><Link to="/manager/update-event" className="nav-link">Update Event</Link></li>
          <li><Link to="/manager/view-bookings" className="nav-link">View Bookings</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      <div className="manager-content">
        <Routes>
          <Route path="/manager/home" element={<ManagerHome />} />
          <Route path="/manager/view-events" element={<ViewEventsByManager />} />
          <Route path="/manager/add-event" element={<AddEvent />} />
          <Route path="/manager/update-event" element={<UpdateEvent />} />
          <Route path="/manager/view-bookings" element={<ViewBookings />} />
          <Route path="/manager/logout" element={<ManagerLogout />} />
        </Routes>
      </div>
    </div>
  );
}
