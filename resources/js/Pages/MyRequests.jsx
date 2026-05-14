import React from 'react';
import { router } from '@inertiajs/react';
import { MapPin, Wrench, Hash } from 'lucide-react';
import DashboardHeader from '@/Components/DashboardHeader';

const STATUS_STYLES = {
    'Pending':          'bg-amber-100 text-amber-700',
    'Work-In-Progress': 'bg-blue-100 text-blue-700',
    'Fixed':            'bg-emerald-100 text-emerald-700',
};

const MyRequests = ({ myRequests = [] }) => {
    const deleteRequest = (rawId) => {
        if (window.confirm('Are you sure you want to remove this request?')) {
            router.delete(`/requests/${rawId}`);
        }
    };

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

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12 pb-16 sm:pb-20 lg:pb-24">
                <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Page header */}
                    <header className="px-5 py-5 sm:px-8 sm:py-6 lg:p-8 border-b border-slate-100 flex items-center justify-between gap-4">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                            Manage My Requests
                        </h2>
                        <span className="text-xs sm:text-sm text-slate-400 shrink-0">
                            {myRequests.length} total
                        </span>
                    </header>

                    {/* ── DESKTOP TABLE (lg+) ── */}
                    <div className="hidden lg:block">
                        {/* Table header */}
                        <div className="grid grid-cols-[1.2fr_1.5fr_2.5fr_1fr] px-10 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">
                            <div>ID &amp; Category</div>
                            <div>Issue Name</div>
                            <div>Location &amp; Description</div>
                            <div className="text-center">Actions</div>
                        </div>

                        {/* Table rows */}
                        <div className="bg-white">
                            {myRequests.length > 0 ? myRequests.map(req => (
                                <div
                                    key={req.maintenance_request_id}
                                    className="grid grid-cols-[1.2fr_1.5fr_2.5fr_1fr] px-10 py-6 border-b border-slate-100 items-center last:border-b-0 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-mono font-bold text-slate-400">
                                            {req.maintenance_request_id}
                                        </span>
                                        <span className="bg-slate-200 px-3 py-1 rounded-full text-xs text-slate-600 font-semibold w-fit">
                                            {req.issue_category}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${STATUS_STYLES[req.status] ?? 'bg-slate-100 text-slate-500'}`}>
                                            {req.status}
                                        </span>
                                    </div>

                                    <div className="pr-5">
                                        <strong className="text-lg text-slate-800 leading-tight">{req.issue_name}</strong>
                                        {req.equipment_name && (
                                            <p className="text-xs text-slate-400 mt-1">🔧 {req.equipment_name}</p>
                                        )}
                                    </div>

                                    <div className="pr-8">
                                        <p className="text-sm text-slate-700 font-bold mb-1 flex items-center gap-1">
                                            <MapPin size={14} className="shrink-0" /> {req.location_display}
                                        </p>
                                        <p className="text-sm text-slate-500 leading-relaxed">{req.issue_description}</p>
                                    </div>

                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => router.visit(`/requests/${req.raw_id}/edit`)}
                                            className="bg-slate-800 text-white px-5 py-2 rounded-md font-semibold text-sm hover:brightness-110 shadow-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteRequest(req.raw_id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-red-600 shadow-sm"
                                        >
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
                    </div>

                    {/* ── MOBILE / TABLET CARDS (below lg) ── */}
                    <div className="lg:hidden">
                        {myRequests.length > 0 ? myRequests.map(req => (
                            <div
                                key={req.maintenance_request_id}
                                className="border-b border-slate-100 last:border-b-0 p-5 sm:p-6 hover:bg-slate-50 transition-colors"
                            >
                                {/* Top row: ID + badges */}
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="flex items-center gap-1 text-xs font-mono font-bold text-slate-400">
                                        <Hash size={11} />{req.maintenance_request_id}
                                    </span>
                                    <span className="bg-slate-200 px-2.5 py-0.5 rounded-full text-xs text-slate-600 font-semibold">
                                        {req.issue_category}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[req.status] ?? 'bg-slate-100 text-slate-500'}`}>
                                        {req.status}
                                    </span>
                                </div>

                                {/* Issue name */}
                                <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug mb-1">
                                    {req.issue_name}
                                </h3>

                                {/* Equipment */}
                                {req.equipment_name && (
                                    <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                                        <Wrench size={11} className="shrink-0" /> {req.equipment_name}
                                    </p>
                                )}

                                {/* Location */}
                                <p className="text-sm text-slate-700 font-semibold mb-1 flex items-center gap-1">
                                    <MapPin size={13} className="shrink-0 text-slate-500" />
                                    {req.location_display}
                                </p>

                                {/* Description */}
                                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                    {req.issue_description}
                                </p>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => router.visit(`/requests/${req.raw_id}/edit`)}
                                        className="flex-1 sm:flex-none bg-slate-800 text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:brightness-110 shadow-sm text-center"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteRequest(req.raw_id)}
                                        className="flex-1 sm:flex-none bg-red-500 text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-red-600 shadow-sm text-center"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="py-16 text-center">
                                <p className="text-slate-400 text-base">No maintenance requests found.</p>
                            </div>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
};

export default MyRequests;