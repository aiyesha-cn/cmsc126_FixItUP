import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function Header({ showAuth = true, absolute = false }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <header className={`${absolute ? 'absolute' : 'sticky'} top-0 z-50 w-full bg-white/10 backdrop-blur-md`}>
            <nav className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6">

                {/* Logo */}
                <Link href="/" className="text-lg sm:text-xl font-extrabold text-white shrink-0 hover:text-amber-400 transition-colors z-10">
                    FixItUP
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-10 text-sm font-medium text-white">
                    <a href="/#about" className="hover:text-amber-400 transition-colors">About Us</a>
                    <a href="/#features" className="hover:text-amber-400 transition-colors">Features</a>
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex text-sm font-medium text-white min-w-[120px] justify-end">
                    {showAuth && (
                        auth?.user ? (
                            <form onSubmit={handleLogout}>
                                <button type="submit" className="px-5 py-2 bg-white/20 text-white rounded-full hover:bg-amber-600 transition-all text-xs uppercase tracking-widest">
                                    Log Out
                                </button>
                            </form>
                        ) : (
                            <Link href="/login" className="px-5 py-2 bg-white/20 text-white rounded-full hover:bg-amber-500 transition-all text-xs uppercase tracking-widest whitespace-nowrap">
                                Log In & Sign Up
                            </Link>
                        )
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden z-10 flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                    <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-black/40 backdrop-blur-lg border-t border-white/10 px-5 py-4 flex flex-col gap-4">
                    <a href="/#about" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white hover:text-amber-400 transition-colors py-1">About Us</a>
                    <a href="/#features" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white hover:text-amber-400 transition-colors py-1">Features</a>

                    {showAuth && (
                        <div className="pt-2 border-t border-white/10">
                            {auth?.user ? (
                                <form onSubmit={handleLogout}>
                                    <button type="submit" className="w-full px-5 py-2.5 bg-white/20 text-white rounded-full hover:bg-amber-600 transition-all text-xs uppercase tracking-widest text-center">
                                        Log Out
                                    </button>
                                </form>
                            ) : (
                                <Link href="/login" onClick={() => setMenuOpen(false)} className="block w-full px-5 py-2.5 bg-white/20 text-white rounded-full hover:bg-amber-500 transition-all text-xs uppercase tracking-widest text-center">
                                    Log In & Sign Up
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}