import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import DashboardHeader from '@/Components/Admin/DashboardHeader';

const STATUS_STYLES = {
    'Pending':          'bg-amber-100 text-amber-700',
    'Work-In-Progress': 'bg-blue-100 text-blue-700',
    'Fixed':            'bg-emerald-100 text-emerald-700',
};

const CATEGORIES = ['All Categories', 'Facility', 'Appliance', 'Equipment', 'Flooring', 'Other'];
const STATUSES   = ['All Status', 'Pending', 'Work-In-Progress', 'Fixed'];

const Requests = ({ requests = [] }) => {
    const [searchTerm,     setSearchTerm]     = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [statusFilter,   setStatusFilter]   = useState('All Status');
    const [expandedId,     setExpandedId]     = useState(null);

    // Client-side filtering by category, status, and search term
    const filtered = requests.filter(req => {
        const matchCat    = categoryFilter === 'All Categories' || req.issue_category === categoryFilter;
        const matchStatus = statusFilter   === 'All Status'     || req.status         === statusFilter;
        const matchSearch = req.issue_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            req.submitted_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            req.maintenance_request_id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchStatus && matchSearch;
    });

    // Persist status change to DB immediately on dropdown change
    const updateStatus = (rawId, value) => {
        router.put(`/admin/requests/${rawId}/status`, { status: value }, { preserveScroll: true });
    };

    // Delete request with confirmation
    const deleteRequest = (rawId) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            router.delete(`/admin/requests/${rawId}`, { preserveScroll: true });
        }
    };

    const toggleExpand  = (id) => setExpandedId(expandedId === id ? null : id);
    const pendingCount  = requests.filter(r => r.status === 'Pending').length;

    return (
        <div className="relative z-10">
            <DashboardHeader />

            <div className="max-w-[1600px] mx-auto p-12 pb-24">
                <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Page header with pending count badge */}
                    <header className="p-8 border-b border-slate-100 flex items-start justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Maintenance Requests</h2>
                            <p className="text-slate-400 text-sm mt-1">Manage and update all submitted requests</p>
                        </div>
                        <span className="bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                            {pendingCount} Pending
                        </span>
                    </header>

                    {/* Filter bar */}
                    <div className="px-8 py-5 border-b border-slate-100 flex flex-wrap gap-4 items-center">
                        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                            className="p-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 outline-none">
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                            className="p-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 outline-none">
                            {STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm ml-auto">
                            <input type="text" placeholder="Search by ID, name, or submitter..."
                                className="border-none p-2.5 outline-none w-72 text-sm"
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            <button className="px-5 py-2.5 bg-slate-800 text-white text-sm font-medium hover:brightness-110">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Table header */}
                    <div className="grid grid-cols-[1fr_1.8fr_1.2fr_1.4fr_1fr_1fr] px-8 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">
                        <div>ID & Date</div>
                        <div>Issue</div>
                        <div>Submitted By</div>
                        <div>Location</div>
                        <div className="text-center">Status</div>
                        <div className="text-center">Actions</div>
                    </div>

                    {/* Table rows */}
                    <div>
                        {filtered.length > 0 ? filtered.map(req => (
                            <div key={req.maintenance_request_id} className="border-b border-slate-100 last:border-b-0">

                                {/* Main row */}
                                <div className="grid grid-cols-[1fr_1.8fr_1.2fr_1.4fr_1fr_1fr] px-8 py-5 items-center hover:bg-slate-50 transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-mono font-bold text-slate-400">{req.maintenance_request_id}</span>
                                        <span className="text-xs text-slate-400">{req.date_submitted}</span>
                                    </div>

                                    <div className="pr-4">
                                        <p className="text-sm font-bold text-slate-800 leading-tight">{req.issue_name}</p>
                                        {req.equipment_name && (
                                            <p className="text-xs text-slate-400 mt-0.5">🔧 {req.equipment_name}</p>
                                        )}
                                        <span className="mt-1.5 inline-block bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                                            {req.issue_category}
                                        </span>
                                    </div>

                                    <div className="text-sm text-slate-600 font-medium">{req.submitted_by}</div>
                                    
                                    <div>
                                        <div className="flex items-center gap-1 text-sm text-slate-600">
                                        <MapPin size={14} className="shrink-0" /> {req.location_display}
                                        </div>

                                        <div>
                                            {req.room_details && (
                                            <p className="text-xs text-slate-400 mt-0.5"> {req.room_details}</p>
                                        )}
                                        </div> 
                                    </div> 

                                    <div className="flex justify-center">
                                        <select
                                            value={req.status}
                                            onChange={e => updateStatus(req.raw_id, e.target.value)}
                                            className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer ${STATUS_STYLES[req.status]}`}
                                        >
                                            <option>Pending</option>
                                            <option>Work-In-Progress</option>
                                            <option>Fixed</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => toggleExpand(req.maintenance_request_id)}
                                            className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:brightness-110 shadow-sm">
                                            {expandedId === req.maintenance_request_id ? 'Close' : 'View'}
                                        </button>
                                        <button onClick={() => deleteRequest(req.raw_id)}
                                            className="bg-amber-400 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-red-600 shadow-sm">
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded detail panel */}
                                {expandedId === req.maintenance_request_id && (
                                    <div className="mx-8 mb-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                                        <div className="grid grid-cols-2 gap-6">

                                            {/* will show the img */}
                                            <div>
                                            {req.image_path && (
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image</p>
                                                    <img
                                                        src={`/storage/${req.image_path}`}
                                                        alt="maintenance_image"
                                                        className="rounded-lg border border-slate-200 max-h-64 object-cover w-full cursor-pointer"
                                                        onClick={() => window.open(`/storage/${req.image_path}`, '_blank')}
                                                    />
                                                </div>
                                            )}
                                            </div>

                                            {/* status */}
                                            <div className="flex flex-col gap-3">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Status</p>
                                                <select value={req.status}
                                                    onChange={e => updateStatus(req.raw_id, e.target.value)}
                                                    className="p-2 border border-slate-300 rounded-md text-sm bg-white">
                                                    <option>Pending</option>
                                                    <option>Work-In-Progress</option>
                                                    <option>Fixed</option>
                                                </select>

                                                {/* descrip - only shows when the user inputs in either of them*/}
                                            
                                                {req.issue_description && (
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Issue Description</p>
                                                        <div className="bg-white border border-slate-200 rounded-lg p-2">
                                                            <p className="text-sm text-slate-700 leading-relaxed">{req.issue_description}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {req.location_description && (
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location Description</p>
                                                        <div className="bg-white border border-slate-200 rounded-lg p-2">
                                                            <p className="text-sm text-slate-700 leading-relaxed">{req.location_description}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                <button onClick={() => toggleExpand(req.maintenance_request_id)}
                                                    className="bg-emerald-500 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-amber-500 self-end mt-auto">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )) : (
                            <div className="py-24 text-center">
                                <p className="text-slate-400 text-lg">No requests match your filters.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Requests;