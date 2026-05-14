import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import DashboardHeader from '@/Components/DashboardHeader';

const STATUS_STYLES = {
    'Pending':          'bg-amber-100 text-amber-700',
    'Work-In-Progress': 'bg-blue-100 text-blue-700',
    'Fixed':            'bg-emerald-100 text-emerald-700',
};

const Dashboard = ({ userRequests = [] }) => {
    const [statusFilter,   setStatusFilter]   = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [search,         setSearch]         = useState('');

    // Client-side filtering by status, category, and search term
    const filtered = userRequests.filter(req => {
        const statusMatch   = statusFilter   === 'All'            || req.status         === statusFilter;
        const categoryMatch = categoryFilter === 'All Categories' || req.issue_category === categoryFilter;
        const searchMatch   = req.issue_name.toLowerCase().includes(search.toLowerCase());
        return statusMatch && categoryMatch && searchMatch;
    });

    // Sidebar shows 5 most recent requests sorted by date
    const recent = [...userRequests]
        .sort((a, b) => new Date(b.date_submitted) - new Date(a.date_submitted))
        .slice(0, 5);

    return (
        <div
            className="min-h-screen font-sans"
            style={{
                backgroundImage: "url('/images/bg4.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >

            <DashboardHeader />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 lg:gap-12 p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto font-sans">

                <main>
                    {/* Hero banner placeholder */}
                    <div className="mb-8 rounded-2xl overflow-hidden h-[200px] md:h-[300px]">
                        <img
                            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZDJ2bWI1aXFqajdzenpiZTl0aXNvc2Nwcm44YnB5b3RpbGU5MjB3ZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SphdK3sFxFYZy/giphy.gif"
                            alt="hero"
                            className="w-full h-full object-cover object-bottom"
                        />
                    </div>

                    <header>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Maintenance Overview</h2>

                        {/* Status filter pills + category/search bar */}
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 my-8 mb-10">
                            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 w-full xl:w-auto no-scrollbar">
                                {['All', 'Pending', 'Work-In-Progress', 'Fixed'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={statusFilter === status
                                            ? "px-4 py-2 whitespace-nowrap border border-amber-500 bg-amber-500 text-slate-900 rounded-xl font-semibold text-sm"
                                            : "px-4 py-2 whitespace-nowrap border border-slate-200 bg-white rounded-xl text-slate-500 font-semibold text-sm hover:bg-slate-100 transition-all"
                                        }
                                    >
                                        {status === 'All' ? 'All Requests' : status}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center w-full xl:w-auto">
                                <select
                                    className="w-full sm:w-auto p-3 border border-slate-200 rounded-lg text-base bg-white text-slate-700 outline-none"
                                    value={categoryFilter}
                                    onChange={e => setCategoryFilter(e.target.value)}
                                >
                                    {['All Categories','Facility','Appliance','Equipment','Flooring','Other'].map(c =>
                                        <option key={c}>{c}</option>
                                    )}
                                </select>
                                <div className="flex w-full sm:w-auto border border-slate-200 rounded-lg overflow-hidden bg-white">
                                    <input
                                        className="border-none p-2 outline-none flex-grow text-base"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    <button className="px-6 py-3 bg-amber-500 text-white font-medium hover:brightness-110">Go</button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Request cards grid */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-400 italic">No requests match your search criteria.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                            {filtered.map(req => (
                                <div key={req.maintenance_request_id}
                                    onClick={() => router.visit(`/requests/${req.raw_id}/edit`)}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-transform duration-300 hover:shadow-xl lg:hover:-translate-y-2 cursor-pointer"
                                >
                                    
                                    {/* Card banner — uploaded image or amber fallback */}
                                    <div className="h-40 relative overflow-hidden">
                                        {req.image_path ? (
                                            <img src={`/storage/${req.image_path}`} alt={req.issue_name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="bg-amber-500 h-full p-4 flex items-end">
                                                <span className="text-[10px] bg-white/20 backdrop-blur-md text-slate-900 font-bold px-3 py-1 rounded-full border border-white/30">
                                                    {req.issue_category}
                                                </span>
                                            </div>
                                        )}
                                        {req.image_path && (
                                            <div className="absolute bottom-2 left-3">
                                                <span className="text-[10px] bg-black/40 backdrop-blur-md text-white font-bold px-3 py-1 rounded-full">
                                                    {req.issue_category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card body */}
                                    <div className="p-6">
                                        <p className="text-sm text-slate-500 mb-1">{req.issue_name}</p>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-1">
                                            <MapPin size={14} className="shrink-0 text-slate-400" /> {req.location_display}
                                        </h3>
                                        <span className={`text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[req.status] ?? 'bg-slate-100 text-slate-500'}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {/* Sidebar — recent requests */}
                <aside className="flex flex-col gap-8 mb-24 lg:mb-0">
                    <div className="bg-white p-6 md:p-9 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-indigo-900 text-lg uppercase mb-6 border-b border-slate-100 pb-3 font-bold tracking-tight">
                            My Recent Requests
                        </h3>
                        {recent.length === 0 ? (
                            <p className="text-slate-400 text-sm italic">No requests yet.</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {recent.map(req => (
                                    <div key={req.maintenance_request_id} className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 leading-tight">{req.issue_name}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{req.maintenance_request_id}</p>
                                        </div>
                                        <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[req.status] ?? 'bg-slate-100 text-slate-500'}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                ))}
                                <button onClick={() => router.visit('/my-requests')}
                                    className="mt-2 text-amber-600 text-xs font-bold hover:underline text-left">
                                    View all →
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Floating submit button */}
                <a href='/submit-request'
                    className="fixed bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 bg-[#001219] hover:bg-gradient-to-tr from-amber-500 to-amber-600 text-white px-8 lg:px-12 py-4 lg:py-5 rounded-full font-extrabold text-lg shadow-[0_15px_35px_rgba(0,18,25,0.4)] flex items-center gap-3 border border-white/10 transition-all duration-300 hover:-translate-y-1 z-[1001] whitespace-nowrap"
                >
                    <span className="text-2xl">+</span> Submit New Request
                </a>
            </div>
        </div>
    );
};

export default Dashboard;