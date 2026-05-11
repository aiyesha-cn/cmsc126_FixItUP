import React from 'react';
import { useForm } from '@inertiajs/react';
import ProfileLayout from '@/Components/ProfileLayout';

export default function SecuritySettings() {
    const { data, setData, post, reset, processing, errors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function handlePassSubmit(e) {
        e.preventDefault();
        post('/settings/password', {
            onSuccess: () => reset(),
            preserveScroll: true
        });
    }

    return (
        <ProfileLayout>
            <div className="p-4 sm:p-10 max-w-6xl">
                <h3 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-gray-800">Settings</h3>

                <form onSubmit={handlePassSubmit} className="space-y-6 sm:space-y-8">
                    <h2 className="text-lg font-medium text-gray-700">Change Password</h2>

                    {/* Row 1: Current and New Password */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Current Password</label>
                            <input
                                type="password"
                                value={data.current_password}
                                onChange={e => setData('current_password', e.target.value)}
                                className="w-full h-12 bg-[#E5E5E5] border-none rounded px-4 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.current_password && <p className="text-red-500 text-xs mt-1">{errors.current_password}</p>}
                        </div>

                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-500 mb-2">New Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full h-12 bg-[#E5E5E5] border-none rounded px-4 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    {/* Row 2: Confirm Password */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full h-12 bg-[#E5E5E5] border-none rounded px-4 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2 sm:pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto bg-slate-900 hover:bg-amber-600 text-white px-12 py-3 rounded text-sm font-semibold transition disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Change Password'}
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}