import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { User, FlagTriangleRight, MapPin } from 'lucide-react';
import DashboardHeader from '@/Components/DashboardHeader';

const STATUS_STYLES = {
    'Pending':          'bg-amber-100 text-amber-700',
    'Work-In-Progress': 'bg-blue-100 text-blue-700',
    'Fixed':            'bg-emerald-100 text-emerald-700',
};

const FLAG_REASONS = ['Duplicate', 'Spam', 'False Report', 'Inappropriate Content', 'Already Fixed', 'Other'];

// Modal for submitting a flag report on a specific request
const FlagModal = ({ request, onClose }) => {
    const [reason,      setReason]    = useState('');
    const [description, setDescription] = useState('');
    const [submitted,   setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!reason) return;
        router.post('/flag-report', {
            maintenance_request_id: request.raw_id,
            flag_reason:            reason,
            flag_description:       description,
        }, {
            onSuccess: () => setSubmitted(true),
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                {submitted ? (
                    // Success state
                    <div className="text-center py-6">
                        <p className="text-2xl mb-3">✅</p>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Report Submitted</h3>
                        <p className="text-slate-500 text-sm mb-6">Thank you for helping keep the community accurate.</p>
                        <button onClick={onClose} className="bg-slate-800 text-white px-8 py-3 rounded-full font-semibold hover:brightness-110">
                            Close
                        </button>
                    </div>
                ) : (
                    // Flag form
                    <>
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Flag this Request</h3>
                                <p className="text-xs text-slate-400 mt-1">{request.issue_name}</p>
                            </div>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-600 mb-2 block">Reason</label>
                                <select value={reason} onChange={e => setReason(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 outline-none focus:border-amber-500">
                                    <option value="">Select a reason</option>
                                    {FLAG_REASONS.map(r => <option key={r}>{r}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-600 mb-2 block">
                                    Description <span className="text-slate-400 font-normal">(optional)</span>
                                </label>
                                <textarea rows="3" placeholder="Provide more details about this flag..."
                                    value={description} onChange={e => setDescription(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 outline-none focus:border-amber-500 resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-500 font-semibold hover:bg-slate-50">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} disabled={!reason}
                                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-40">
                                Submit Flag
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const Discover = ({ requests = [] }) => {
    const [searchTerm,     setSearchTerm]     = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [flagging,       setFlagging]       = useState(null);

    // Client-side filtering by category and search term
    const filtered = requests.filter(req => {
        const categoryMatch = categoryFilter === 'All Categories' || req.issue_category === categoryFilter;
        const searchMatch   = req.issue_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              req.issue_description.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <DashboardHeader />

            {/* Flag modal — renders when a request is selected for flagging */}
            {flagging && <FlagModal request={flagging} onClose={() => setFlagging(null)} />}

            {/* Page header and filter bar */}
            <div className="pb-16 text-center pt-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Community Discover</h2>
                <p className="text-slate-500">See what's being fixed around the university.</p>
                <div className="flex justify-center items-center flex-wrap gap-5 my-8 mb-10">
                    <div className="flex gap-4">
                        <select className="p-3 border border-slate-200 rounded-lg text-base bg-white text-slate-700 outline-none"
                            value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                            {['All Categories','Facility','Appliance','Equipment','Flooring','Other'].map(c =>
                                <option key={c}>{c}</option>
                            )}
                        </select>
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <input type="text" placeholder="Search requests..."
                                className="border-none p-2 outline-none w-[300px] text-base"
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            <button className="px-6 py-3 bg-amber-500 text-white font-medium hover:brightness-110">Go</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request cards grid */}
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] px-10 max-w-[1300px] mx-auto pb-20">
                {filtered.map(req => (
                    <div key={req.maintenance_request_id}
                        className="flex flex-col bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                    >
                        {/* Card banner — uploaded image or amber fallback */}
                        <div className="h-40 relative overflow-hidden">
                            {req.image_path ? (
                                <img src={`/storage/${req.image_path}`} alt={req.issue_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-amber-500 flex items-end p-4">
                                    <span className="text-[10px] bg-white/20 backdrop-blur-md text-white font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest">
                                        {req.issue_category}
                                    </span>
                                </div>
                            )}
                            {req.image_path && (
                                <div className="absolute bottom-3 left-4">
                                    <span className="text-[10px] bg-black/40 backdrop-blur-md text-white font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                        {req.issue_category}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Card body */}
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-xs font-mono text-slate-400 font-bold mb-2">{req.maintenance_request_id}</span>
                            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{req.issue_name}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-3">{req.issue_description}</p>
                            <p className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                                <MapPin size={13} /> {req.location_display}
                            </p>

                            {/* Footer — submitter, status, flag button */}
                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
                                    <User size={13} /> {req.submitted_by}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[req.status] ?? 'bg-slate-100 text-slate-500'}`}>
                                        {req.status}
                                    </span>
                                    <button onClick={() => setFlagging(req)}
                                        className="text-slate-300 hover:text-red-400 transition-colors"
                                        title="Flag this request">
                                        <FlagTriangleRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-20">
                        <p className="text-slate-400 italic">No requests match your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;