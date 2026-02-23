import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import ViewCustomers from './ViewCustomers';
import ViewManagers from './ViewManagers';
import AddManager from './AddManager';
import AdminLogout from "./AdminLogout";

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <div className="navbar-header">
          <h1>Admin Dashboard</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/admin/home" className="nav-link">Home</Link></li>
          <li><Link to="/admin/view-customers" className="nav-link">View Customers</Link></li>
          <li><Link to="/admin/view-managers" className="nav-link">View Managers</Link></li>
          <li><Link to="/admin/add-manager" className="nav-link">Add Manager</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      <div className="admin-content">
        <Routes>
          <Route path="/home" element={<AdminHome />} />
          <Route path="/view-customers" element={<ViewCustomers />} />
          <Route path="/view-managers" element={<ViewManagers />} />
          <Route path="/add-manager" element={<AddManager />} />
          <Route path="/logout" element={<AdminLogout />} />
          <Route path="/" element={<AdminHome />} />
        </Routes>
      </div>
    </div>
  );
}
