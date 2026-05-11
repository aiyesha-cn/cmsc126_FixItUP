import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import ProfileLayout from '@/Components/ProfileLayout';

export default function Profile() {
    const { auth } = usePage().props;
    const [preview, setPreview] = useState(auth.user.photo_path
        ? `/storage/${auth.user.photo_path}`
        : null
    );

    const { data, setData, post, processing, errors } = useForm({
        user_first_name: auth.user.user_first_name ?? '',
        user_last_name: auth.user.user_last_name ?? '',
        email: auth.user.email ?? '',
        photo: null,
    });

    useEffect(() => {
        if (auth.user.photo_path && !preview?.startsWith('blob:')) {
            setPreview(`/storage/${auth.user.photo_path}`);
        }
    }, [auth.user.photo_path]);

    function handlePFPChange(e) {
        const file = e.target.files[0];
        if (file) {
            if (preview?.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }
            setPreview(URL.createObjectURL(file));
            setData('photo', file);
        }
    }

    function handlePFPDelete() {
        if (preview?.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        setData('photo', null);
    }

    function handlePFPSubmit(e) {
        e.preventDefault();
        post('/profile/update', { forceFormData: true });
    }

    return (
        <ProfileLayout>
            <h2>My Profile</h2>

            <form onSubmit={handlePFPSubmit}>
                <div>
                    {preview ? (
                        <img src={preview} alt="Profile" />
                    ) : (
                        <img src="/images/defaultPFP.png" alt="👤" />
                    )}

                    <div>
                        <input type="file" id="photo" accept="image/*" onChange={handlePFPChange} className="hidden" />
                        <label htmlFor="photo">Upload Photo</label>
                        <button type="button" onClick={handlePFPDelete}>Delete</button>
                    </div>
                </div>

                <div>
                    <div>
                        <h1>First Name</h1>
                        <input type="text" value={data.user_first_name} onChange={e => setData('user_first_name', e.target.value)} />
                        {errors.user_first_name && <p>{errors.user_first_name}</p>}
                    </div>

                    <div>
                        <h1>Last Name</h1>
                        <input type="text" value={data.user_last_name} onChange={e => setData('user_last_name', e.target.value)} />
                        {errors.user_last_name && <p>{errors.user_last_name}</p>}
                    </div>

                    <div>
                        <h1>Role</h1>
                        <input type="text" value={auth.user.role ?? ''} disabled />
                    </div>

                    <div>
                        <h1>Email</h1>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                </div>

                <button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </ProfileLayout>
    );
}