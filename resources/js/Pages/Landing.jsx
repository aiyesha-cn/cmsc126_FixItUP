import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const features = [
    {
        img: '/images/A.png',
        title: 'Submit a Report',
        desc: 'Choose a building, pick an issue category, describe the problem, and attach a photo. Done in under a minute.',
    },
    {
        img: '/images/B.png',
        title: 'Track Your Request',
        desc: 'See live status updates — Pending, Work-in-Progress, or Fixed — right from your dashboard.',
    },
    {
        img: '/images/C.png',
        title: 'Centralized Records',
        desc: 'Every report is logged and stored. Nothing gets lost, forgotten, or ignored.',
    },
    {
        img: '/images/D.png',
        title: 'Admin Management',
        desc: 'Maintenance staff can view, filter, and update all requests from one organized panel.',
    },
    {
        img: '/images/E.png',
        title: 'Role-Based Access',
        desc: 'Students, faculty, staff, and admins each get a view tailored to their needs.',
    },
    {
        img: '/images/F.png',
        title: 'Completion Logs',
        desc: 'Finished repairs are documented with timestamps and personnel details for full accountability.',
    },
];

export default function Landing() {
    const { auth } = usePage().props;

    return (
        <>
            <Header absolute />

            {/* Hero */}
            <section
                id="hero"
                className="relative min-h-screen flex items-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/sunflower.png')" }}
            >
                <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12">
                    <div className="max-w-3xl">
                        <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-950 leading-tight">
                            Report it.<br />
                            Track it.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                                Fix it.
                            </span>
                        </h3>

                        <p className="mt-6 text-lg md:text-xl text-white font-medium max-w-xl">
                            FixItUP is UP Mindanao's centralized platform for reporting and tracking campus facility issues.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            {!auth?.user && (
                                <Link
                                    href="/register"
                                    className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-2xl shadow-amber-950/40 transition-all active:scale-95 inline-block text-center w-full sm:w-auto"
                                >
                                    Get Started
                                </Link>
                            )}

                            {auth?.user && (
                                <Link
                                    href={auth.user.role === 'Administration' ? '/admin/dashboard' : '/dashboard'}
                                    className="px-10 py-4 bg-amber-500 hover:bg-amber-500 text-white font-bold rounded-xl transition-all active:scale-95 inline-block text-center w-full sm:w-auto"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section
                id="about"
                className="w-full py-20 md:py-32 border-b border-slate-100"
                style={{ backgroundImage: "url('/images/bg2.jpg')" }}
            >
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                                A campus built to serve you —{' '}
                                <span className="text-amber-500">starting with fixing what's broken.</span>
                            </h3>
                            <div className="h-1.5 w-20 bg-amber-500 rounded-full"></div>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            FixItUP was created to solve a simple but persistent problem: broken campus facilities with no easy way to report them.
                            <span className="block mt-4">
                                No more waiting for end-of-semester surveys. No more informal complaints that go unnoticed.
                                With FixItUP, anyone in the UP Mindanao community can submit a maintenance request in minutes and follow its progress until it's resolved.
                            </span>
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            {['Instant Submission', 'Real-time Tracking'].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="shrink-0 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold">✓</div>
                                    <p className="text-sm font-bold text-slate-700 uppercase tracking-tight">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10 shadow-inner overflow-hidden">
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">⚙️</div>
                                        <div>
                                            <div className="h-3 w-24 bg-slate-200 rounded-full mb-2"></div>
                                            <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">In Progress</span>
                                </div>

                                <div className="space-y-3 opacity-40">
                                    <div className="h-4 w-full bg-slate-200 rounded-lg"></div>
                                    <div className="h-4 w-5/6 bg-slate-200 rounded-lg"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-800 rounded-3xl shadow-xl shadow-amber-500/20 flex items-center justify-center text-amber-400 text-6xl font-black">
                            UP
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="w-full bg-[#001219] py-24">
                <div className="max-w-5xl mx-auto px-10 flex flex-col items-center">
                    <div className="text-center">
                        <h3 className="text-xl md:text-6xl font-bold text-white">What FixItUP Can Do</h3>
                        <h3 className="text-amber-500 text-center md:text-2xl mt-2">Everything you need to keep the campus running!</h3>
                    </div>

                    <div className="my-8 relative w-full flex flex-col items-center">
                        <div className="z-10 w-32 h-32 bg-[#001219] border-[10px] border-amber-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                            <svg
                                className="w-16 h-16 text-amber-500 animate-[rotate-slow_10s_linear_infinite]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                            </svg>
                        </div>
                        <div className="hidden lg:block absolute top-[64px] w-full h-[2px] bg-slate-800"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-slate-200 border border-slate-400 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:bg-amber-300"
                            >
                                <div className="flex items-center justify-center">
                                    <img src={feature.img} className="w-12 h-12" alt={feature.title} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 text-center mt-4">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 text-center">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}