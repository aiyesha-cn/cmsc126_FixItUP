import React, { useState } from 'react';

const DashboardPage = ({ userRequests }) => {

    const [statusFilter, setStatusFilter] = useState('All'); 
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    
    /*Dummy Data*/
    const dummyRequests = [
        { 
            maintenance_request_id: "REQ-001", 
            issue_name: "Leaking Faucet", 
            issue_category: "Facility", 
            location_display: "Main Lobby Entrance", 
            status: "Pending" 
        },
        { 
            maintenance_request_id: "REQ-002", 
            issue_name: "Broken Microwave", 
            issue_category: "Appliance", 
            location_display: "Kitchen - Unit 4B", 
            status: "In Progress" 
        },
        { 
            maintenance_request_id: "REQ-003", 
            issue_name: "AC Filter Replacement", 
            issue_category: "Equipment", 
            location_display: "Gymnasium Storage", 
            status: "Resolved" 
        }
    ];

    const baseData = (userRequests && userRequests.length > 0) ? userRequests : dummyRequests;

    const filteredRequests = baseData.filter(req => {
        const statusMatch = statusFilter === 'All' || req.status === statusFilter;
        const categoryMatch = categoryFilter === 'All Categories' || req.issue_category === categoryFilter;
        return statusMatch && categoryMatch;
    });

    return (
        <div className="dashboard-container">
            {/*Hero Section*/}
            <div className="hero-placeholder">Hero Image Placeholder (1600 x 300)</div>

            <div className="dashboard-layout">
                <main className="dashboard-main">
                    <header className="content-header">
                        <h2>Maintenance Overview</h2>
                        
                        <div className="action-bar">
                            
                            {/*Status Filter Buttons*/}
                            <div className="filter-group">
                                <button 
                                    className={`filter-btn ${statusFilter === 'All' ? 'active' : ''}`}
                                    onClick={() => setStatusFilter('All')}
                                >
                                    All Requests
                                </button>
                                <button 
                                    className={`filter-btn ${statusFilter === 'Pending' ? 'active' : ''}`}
                                    onClick={() => setStatusFilter('Pending')}
                                >
                                    Pending
                                </button>
                                <button 
                                    className={`filter-btn ${statusFilter === 'Resolved' ? 'active' : ''}`}
                                    onClick={() => setStatusFilter('Resolved')}
                                >
                                    Resolved
                                </button>
                                <button 
                                    className={`filter-btn ${statusFilter === 'In Progress' ? 'active' : ''}`}
                                    onClick={() => setStatusFilter('In Progress')}
                                >
                                    In-Progress
                                </button>
                            </div>

                            {/*Filter & Search*/}
                            <div className="search-container">
                                <select 
                                    className="category-select"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <option value="All Categories">All Categories</option>
                                    <option value="Facility">Facility</option>
                                    <option value="Appliance">Appliance</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Flooring">Flooring</option>
                                    <option value="Other">Other</option>
                                </select>
                                
                                <div className="search-box-wrapper">
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="search-input" 
                                    />
                                    <button className="search-btn">Go</button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* REQUEST GRID */}
                    <div className="request-grid">
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map(req => (
                                <div key={req.maintenance_request_id} className="request-card">
                                    <div className="card-banner yellow-theme">
                                        <span className="category-tag">{req.issue_category}</span>
                                    </div>
                                    <div className="card-content">
                                        <p className="issue-name">{req.issue_name}</p>
                                        <h4 className="location-title">{req.location_display}</h4>
                                        <span className={`status-pill ${req.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#64748b', marginTop: '40px' }}>
                                No maintenance requests found matching your filters.
                            </p>
                        )}
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                    <div className="sidebar-widget">
                        <h3>My Recent Requests</h3>
                        <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
                            Recent activity will appear here.
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardPage;