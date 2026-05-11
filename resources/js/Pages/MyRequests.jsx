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
        <div className="bg-gray-50 min-h-screen font-sans">
            <DashboardHeader />
            
            <div className="max-w-[1600px] mx-auto p-12 pb-24">
                <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <header className="p-8 border-b border-slate-100">
                        <h2 className="text-3xl font-bold text-slate-900">Manage My Requests</h2>
                    </header>

                    {/* Table Header - Using your specific grid definition */}
                    <div className="grid grid-cols-[1.2fr_1.5fr_2.5fr_1fr] px-10 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">
                        <div>ID & Category</div>
                        <div>Issue Name</div>
                        <div>Location & Description</div>
                        <div className="text-center">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="bg-white">
                        {requests.length > 0 ? (
                            requests.map(req => (
                                <div key={req.maintenance_request_id} 
                                    className="grid grid-cols-[1.2fr_1.5fr_2.5fr_1fr] px-10 py-6 border-b border-slate-100 items-center last:border-b-0 hover:bg-slate-50 transition-colors"
                                >
                                    
                                    {/* C1: ID & Category */}
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-mono font-bold text-slate-400">{req.maintenance_request_id}</span>
                                        {req.isEditing ? (
                                            <select 
                                                className="p-2 border border-slate-300 rounded-md text-sm bg-white"
                                                value={req.issue_category}
                                                onChange={(e) => handleChange(req.maintenance_request_id, 'issue_category', e.target.value)}
                                            >
                                                <option value="Facility">Facility</option>
                                                <option value="Appliance">Appliance</option>
                                                <option value="Flooring">Flooring</option>
                                            </select>
                                        ) : (
                                            <span className="bg-slate-200 px-3 py-1 rounded-full text-xs text-slate-600 font-semibold w-fit">
                                                {req.issue_category}
                                            </span>
                                        )}
                                    </div>

                                    {/* C2: Issue Name */}
                                    <div className="pr-5">
                                        {req.isEditing ? (
                                            <input 
                                                className="w-full p-2 border border-slate-300 rounded-md font-inherit text-sm"
                                                value={req.issue_name} 
                                                onChange={(e) => handleChange(req.maintenance_request_id, 'issue_name', e.target.value)}
                                            />
                                        ) : (
                                            <strong className="text-lg text-slate-800 leading-tight">{req.issue_name}</strong>
                                        )}
                                    </div>

                                    {/* C3: Location & Description */}
                                    <div className="pr-8">
                                        <p className="text-sm text-slate-700 font-bold mb-1">
                                            📍 {req.location_display}
                                        </p>
                                        {req.isEditing ? (
                                            <textarea 
                                                className="w-full p-2 border border-slate-300 rounded-md font-inherit text-sm h-20"
                                                value={req.issue_description}
                                                onChange={(e) => handleChange(req.maintenance_request_id, 'issue_description', e.target.value)}
                                            />
                                        ) : (
                                            <p className="text-sm text-slate-500 leading-relaxed">{req.issue_description}</p>
                                        )}
                                    </div>

                                    {/* C4: Actions */}
                                    <div className="flex justify-center gap-3">
                                        <button 
                                            onClick={() => toggleEdit(req.maintenance_request_id)}
                                            className={`${req.isEditing ? 'bg-emerald-500' : 'bg-slate-800'} text-white px-5 py-2 rounded-md font-semibold text-sm transition-all hover:brightness-110 shadow-sm`}
                                        >
                                            {req.isEditing ? 'Save' : 'Edit'}
                                        </button>
                                        <button 
                                            onClick={() => deleteRequest(req.maintenance_request_id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold text-sm transition-all hover:bg-red-600 shadow-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-24 text-center">
                                <p className="text-slate-400 text-lg">No maintenance requests found.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyRequests;