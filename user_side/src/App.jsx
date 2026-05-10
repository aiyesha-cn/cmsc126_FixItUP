import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your components
import RequestSubmissionForm from './RequestSubmissionForm';
import DashboardPage from './DashboardPage';
import MyRequestPage from './MyRequestPage';
import DiscoverPage from './DiscoverPage';
const AppContent = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <BrowserRouter>
      <div className="main-container">
        {/* Navigation Bar */}
        <nav className="top-nav">
          <div className="logo">FixItUP</div>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/my-requests">Requests</Link>
          </div>

          {/*Profile Section*/}
          <div className="profile-wrapper" onClick={() => setDropdownVisible(!dropdownVisible)}>
            <div className="profile-trigger">
              User <span className="user-icon">👤</span>
            </div>
            {dropdownVisible && (
              <div className="profile-dropdown">
                <div className="dropdown-item">👤 Profile</div>
                <div className="dropdown-item">⚙️ Settings</div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item logout">🚪 Logout</div>
              </div>
            )}
          </div>
        </nav>

        {/*Main Page Area*/}
        <div className="page-body">
          <Routes>
            <Route path="/" element={<DashboardPage userRequests={userRequests} />} />
            <Route path="/submit-request" element={<RequestSubmissionForm />} />
            <Route path="/my-requests" element={<MyRequestPage userRequests={userRequests} />} />
            <Route path='/discover' element={<DiscoverPage userRequests={userRequests} />} />
          </Routes>
        </div>

        {/*Action Button*/}
        <Link to="/submit-request" className="floating-submit-btn">
          <span className="wrench-icon">🔧</span> Submit Maintenance Request
        </Link>
      </div>
    </BrowserRouter>
  );
};

export default AppContent;