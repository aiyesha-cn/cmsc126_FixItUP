import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import RequestSubmissionForm from './RequestSubmissionForm'; // Import the new page component

const MyRequestsPage = ({ userRequests }) => {
    return (
        <div className="content">
            <div className="content-header-placeholder"></div>
            
            {/* Grid container for cards */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px 40px' }}>
                
                {/* Check if data is available, otherwise show a friendly empty state */}
                {userRequests && userRequests.length > 0 ? (
                    userRequests.map(req => (
                        <div key={req.maintenance_request_id} style={{ 
                            width: '280px', 
                            backgroundColor: '#ffffff', 
                            borderRadius: '15px', 
                            padding: '20px', 
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            display: 'flex', 
                            flexDirection: 'column' 
                        }}>
                            {/* Image Placeholder (IMG) */}
                            <div style={{ width: '100%', height: '140px', backgroundColor: '#e9ecef', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px', color: '#adb5bd', fontSize: '24px', fontWeight: 'bold' }}>
                                IMG
                            </div>
                            
                            {/* Card Details from Database */}
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>
                                {req.issue_category}
                            </h3>
                            <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#6c757d' }}>
                                <strong>Location:</strong> {req.location_display}
                            </p>
                            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6c757d' }}>
                                <strong>Status:</strong> <span style={{ color: '#f59f00', fontWeight: '500' }}>{req.status}</span>
                            </p>
                            <p style={{ margin: '0', fontSize: '14px', color: '#495057', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {req.issue_description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div style={{ width: '100%', textAlign: 'center', color: '#6c757d', marginTop: '40px' }}>
                        <h3>No requests found</h3>
                        <p>Submit a new maintenance request to see it appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
// Defines Dashboard
const DashboardPage = ({ activeTab, userRequests, truncateString }) => {
    return (
        <div className="content">
            <div className="content-header-placeholder"></div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px 40px' }}>
                
                {userRequests && userRequests.length > 0 ? (
                    userRequests.map(req => (
                        <div key={req.maintenance_request_id} style={{ 
                            width: '280px', 
                            backgroundColor: '#3a2c2c', 
                            borderRadius: '15px', 
                            padding: '20px', 
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            display: 'flex', 
                            flexDirection: 'column' 
                        }}>
                            {/* Image Placeholder (IMG) */}
                            <div style={{ width: '100%', height: '140px', backgroundColor: '#e9ecef', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px', color: '#adb5bd', fontSize: '24px', fontWeight: 'bold' }}>
                                IMG
                            </div>
                            
                            {/* Card Details from Database */}
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>
                                {req.issue_category}
                            </h3>
                            <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#6c757d' }}>
                                <strong>ID:</strong> {req.maintenance_request_id}
                            </p>
                            <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#6c757d' }}>
                                <strong>Location:</strong> {req.location_display}
                            </p>
                            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6c757d' }}>
                                <strong>Status:</strong> <span style={{ color: '#f59f00', fontWeight: '500' }}>{req.status}</span>
                            </p>
                            
                            {/* Description truncated so the cards stay the same height */}
                            <p style={{ margin: '0', fontSize: '14px', color: '#495057', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {req.issue_description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div style={{ width: '100%', textAlign: 'center', color: '#6c757d', marginTop: '40px' }}>
                        <h3>No requests found</h3>
                        <p>Submit a new maintenance request to see it appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRequests, setUserRequests] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation(); // Hook to detect the current route
  const navigate = useNavigate(); // Hook to change routes functionally

useEffect(() => {
    fetch('http://localhost:5000/api/requests')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                setUserRequests([]);
                return;
            }
            const processedData = data.map(req => ({
                ...req,
                status: 'Pending',
                location_display: req.location_name ? `${req.location_name} (Rm ${req.room_details})` : `Loc ID: ${req.location_id}`
            }));
            setUserRequests(processedData);
        })
        .catch(error => console.error('Error fetching requests:', error));
  }, []); // Runs once on load

  useEffect(() => {
    // Fetch data directly from backend
    if (activeTab === 'dashboard') {
        fetch('http://localhost:5000/api/requests')
            .then(response => response.json())
            .then(data => {
                // If data is not an array, default to empty to prevent errors
                if (!Array.isArray(data)) {
                    setUserRequests([]);
                    return;
                }
                const processedData = data.map(req => ({
                    ...req,
                    status: 'Pending', 
                    // Checks for the real name, and falls back to the ID if the name is missing
                    location_display: req.location_name 
                        ? `${req.location_name} (Room ${req.room_details})` 
                        : `Loc ID: ${req.location_id}` 
                }));
                setUserRequests(processedData);
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
                setUserRequests([]); // Set to empty to prevent mapping errors on fetch failure
            });
    }
  }, [activeTab]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleTabClick = (tab) => {
    if (tab === 'dashboard' && location.pathname !== '/') {
        navigate('/'); 
    }
    setActiveTab(tab);
  };

  const truncateString = (str, num) => {
      if (!str) return '';
      if (str.length <= num) { return str }
      return str.slice(0, num) + '...'
  }

  return (
    <div className="main-container">
        <header className="top-nav">
            <Link to="/" className="logo" onClick={() => handleTabClick('dashboard')}>FixItUP</Link>
            <div className="user-profile" onClick={toggleDropdown}>
                <span>User</span>
                <div className="user-icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
            </div>
            {dropdownVisible && (
                <div className="profile-dropdown">
                    <ul>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Profile
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                            Settings
                        </li>
                        <li className="logout">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </header>

        <div className="sub-nav">
            <Link
                to="/"
                className={`sub-nav-tab ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => handleTabClick('dashboard')}
            >
                Dashboard
            </Link>
        
            <Link
                to="/my-requests"
                className={`sub-nav-tab ${location.pathname === '/my-requests' ? 'active' : ''}`}
                onClick={() => handleTabClick('myRequests')}
            >
                Requests
            </Link>
        </div>

        <Routes>
            {/* Dashboard View Route */}
            <Route
                path="/"
                element={
                    <DashboardPage
                        activeTab={activeTab}
                        userRequests={userRequests}
                        truncateString={truncateString}
                    />
                }
            />
            
            {/* Submission Form View Route - Displays RequestSubmissionForm */}
            <Route 
                path="/submit-request" 
                element={<RequestSubmissionForm />} 
            />
            
            {/* My Requests View Route - Displays the grid component */}
            <Route 
                path="/my-requests" 
                element={<MyRequestsPage userRequests={userRequests} />} 
            />
        </Routes>
        
        {/* Footer Action - Button functional link */}
        <footer className="footer-action">
            {/* Link component functionally changes the URL to '/submit-request' */}
            <Link to="/submit-request" className="submit-button" onClick={() => handleTabClick('')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-tool"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.79-2.79l-3.77 3.77z"></path><path d="M17.2 9.7l-4.1-4.1a1 1 0 0 0-1.4 0l-1.6 1.6a1 1 0 0 0 0 1.4l4.1 4.1a1 1 0 0 0 1.4 0l1.6-1.6a1 1 0 0 0 0-1.4z"></path><path d="M14.7 17.7a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.79-2.79l-3.77 3.77z"></path><path d="M17.2 21.1l-4.1-4.1a1 1 0 0 0-1.4 0l-1.6 1.6a1 1 0 0 0 0 1.4l4.1 4.1a1 1 0 0 0 1.4 0l1.6-1.6a1 1 0 0 0 0-1.4z"></path><path d="M7.3 14.7a1 1 0 0 0-1.4 0L2.13 18.47a2 2 0 0 0 2.79 2.79l3.77-3.77a1 1 0 0 0 0-1.4l-1.6-1.6z"></path><path d="M7.3 9.7a1 1 0 0 0-1.4 0L2.13 13.47a2 2 0 0 0 2.79 2.79l3.77-3.77a1 1 0 0 0 0-1.4l-1.6-1.6z"></path></svg>
                Submit Maintenance Request
            </Link>
        </footer>
    </div>
  );
};

// Main App wrapper component adding the BrowserRouter
const App = () => (
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
);

export default App;