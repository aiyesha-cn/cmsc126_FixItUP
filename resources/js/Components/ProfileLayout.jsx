import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { CircleUser, LogOut } from 'lucide-react';
import Sidebar from '@/Components/Sidebar';

export default function ProfileLayout({ children }) {
    const { auth } = usePage().props;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const firstName = auth?.user?.name?.split(' ')[0] ?? 'User';
    const fullName = auth?.user?.name ?? 'User';

    function handleLogout() {
        router.post('/logout');
    }

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-30 transition-transform duration-300
                lg:static lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Topbar */}
                <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-200 bg-white">

                    {/* Hamburger — mobile only */}
                    <button
                        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300 origin-center ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300 ${sidebarOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300 origin-center ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>

                    {/* User dropdown */}
                    <div
                        className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer relative ml-auto"
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                        <span className="sm:hidden">{firstName}</span>
                        <span className="hidden sm:inline">{fullName}</span>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <CircleUser size={18} />
                        </div>

                        {dropdownVisible && (
                            <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-50"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Page content */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}