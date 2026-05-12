import React from 'react';
import { Link } from '@inertiajs/react';
import { User, Settings, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ dashboardLink = '/dashboard' }) {
    return (
        <nav className="w-60 min-h-screen bg-[#0a1628] flex flex-col justify-between px-6 py-8 items-center">

            <div className="flex flex-col gap-10">
                <div className="text-white text-2xl font-extrabold">FixItUP</div>

                <div className="flex flex-col gap-6">
                    <Link href="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <User size={18} /> Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <Settings size={18} /> Settings
                    </Link>
                </div>
            </div>

            <div>
                <Link href={dashboardLink} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors underline">
                    <LayoutDashboard size={18} /> Dashboard
                </Link>
            </div>
        </nav>
    );
}