import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function ProfileLayout({ children }) {
    const { auth } = usePage().props;
    const [dropdownVisible, setDropdownVisible] = useState(false);

    function handleLogout() {
        router.post('/logout');
    }

    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-end px-8 py-4 border-b border-slate-200 bg-white">
                    <div
                        className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer relative"
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                        <span>{auth?.user?.name ?? 'User'}</span>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">👤</div>

                        {dropdownVisible && (
                            <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                <hr className="border-gray-100" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-50"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}