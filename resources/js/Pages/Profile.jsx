import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import ProfileLayout from '@/Components/ProfileLayout';

export default function Profile() {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        user_first_name: auth.user.first_name ?? '',
        user_last_name: auth.user.last_name ?? '',
        email: auth.user.email ?? '',
    });

    function handleProfileSubmit(e) {
        e.preventDefault();
        post('/profile/update', { preserveScroll: true });
    }

    return (
        <ProfileLayout>
            <div className="p-4 sm:p-10 max-w-6xl">
                <h3 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-gray-800">My Profile</h3>

                <form onSubmit={handleProfileSubmit} className="space-y-6 sm:space-y-8">
                    <h2 className="text-lg font-medium text-gray-700">Profile Information</h2>

                    {/* Row 1: First Name and Last Name */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-500 mb-2">First Name</label>
                            <input
                                type="text"
                                value={data.user_first_name}
                                onChange={e => setData('user_first_name', e.target.value)}
                                className="w-full h-12 bg-[#E5E5E5] border-none rounded px-4 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.user_first_name && <p className="text-red-500 text-xs mt-1">{errors.user_first_name}</p>}
                        </div>

                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Last Name</label>
                            <input
                                type="text"
                                value={data.user_last_name}
                                onChange={e => setData('user_last_name', e.target.value)}
                                className="w-full h-12 bg-[#E5E5E5] border-none rounded px-4 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.user_last_name && <p className="text-red-500 text-xs mt-1">{errors.user_last_name}</p>}
                        </div>
                    </div>

                    {/* Row 2: Role */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Account Role</label>
                            <input
                                type="text"
                                value={auth.user.role ?? 'User'}
                                disabled
                                className="w-full h-12 bg-[#F0F0F0] border-none rounded px-4 text-gray-400 cursor-not-allowed italic"
                            />
                        </div>
                    </div>

                    {/* Row 3: Email */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full h-12 bg-[#E5E5E5] border-none rounded px-4 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2 sm:pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto bg-slate-900 hover:bg-amber-600 text-white px-12 py-3 rounded text-sm font-semibold transition disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}