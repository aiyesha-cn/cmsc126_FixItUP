import React from 'react';
import { Users, MapPin, Flag, Activity } from 'lucide-react';
import DashboardHeader from '@/Components/Admin/DashboardHeader';
import AdminOverview from '@/Components/Admin/AdminOverview';

// Badge colors per user role
const ROLE_COLORS = {
    'Student':        'bg-blue-100 text-blue-700',
    'Faculty':        'bg-purple-100 text-purple-700',
    'Administration': 'bg-amber-100 text-amber-700',
    'Staff':          'bg-emerald-100 text-emerald-700',
    'Other':          'bg-slate-100 text-slate-600',
};

// Fallback data shown when backend props are not yet available
const DUMMY_ROLES = [
    { role: 'Student',        count: 142 },
    { role: 'Faculty',        count: 38  },
    { role: 'Administration', count: 6   },
    { role: 'Staff',          count: 21  },
    { role: 'Other',          count: 9   },
];

const DUMMY_LOCATIONS = [
    { location: 'DHK - Delos Santos Hall',    open: 8 },
    { location: 'SOM - School of Management', open: 5 },
    { location: 'Sports Complex - Main Court', open: 3 },
    { location: 'CSM - Building A',           open: 2 },
    { location: 'Atrium',                     open: 1 },
];

const DUMMY_FLAGS = [
    { flag_id: 'FLAG-001', issue_name: 'Stove Burner Not Igniting', flag_reason: 'Duplicate',    date_flagged: '2026-05-10 09:14' },
    { flag_id: 'FLAG-002', issue_name: 'Loose Hallway Tiles',       flag_reason: 'False Report', date_flagged: '2026-05-11 14:30' },
    { flag_id: 'FLAG-003', issue_name: 'Broken Window Latch',       flag_reason: 'Spam',         date_flagged: '2026-05-12 08:05' },
];

const DUMMY_ACTIVITY = [
    { action: 'Status updated to Fixed',     target: 'REQ-103',  by: 'Admin User', time: '2 hours ago' },
    { action: 'Flag marked as Action Taken', target: 'FLAG-001', by: 'Admin User', time: '4 hours ago' },
    { action: 'Status updated to In Progress', target: 'REQ-102', by: 'Admin User', time: 'Yesterday'  },
    { action: 'Flag dismissed',              target: 'FLAG-002', by: 'Admin User', time: 'Yesterday'   },
    { action: 'Status updated to Fixed',     target: 'REQ-098',  by: 'Admin User', time: '2 days ago'  },
];

export default function AdminDashboard({ stats, users_by_role, top_locations, pending_flags, recent_activity }) {
    const roles     = users_by_role  ?? DUMMY_ROLES;
    const locations = top_locations  ?? DUMMY_LOCATIONS;
    const flags     = pending_flags  ?? DUMMY_FLAGS;
    const activity  = recent_activity ?? DUMMY_ACTIVITY;
    const total     = roles.reduce((s, r) => s + r.count, 0);

    return (
        <div className="relative min-h-screen"
            style={{ backgroundImage: "url('/images/bg4.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
        >
            <DashboardHeader />

            <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">

                {/* System overview stat cards */}
                <AdminOverview stats={stats} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Users by role with progress bars */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
                            <Users size={18} className="text-slate-400" />
                            <h3 className="font-bold text-slate-800 text-base">Users by Role</h3>
                        </div>
                        <div className="px-6 py-4 flex flex-col gap-3">
                            {roles.map(({ role, count }) => {
                                const pct = total ? Math.round((count / total) * 100) : 0;
                                return (
                                    <div key={role}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ROLE_COLORS[role]}`}>
                                                {role}
                                            </span>
                                            <span className="text-sm font-bold text-slate-700">{count}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pending flag reports snapshot */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <Flag size={18} className="text-slate-400" />
                                <h3 className="font-bold text-slate-800 text-base">Pending Flags</h3>
                            </div>
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {flags.length} unreviewed
                            </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {flags.map(flag => (
                                <div key={flag.flag_id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 leading-tight">{flag.issue_name}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{flag.date_flagged}</p>
                                    </div>
                                    <span className="shrink-0 bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                                        {flag.flag_reason}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Top locations by open request count */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
                            <MapPin size={18} className="text-slate-400" />
                            <h3 className="font-bold text-slate-800 text-base">Most Reported Locations</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {locations.map(({ location, open }, i) => (
                                <div key={location} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm text-slate-700 font-medium">{location}</span>
                                    </div>
                                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                        {open} open
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent admin action feed */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
                            <Activity size={18} className="text-slate-400" />
                            <h3 className="font-bold text-slate-800 text-base">Recent Activity</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {activity.map((item, i) => (
                                <div key={i} className="px-6 py-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-700">
                                            <span className="font-semibold">{item.action}</span>
                                            {' · '}
                                            <span className="font-mono text-xs text-slate-400">{item.target}</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.by} · {item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}