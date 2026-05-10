import React, { useState } from 'react';
import DashboardHeader from '@/Components/DashboardHeader';

const Discover = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');

    /*Dummy Data*/
    const discoverRequests = [
        { 
            id: "REQ-101", 
            user: "Sarah J.", 
            title: "Community Garden Fence Broken", 
            category: "Facility",
            description: "The north gate of the community garden is hanging by a single hinge. Needs repair before stray animals get in.",
            imageColor: "#f59e0b" 
        },
        { 
            id: "REQ-102", 
            user: "Mike R.", 
            title: "Pool Area Lights Flickering", 
            category: "Facility",
            description: "Three of the overhead LEDs near the shallow end are strobing. Very distracting for evening swimmers.",
            imageColor: "#3b82f6" 
        },
        { 
            id: "REQ-103", 
            user: "Apartment 3C", 
            title: "Main Lobby AC Leaking", 
            category: "Appliance",
            description: "There is a significant puddle forming under the vent in the main entrance lobby. Slip hazard!",
            imageColor: "#ef4444" 
        },
        { 
            id: "REQ-104", 
            user: "Emma W.", 
            title: "Buzzer System Unresponsive", 
            category: "Appliance",
            description: "The main gate buzzer doesn't ring through to my phone anymore. Might be a system-wide software glitch.",
            imageColor: "#10b981" 
        },
        { 
            id: "REQ-105", 
            user: "Kevin D.", 
            title: "Gym Mirror Cracked", 
            category: "Other",
            description: "Large crack in the mirror behind the squat rack. Needs safety tape or replacement.",
            imageColor: "#6366f1" 
        }
    ];

    const filteredRequests = discoverRequests.filter(req => {
        const categoryMatch = categoryFilter === 'All Categories' || req.category === categoryFilter;
        const searchMatch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            req.description.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <>
        <DashboardHeader />
        <div className="discover-container">
            <header className="discover-header">
                <h2>Community Discover</h2>
                <p>See what's being fixed around the university.</p>

                {/*Filter & Search*/}
                <div className="action-bar" style={{ justifyContent: 'center', marginTop: '30px' }}>
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
                                placeholder="Search requests..." 
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="search-btn">Go</button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="discover-grid">
                {filteredRequests.map((req) => (
                    <div key={req.id} className="discover-card">
                        <div 
                            className="card-banner" 
                            style={{ backgroundColor: req.imageColor }} 
                        />
                        <div className="card-content">
                            <div className="card-meta">
                                <span className="request-id">{req.id}</span>
                                <span className="category-tag-small">{req.category}</span>
                            </div>

                            <h3 className="card-title">{req.title}</h3>
                            <p className="card-description">{req.description}</p>

                            <div className="card-footer">
                                <span className="user-tag">👤 {req.user}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Discover;