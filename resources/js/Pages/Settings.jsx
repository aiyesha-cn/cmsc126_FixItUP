import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ProfileLayout from '@/Components/ProfileLayout';

export default function Settings() {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data, setData, post, reset, processing, errors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function handlePassSubmit(e) {
        e.preventDefault();
        post('/settings/password', { onSuccess: () => reset() });
    }

    return (
        <ProfileLayout>
            <h3>Settings</h3>

            <form onSubmit={handlePassSubmit}>
                <h2>Change Password</h2>

                <div>
                    <h1>Current Password</h1>
                    <input type="password" value={data.current_password} onChange={e => setData('current_password', e.target.value)} />
                    {errors.current_password && <p>{errors.current_password}</p>}
                </div>

                <div>
                    <h1>New Password</h1>
                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <div>
                    <h1>Confirm Password</h1>
                    <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                    {errors.password_confirmation && <p>{errors.password_confirmation}</p>}
                </div>

                <div>
                    <button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Password'}
                    </button>
                    <button type="button" onClick={() => reset()}>Cancel</button>
                </div>
            </form>
        </ProfileLayout>
    );
}