import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { CircleUser, Settings, LogOut } from 'lucide-react';

export default function DashboardHeader() {
    const { auth } = usePage().props;
    console.log('all props:', usePage().props); 
    console.log(auth);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0a1628] border-b border-blue-900/50 flex items-center justify-between px-10 py-4">
            {/* Logo */}
            <div className="text-white text-xl font-bold">FixItUP</div>

            {/* Nav Links */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10 text-sm font-medium text-gray-300">
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <Link href="/discover" className="hover:text-white transition-colors">Discover</Link>
                <Link href="/my-requests" className="hover:text-white transition-colors">My Requests</Link>
            </div>

            {/* Profile Section */}
            <div className="relative">
                <div
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                >
                    <span>{auth?.user?.name ?? 'User'}</span>
                    <span className="text-lg"><CircleUser size={18} /></span>
                </div>

                {dropdownVisible && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <CircleUser size={18} /> Profile
                        </Link>
                        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <Settings size={18} /> Settings
                        </Link>
                        <hr className="border-gray-100" />
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-50 transition-colors">
                                <LogOut size={18} /> Logout
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
}