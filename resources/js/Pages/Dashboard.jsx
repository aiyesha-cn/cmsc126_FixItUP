import React, { useState } from 'react';
import DashboardHeader from '@/Components/DashboardHeader';

const Dashboard = ({ userRequests }) => {
    const [statusFilter, setStatusFilter] = useState('All'); 
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    
    const dummyRequests = [
        { maintenance_request_id: "REQ-001", issue_name: "Leaking Faucet", issue_category: "Facility", location_display: "Main Lobby Entrance", status: "Pending" },
        { maintenance_request_id: "REQ-002", issue_name: "Broken Microwave", issue_category: "Appliance", location_display: "Kitchen - Unit 4B", status: "In Progress" },
        { maintenance_request_id: "REQ-003", issue_name: "AC Filter Replacement", issue_category: "Equipment", location_display: "Gymnasium Storage", status: "Resolved" }
    ];

    const baseData = (userRequests && userRequests.length > 0) ? userRequests : dummyRequests;

    const filteredRequests = baseData.filter(req => {
        const statusMatch = statusFilter === 'All' || req.status === statusFilter;
        const categoryMatch = categoryFilter === 'All Categories' || req.issue_category === categoryFilter;
        return statusMatch && categoryMatch;
    });

    return (
        <>
            <DashboardHeader />
            {/* Main Layout: 
                - Switched grid-cols to 1 column on mobile (grid-cols-1)
                - 2 columns on medium screens and up (md:grid-cols-[1fr_350px])
                - Reduced padding on mobile (p-4) vs desktop (p-12)
            */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 lg:gap-12 p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto bg-gray-50 text-slate-700 font-sans text-lg">
                
                <main>
                    {/* Hero Section Placeholder - Height adjusted for mobile */}
                    <div className="mb-8 bg-slate-200 h-[200px] md:h-[300px] rounded-2xl flex items-center justify-center italic text-slate-400 text-center px-4">
                        Hero Image Placeholder (1600 x 300)
                    </div>

                    <header>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Maintenance Overview</h2>
                        
                        {/* Action Bar & Filtering: Stacked on mobile, row on large screens */}
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 my-8 mb-10">  
                          
                            {/* Status Pills - Allow horizontal scroll on very small screens */}
                            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 w-full xl:w-auto no-scrollbar">
                                {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
                                    <button 
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={statusFilter === status 
                                            ? "px-4 py-2 whitespace-nowrap border border-amber-500 bg-amber-500 text-slate-900 rounded-xl font-semibold transition-all text-sm md:text-base"
                                            : "px-4 py-2 whitespace-nowrap border border-slate-200 bg-white rounded-xl text-slate-500 font-semibold text-sm md:text-base transition-all duration-200 hover:bg-slate-100"
                                        }
                                    >
                                        {status === 'All' ? 'All Requests' : status}
                                    </button>
                                ))}
                            </div>

                            {/* Search & Select Input - Full width on mobile */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center w-full xl:w-auto">
                                <select 
                                    className="w-full sm:w-auto p-3 border border-slate-200 rounded-lg text-base bg-white text-slate-700 cursor-pointer outline-none"
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

                                <div className="flex w-full sm:w-auto border border-slate-200 rounded-lg overflow-hidden bg-white">
                                    <input className="border-none p-2 outline-none flex-grow sm:w-[200px] xl:w-[250px] text-base" placeholder="Search..." />
                                    <button className="px-6 py-3 bg-amber-500 text-white font-medium rounded-r-lg hover:brightness-110">Go</button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {filteredRequests.length === 0 && (
                            <div className="col-span-full text-center py-20">
                                <p className="text-slate-400 italic">No requests match your search criteria.</p>
                            </div>
                        )}

                    {/* Request Grid: Responsive columns */}
                    <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                        {filteredRequests.map(req => (
                            <div key={req.maintenance_request_id} 
                                 className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-transform duration-300 hover:shadow-xl lg:hover:-translate-y-2">
                                
                                {/* Card Banner */}
                                <div className="bg-amber-500 h-20 md:h-25 p-4 md:p-6 flex items-end">
                                    <span className="text-[10px] md:text-xs bg-white/20 backdrop-blur-md text-slate-900 font-bold px-3 py-1 rounded-full border border-white/30">
                                        {req.issue_category}
                                    </span>
                                </div>

                                <div className="p-6 md:p-8">
                                    <p className="text-sm md:text-md text-slate-500 mb-1">{req.issue_name}</p>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4">{req.location_display}</h3>
                                    <span className="text-[10px] md:text-xs bg-slate-100 text-slate-500 font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                        {req.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Sidebar Widget Area: Moves below main on mobile */}
                <aside className="flex flex-col gap-8 mb-24 lg:mb-0">
                    <div className="bg-white p-6 md:p-9 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-indigo-900 text-lg uppercase mb-6 border-b border-slate-100 pb-3 font-bold tracking-tight">
                            My Recent Requests
                        </h3>
                        <div className="text-slate-400 text-sm italic">
                            Recent activity will appear here.
                        </div>
                    </div>
                </aside>

                {/* Floating Action Button: Adjusted width for mobile screens */}
                <a href='/submit-request' className="fixed bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 bg-[#001219] hover:bg-gradient-to-tr from-amber-500 to-amber-600 text-white px-8 lg:px-12 py-4 lg:py-5 rounded-full font-extrabold text-md lg:text-lg shadow-[0_15px_35px_rgba(0,18,25,0.4)] flex items-center gap-3 border border-white/10 transition-all duration-300 transform hover:-translate-y-1 z-[1001] cursor-pointer whitespace-nowrap">
                    <span className="text-xl lg:text-2xl">+</span> Submit New Request
                </a>
            </div>
        </>
    );
};

export default Dashboard;