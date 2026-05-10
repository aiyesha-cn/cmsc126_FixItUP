import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/login');
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

                {/* Login Form Container */}
                <main className="grow flex items-start justify-center pt-10 p-4">
                    <div className="relative z-10 w-full max-w-[420px] p-10 md:p-10 rounded-[45px] bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col items-center">

                        <h3 className="text-4xl font-extrabold text-[#051622] hover:text-amber-600 mb-10">Login</h3>

                        <form onSubmit={handleSubmit} className="w-full space-y-10">
                            {/* Email */}
                            <div className="relative border-b border-slate-500 focus-within:border-[#051622] transition-all">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-transparent pb-3 text-[#051622] placeholder-slate-600 outline-none"
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
                                    className="w-full bg-transparent pb-3 text-[#051622] placeholder-slate-600 outline-none"
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-5 h-5 rounded border-gray-400 bg-white/40 text-[#051622] focus:ring-0 cursor-pointer"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                />
                                <label htmlFor="remember" className="text-base font-medium text-slate-800 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-[#051622] text-white rounded-2xl font-bold text-xl hover:bg-amber-600 transition-all transform active:scale-[0.98] shadow-2xl disabled:opacity-50"
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <p className="mt-8 text-slate-800 text-sm">
                            Don't have an account?
                            <Link href="/register" className="font-extrabold hover:underline text-[#051622] ml-1 hover:text-amber-600">
                                Register
                            </Link>
                        </p>
                    </div>
                </main>
            </div>

        </>
    );
}