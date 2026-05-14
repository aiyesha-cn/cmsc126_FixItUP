import React from 'react';
import { router } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import DashboardHeader from '@/Components/DashboardHeader';

const STATUS_STYLES = {
    'Pending':          'bg-amber-100 text-amber-700',
    'Work-In-Progress': 'bg-blue-100 text-blue-700',
    'Fixed':            'bg-emerald-100 text-emerald-700',
};

const MyRequests = ({ myRequests = [] }) => {
    // Delete request with confirmation — cascades on backend
    const deleteRequest = (rawId) => {
        if (window.confirm('Are you sure you want to remove this request?')) {
            router.delete(`/requests/${rawId}`);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <DashboardHeader />

            <div className="max-w-[1600px] mx-auto p-12 pb-24">
                <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Page header */}
                    <header className="p-8 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-slate-900">Manage My Requests</h2>
                        <span className="text-sm text-slate-400">{myRequests.length} total</span>
                    </header>

                    {/* Table header */}
                    <div className="grid grid-cols-[1.2fr_1.5fr_2.5fr_1fr] px-10 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">
                        <div>ID & Category</div>
                        <div>Issue Name</div>
                        <div>Location & Description</div>
                        <div className="text-center">Actions</div>
                    </div>

                    {/* Table rows */}
                    <div className="bg-white">
                        {myRequests.length > 0 ? myRequests.map(req => (
                            <div key={req.maintenance_request_id}
                                className="grid grid-cols-[1.2fr_1.5fr_2.5fr_1fr] px-10 py-6 border-b border-slate-100 items-center last:border-b-0 hover:bg-slate-50 transition-colors"
                            >
                                {/* ID, category, and status badges */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-mono font-bold text-slate-400">{req.maintenance_request_id}</span>
                                    <span className="bg-slate-200 px-3 py-1 rounded-full text-xs text-slate-600 font-semibold w-fit">
                                        {req.issue_category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${STATUS_STYLES[req.status] ?? 'bg-slate-100 text-slate-500'}`}>
                                        {req.status}
                                    </span>
                                </div>

                                {/* Issue name and optional equipment */}
                                <div className="pr-5">
                                    <strong className="text-lg text-slate-800 leading-tight">{req.issue_name}</strong>
                                    {req.equipment_name && (
                                        <p className="text-xs text-slate-400 mt-1">🔧 {req.equipment_name}</p>
                                    )}
                                </div>

                                {/* Location and description */}
                                <div className="pr-8">
                                    <p className="text-sm text-slate-700 font-bold mb-1 flex items-center gap-1">
                                        <MapPin size={13} className="shrink-0" /> {req.location_display}
                                    </p>
                                    <p className="text-sm text-slate-500 leading-relaxed">{req.issue_description}</p>
                                </div>

                                {/* Edit navigates to full edit form, delete cascades */}
                                <div className="flex justify-center gap-3">
                                    <button onClick={() => router.visit(`/requests/${req.raw_id}/edit`)}
                                        className="bg-slate-800 text-white px-5 py-2 rounded-md font-semibold text-sm hover:brightness-110 shadow-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteRequest(req.raw_id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-red-600 shadow-sm">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )) : (
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