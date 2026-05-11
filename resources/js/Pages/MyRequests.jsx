import React, { useState } from 'react';
import DashboardHeader from '@/Components/DashboardHeader';

const MyRequests = () => {

    /*Dummy Data*/
    const myDummyRequests = [
        { 
            maintenance_request_id: "REQ-7721", 
            issue_name: "Stove Burner Not Igniting", 
            issue_category: "Appliance", 
            location_display: "Kitchen - Unit 4B", 
            issue_description: "The front-left burner clicks repeatedly but no flame appears.",
            status: "Pending",
            isEditing: false 
        },
        { 
            maintenance_request_id: "REQ-8832", 
            issue_name: "Loose Hallway Tiles", 
            issue_category: "Flooring", 
            location_display: "Main Entrance Hall", 
            issue_description: "Three tiles are loose and clicking when stepped on.",
            status: "In Progress",
            isEditing: false 
        }
    ];

    const [requests, setRequests] = useState(myDummyRequests);

    const toggleEdit = (id) => {
        setRequests(requests.map(req => 
            req.maintenance_request_id === id ? { ...req, isEditing: !req.isEditing } : req
        ));
    };

    const handleChange = (id, field, value) => {
        setRequests(requests.map(req => 
            req.maintenance_request_id === id ? { ...req, [field]: value } : req
        ));
    };

    const deleteRequest = (id) => {
        if(window.confirm("Are you sure you want to remove this request?")) {
            setRequests(requests.filter(req => req.maintenance_request_id !== id));
        }
    };

    return (
        <>
        <DashboardHeader />
        <div className="dashboard-container" style={{ paddingBottom: '100px' }}>
            <div className="dashboard-layout" style={{ gridTemplateColumns: '1fr' }}> 
                <main className="dashboard-main">
                    <header className="content-header">
                        <h2>Manage My Requests</h2>
                    </header>

                    {/*Table Header*/}
                    <div className="requests-table-header">
                        <div>ID & Category</div>
                        <div>Issue Name</div>
                        <div>Location & Description</div>
                        <div style={{ textAlign: 'center' }}>Actions</div>
                    </div>

                    {/*Table Body*/}
                    <div className="requests-table-body">
                        {requests.length > 0 ? (
                            requests.map(req => (
                                <div key={req.maintenance_request_id} className="request-row">
                                    
                                    {/*C1: ID & Category*/}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <span className="snippet-id">{req.maintenance_request_id}</span>
                                        {req.isEditing ? (
                                            <select 
                                                className="category-select"
                                                value={req.issue_category}
                                                onChange={(e) => handleChange(req.maintenance_request_id, 'issue_category', e.target.value)}
                                            >
                                                <option value="Facility">Facility</option>
                                                <option value="Appliance">Appliance</option>
                                                <option value="Flooring">Flooring</option>
                                            </select>
                                        ) : (
                                            <span className="category-pill">{req.issue_category}</span>
                                        )}
                                    </div>

                                    {/*C2: Issue Name*/}
                                    <div style={{ paddingRight: '20px' }}>
                                        {req.isEditing ? (
                                            <input 
                                                className="edit-input"
                                                value={req.issue_name} 
                                                onChange={(e) => handleChange(req.maintenance_request_id, 'issue_name', e.target.value)}
                                            />
                                        ) : (
                                            <strong style={{ fontSize: '18px', color: '#1e293b' }}>{req.issue_name}</strong>
                                        )}
                                    </div>

                                    {/*C3: Location & Description*/}
                                    <div style={{ paddingRight: '30px' }}>
                                        <p style={{ fontSize: '15px', color: '#475569', fontWeight: '700', marginBottom: '4px' }}>
                                            {req.location_display}
                                        </p>
                                        {req.isEditing ? (
                                            <textarea 
                                                className="edit-textarea"
                                                value={req.issue_description}
                                                onChange={(e) => handleChange(req.maintenance_request_id, 'issue_description', e.target.value)}
                                            />
                                        ) : (
                                            <p className="card-description" style={{ marginBottom: 0 }}>{req.issue_description}</p>
                                        )}
                                    </div>

                                    {/*C4: Actions*/}
                                    <div className="action-group">
                                        <button 
                                            onClick={() => toggleEdit(req.maintenance_request_id)}
                                            className={`filter-btn ${req.isEditing ? 'btn-save' : ''}`}
                                        >
                                            {req.isEditing ? 'Save' : 'Edit'}
                                        </button>
                                        <button 
                                            onClick={() => deleteRequest(req.maintenance_request_id)}
                                            className="filter-btn btn-delete"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '80px', textAlign: 'center', color: '#94a3b8' }}>
                                <p>No maintenance requests found.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
        </>
    );
};

export default MyRequests;