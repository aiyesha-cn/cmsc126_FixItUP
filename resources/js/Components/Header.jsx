import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function Header({ showAuth = true, absolute = false }) {
    const { auth } = usePage().props;

    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <header className={`${absolute ? 'absolute' : 'sticky'} top-0 z-50 w-full bg-white/10 backdrop-blur-md`}>
            <nav className="flex items-center justify-between px-10 py-6">
                <Link href="/" className="text-xl font-extrabold text-white shrink-0 hover:text-amber-400">
                    FixItUP
                </Link>

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10 text-sm font-medium text-white">
                    <a href="/#about" className="hover:text-amber-400 transition-colors">About Us</a>
                    <a href="/#features" className="hover:text-amber-400 transition-colors">Features</a>
                </div>

                <div className="text-sm font-medium text-white min-w-[120px] flex justify-end">
                    {showAuth && (
                        auth?.user ? (
                            <form onSubmit={handleLogout} className="inline">
                                <button type="submit" className="px-5 py-2 bg-white/20 text-white rounded-full hover:bg-amber-600 transition-all text-xs uppercase tracking-widest">
                                    Log Out
                                </button>
                            </form>
                        ) : (
                            <Link href="/login" className="px-5 py-2 bg-white/20 text-white rounded-full hover:bg-amber-500 transition-all text-xs uppercase tracking-widest">
                                Log In & Sign Up
                            </Link>
                        )
                    )}
                </div>
            </nav>
        </header>
    );
}