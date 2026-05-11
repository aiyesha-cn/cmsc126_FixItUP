import React, { useState } from 'react';
import DashboardHeader from '@/Components/DashboardHeader';

const Discover = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');

    /*Dummy Data*/
    const discoverRequests = [
        { id: "REQ-101", user: "Sarah J.", title: "Community Garden Fence Broken", category: "Facility", description: "The north gate of the community garden is hanging by a single hinge. Needs repair before stray animals get in.", imageColor: "#f59e0b" },
        { id: "REQ-102", user: "Mike R.", title: "Pool Area Lights Flickering", category: "Facility", description: "Three of the overhead LEDs near the shallow end are strobing. Very distracting for evening swimmers.", imageColor: "#3b82f6" },
        { id: "REQ-103", user: "Apartment 3C", title: "Main Lobby AC Leaking", category: "Appliance", description: "There is a significant puddle forming under the vent in the main entrance lobby. Slip hazard!", imageColor: "#ef4444" },
        { id: "REQ-104", user: "Emma W.", title: "Buzzer System Unresponsive", category: "Appliance", description: "The main gate buzzer doesn't ring through to my phone anymore. Might be a system-wide software glitch.", imageColor: "#10b981" },
        { id: "REQ-105", user: "Kevin D.", title: "Gym Mirror Cracked", category: "Other", description: "Large crack in the mirror behind the squat rack. Needs safety tape or replacement.", imageColor: "#6366f1" }
    ];

    const filteredRequests = discoverRequests.filter(req => {
        const categoryMatch = categoryFilter === 'All Categories' || req.category === categoryFilter;
        const searchMatch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            req.description.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <DashboardHeader />
            
            <div className="pb-16 text-center pt-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Community Discover</h2>
                <p className="text-slate-500">See what's being fixed around the university.</p>

                {/* Filter & Search Bar using your specific layout */}
                <div className="flex justify-center items-center flex-wrap gap-5 my-8 mb-10">
                    <div className="flex gap-4">
                        <select 
                            className="p-3 border border-slate-200 rounded-lg text-base bg-white text-slate-700 cursor-pointer outline-none"
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
                        
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <input 
                                type="text" 
                                placeholder="Search requests..." 
                                className="border-none p-2 outline-none w-[300px] text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="px-6 py-3 bg-amber-500 text-white font-medium rounded-r-lg hover:brightness-110 transition-all">
                                Go
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Discover Grid using your repeat(auto-fill, 320px) definition */}
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] p-0 px-10 max-w-[1300px] mx-auto pb-20">
                {filteredRequests.map((req) => (
                    <div key={req.id} className="flex flex-col bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                        {/* Banner using dummy data hex code */}
                        <div 
                            className="h-32 p-6 flex items-end" 
                            style={{ backgroundColor: req.imageColor }}
                        >
                             <span className="text-[10px] bg-white/20 backdrop-blur-md text-white font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest">
                                {req.category}
                            </span>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-mono text-slate-400 font-bold tracking-tighter">{req.id}</span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">{req.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                {req.description}
                            </p>

                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                                    <span className="opacity-70">👤</span> {req.user}
                                </span>
                                <button className="text-amber-600 text-xs font-bold hover:underline">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="col-span-full text-center py-20">
                        <p className="text-slate-400 italic">No requests match your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;