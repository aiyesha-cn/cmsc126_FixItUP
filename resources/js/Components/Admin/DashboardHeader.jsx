import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { CircleUser, Settings, LogOut } from 'lucide-react';

export default function DashboardHeader() {
    const { auth } = usePage().props;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const fullName  = auth?.user?.name ?? 'User';
    const firstName = fullName.split(' ')[0];

    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0a1628] border-b border-blue-900/50">
            <div className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4">

                {/* Logo */}
                <Link href="/" className="text-lg sm:text-xl font-extrabold text-white shrink-0 hover:text-amber-400 transition-colors z-10">
                    FixItUP
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-10 text-sm font-medium text-gray-300">
                    <Link href="/admin/dashboard"  className="hover:text-white transition-colors">Dashboard</Link>
                    <Link href="/admin/requests"   className="hover:text-white transition-colors">Requests</Link>
                    <Link href="/admin/flagreports" className="hover:text-white transition-colors">Flag Reports</Link>
                </div>

                <div className="flex items-center gap-3">
                    {/* Profile dropdown */}
                    <div className="relative">
                        <div
                            onClick={() => setDropdownVisible(!dropdownVisible)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                        >
                            <span className="hidden md:inline">{fullName}</span>
                            <span className="md:hidden">{firstName}</span>
                            <span className="text-lg">👤</span>
                        </div>

                        {dropdownVisible && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setDropdownVisible(false)} />
                                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                    <Link href="/profile" onClick={() => setDropdownVisible(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <CircleUser size={16} /> Profile
                                    </Link>
                                    <Link href="/settings" onClick={() => setDropdownVisible(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <Settings size={16} /> Settings
                                    </Link>
                                    <hr className="border-gray-100" />
                                    <form onSubmit={handleLogout}>
                                        <button type="submit"
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-red-500 transition-colors">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile nav menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-blue-900/50 px-5 py-4 flex flex-col gap-4">
                    <Link href="/admin/dashboard"   onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-1">Dashboard</Link>
                    <Link href="/admin/requests"    onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-1">Requests</Link>
                    <Link href="/admin/flagreports" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-1">Flag Reports</Link>
                </div>
            </div>
        </nav>
    );
}