import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import DashboardHeader from '@/Components/Admin/DashboardHeader';

const STATUS_STYLES = {
    'Pending':      'bg-amber-100 text-amber-700',
    'Reviewed':     'bg-blue-100 text-blue-700',
    'Dismissed':    'bg-slate-200 text-slate-600',
    'Action Taken': 'bg-emerald-100 text-emerald-700',
};

const FlagReports = ({ flags = [] }) => {
    const [expandedId, setExpandedId] = useState(null);

    // Local state for unsaved status/note edits per flag (keyed by raw_id)
    const [notes,    setNotes]    = useState({});
    const [statuses, setStatuses] = useState({});

    const getStatus = (flag) => statuses[flag.raw_id] ?? flag.status;
    const getNote   = (flag) => notes[flag.raw_id]   ?? flag.admin_note ?? '';

    // Persist status and note changes to DB, then close the panel
    const saveFlag = (flag) => {
        router.put(`/admin/flagreports/${flag.raw_id}`, {
            status:     getStatus(flag),
            admin_note: getNote(flag),
        }, {
            preserveScroll: true,
            onSuccess: () => setExpandedId(null),
        });
    };

    // Delete flag report with confirmation
    const deleteRequest = (rawId) => {
        if (window.confirm('Are you sure you want to remove this request?')) {
            router.delete(`/admin/flagreports/${rawId}`, { preserveScroll: true });
        }
    };

    const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);
    const pendingCount = flags.filter(f => f.status === 'Pending').length;

    return (
        <div className="relative min-h-screen"
            style={{ backgroundImage: "url('/images/bg4.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
        >
            <DashboardHeader />

            <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12 pb-24">
                <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Page header with pending count badge */}
                    <header className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Flag Reports</h2>
                            <p className="text-slate-400 text-sm mt-1">Review and act on flagged maintenance requests</p>
                        </div>
                        <span className="shrink-0 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                            {pendingCount} Pending
                        </span>
                    </header>

                    {/* Table header — hidden on mobile, shown on lg+ */}
                    <div className="hidden lg:grid grid-cols-[1fr_1.5fr_1.2fr_1.2fr_1fr_1fr] px-10 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">
                        <div>Flag ID</div>
                        <div>Flagged Request</div>
                        <div>Flagged By</div>
                        <div>Reason</div>
                        <div className="text-center">Status</div>
                        <div className="text-center">Actions</div>
                    </div>

                    {/* Table rows */}
                    <div className="bg-white divide-y divide-slate-100">
                        {flags.length > 0 ? flags.map(flag => (
                            <div key={flag.flag_id}>

                                {/* Mobile card layout */}
                                <div className="lg:hidden p-5 flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{flag.issue_name}</p>
                                            <p className="text-xs font-mono text-slate-400">{flag.flag_id} · {flag.maintenance_request_id}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{flag.date_flagged}</p>
                                        </div>
                                        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[getStatus(flag)]}`}>
                                            {getStatus(flag)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs text-slate-500">{flag.flagged_by}</span>
                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {flag.flag_reason}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        <button
                                            onClick={() => toggleExpand(flag.flag_id)}
                                            className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:brightness-110 shadow-sm"
                                        >
                                            {expandedId === flag.flag_id ? 'Close' : 'Review'}
                                        </button>
                                        <button
                                            onClick={() => deleteRequest(flag.raw_id)}
                                            className="bg-amber-400 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-red-600 shadow-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop table row — hidden on mobile */}
                                <div className="hidden lg:grid grid-cols-[1fr_1.5fr_1.2fr_1.2fr_1fr_1fr] px-10 py-5 items-center hover:bg-slate-50 transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-mono font-bold text-slate-400">{flag.flag_id}</span>
                                        <span className="text-xs text-slate-400">{flag.date_flagged}</span>
                                    </div>
                                    <div className="pr-4">
                                        <p className="text-sm font-bold text-slate-800">{flag.issue_name}</p>
                                        <p className="text-xs font-mono text-slate-400">{flag.maintenance_request_id}</p>
                                    </div>
                                    <div className="text-sm text-slate-600">{flag.flagged_by}</div>
                                    <div>
                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {flag.flag_reason}
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[getStatus(flag)]}`}>
                                            {getStatus(flag)}
                                        </span>
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => toggleExpand(flag.flag_id)}
                                            className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:brightness-110 shadow-sm"
                                        >
                                            {expandedId === flag.flag_id ? 'Close' : 'Review'}
                                        </button>
                                        <button
                                            onClick={() => deleteRequest(flag.raw_id)}
                                            className="bg-amber-400 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-red-600 shadow-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded detail panel */}
                                {expandedId === flag.flag_id && (
                                    <div className="mx-4 md:mx-8 mb-6 p-4 md:p-6 bg-slate-50 rounded-xl border border-slate-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            {/* Left column — will show the img + flag description */}
                                            <div>
                                                {flag.image_path && (
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image</p>
                                                        <img
                                                            src={`/storage/${flag.image_path}`}
                                                            alt="maintenance_image"
                                                            className="rounded-lg border border-slate-200 max-h-64 object-cover w-full cursor-pointer"
                                                            onClick={() => window.open(`/storage/${flag.image_path}`, '_blank')}
                                                        />
                                                    </div>
                                                )}

                                                {/* Flag Description */}
                                                <div className="mt-4">
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Flag Description</p>
                                                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                                                        <p className="text-sm text-slate-700 leading-relaxed">{flag.flag_description}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right column — status, descriptions, admin note */}
                                            <div className="flex flex-col gap-3">

                                                {/* Status */}
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Status</p>
                                                <select
                                                    value={getStatus(flag)}
                                                    onChange={e => setStatuses(s => ({ ...s, [flag.raw_id]: e.target.value }))}
                                                    className="p-2 border border-slate-300 rounded-md text-sm bg-white"
                                                >
                                                    <option>Pending</option>
                                                    <option>Reviewed</option>
                                                    <option>Dismissed</option>
                                                    <option>Action Taken</option>
                                                </select>

                                                {/* descrip - only shows when the user inputs in either of them */}
                                                {flag.issue_description && (
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Issue Description</p>
                                                        <div className="bg-white border border-slate-200 rounded-lg p-2">
                                                            <p className="text-sm text-slate-700 leading-relaxed">{flag.issue_description}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {flag.location_description && (
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location Description</p>
                                                        <div className="bg-white border border-slate-200 rounded-lg p-2">
                                                            <p className="text-sm text-slate-700 leading-relaxed">{flag.location_description}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Admin Note */}
                                                <div className="mt-6">
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Admin Note</p>
                                                    <textarea
                                                        value={getNote(flag)}
                                                        onChange={e => setNotes(n => ({ ...n, [flag.raw_id]: e.target.value }))}
                                                        placeholder="Add a note about this flag..."
                                                        className="w-full p-2 border border-slate-300 rounded-md text-sm h-20 resize-none"
                                                    />
                                                </div>

                                                <button
                                                    onClick={() => saveFlag(flag)}
                                                    className="bg-emerald-500 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-amber-500 self-end mt-auto"
                                                >
                                                    Save & Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )) : (
                            <div className="py-24 text-center">
                                <p className="text-slate-400 text-lg">No flagged reports found.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FlagReports;