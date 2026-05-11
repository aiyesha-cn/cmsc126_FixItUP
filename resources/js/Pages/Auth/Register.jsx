import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Register() {
    const { data, setData, post, errors, processing } = useForm({
        user_first_name: '',
        user_last_name: '',
        role: '',
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/register');
    }

    return (
        <>
            <Header showAuth={false} />

            <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
                {/* Full Screen Background */}
                <div className="fixed inset-0 -z-10">
                    <img
                        src="/images/bg1.png"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                </div>

                {/* Register Form Container */}
                <main className="flex-grow flex items-start justify-center pt-10 p-4">
                    <div className="relative z-10 w-full max-w-[450px] p-10 md:p-10 rounded-[45px] bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col items-center">

                        <h3 className="text-4xl font-extrabold text-[#051622] hover:text-amber-600 mb-8">Sign Up</h3>

                        <form onSubmit={handleSubmit} className="w-full space-y-7">
                            {/* First Name */}
                            <div className="relative border-b border-slate-500 focus-within:border-[#051622] transition-all">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={data.user_first_name}
                                    onChange={e => setData('user_first_name', e.target.value)}
                                    className="w-full bg-transparent pb-2 text-[#051622] placeholder-slate-600 outline-none"
                                    required
                                />
                                {errors.user_first_name && <p className="text-red-500 text-xs mt-1">{errors.user_first_name}</p>}
                            </div>

                            {/* Last Name */}
                            <div className="relative border-b border-slate-500 focus-within:border-[#051622] transition-all">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={data.user_last_name}
                                    onChange={e => setData('user_last_name', e.target.value)}
                                    className="w-full bg-transparent pb-2 text-[#051622] placeholder-slate-600 outline-none"
                                    required
                                />
                                {errors.user_last_name && <p className="text-red-500 text-xs mt-1">{errors.user_last_name}</p>}
                            </div>

                            {/* Role Selection */}
                            <div className="relative group">
                                <div className="relative border-b border-slate-500 focus-within:border-[#051622] transition-all flex items-center">
                                    <select
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        className="w-full bg-transparent pb-3 text-[#051622] outline-none appearance-none cursor-pointer z-10"
                                        required
                                    >
                                        <option value="" disabled className="bg-white text-slate-600">Select Role</option>
                                        <option value="Student" className="bg-white text-[#051622]">Student</option>
                                        <option value="Faculty" className="bg-white text-[#051622]">Faculty</option>
                                        <option value="Administration" className="bg-white text-[#051622]">Administration</option>
                                        <option value="Staff" className="bg-white text-[#051622]">Staff</option>
                                        <option value="Other" className="bg-white text-[#051622]">Other</option>
                                    </select>

                                    {/* Dropdown Arrow */}
                                    <div className="absolute right-0 bottom-3 transition-transform duration-300 pointer-events-none text-slate-600 group-focus-within:rotate-180 group-focus-within:text-[#051622]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>

                            {/* Email */}
                            <div className="relative border-b border-slate-500 focus-within:border-[#051622] transition-all">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-transparent pb-2 text-[#051622] placeholder-slate-600 outline-none"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="relative border-b border-slate-500 focus-within:border-[#051622] transition-all">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-transparent pb-2 text-[#051622] placeholder-slate-500 outline-none"
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-[#051622] text-white rounded-2xl font-bold text-xl hover:bg-amber-600 transition-all transform active:scale-[0.98] shadow-2xl mt-4 disabled:opacity-50"
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <p className="mt-8 text-slate-800 text-sm">
                            Already have an account?
                            <Link href="/login" className="font-extrabold hover:underline text-[#051622] ml-1 hover:text-amber-600">
                                Login
                            </Link>
                        </p>
                    </div>
                </main>
            </div>

        </>
    );
}