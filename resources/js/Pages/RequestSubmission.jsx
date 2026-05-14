import React, { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import DashboardHeader from '@/Components/DashboardHeader';

const CATEGORIES     = ['Facility', 'Appliance', 'Equipment', 'Flooring', 'Other'];
const LOCATION_NAMES = ['CSM', 'CHSS', 'Atrium', 'DHK', 'SOM', 'SportsComplex'];

const RequestSubmission = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        issue_category:       CATEGORIES[0],
        issue_name:           '',
        equipment_name:       '',
        location_name:        '',
        building_name:        '',
        room_details:         '',
        location_description: '',
        issue_description:    '',
        image_proof:          null,
    });

    // Generate object URL for image preview, revoked on change
    const previewUrl = useMemo(() => {
        return data.image_proof ? URL.createObjectURL(data.image_proof) : null;
    }, [data.image_proof]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/submit-request', {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <DashboardHeader />

            <div className="max-w-[1200px] mx-auto px-4 md:px-10">
                <header className="py-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Submit Maintenance Request</h2>
                    <p className="text-slate-500 mt-2">Please provide details about the issue you encountered.</p>
                </header>

                <form className="bg-white p-6 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-[1000px] mx-auto"
                    onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row justify-between gap-12">
                        <div className="flex-1 space-y-6">

                            {/* Issue name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Issue Name</label>
                                <input type="text" placeholder="e.g., Broken ceiling fan" required
                                    value={data.issue_name} onChange={e => setData('issue_name', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                                {errors.issue_name && <p className="text-red-500 text-xs">{errors.issue_name}</p>}
                            </div>

                            {/* Issue category */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Issue Category</label>
                                <select value={data.issue_category} onChange={e => setData('issue_category', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all">
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>

                            {/* Equipment name (optional) */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 ml-1">
                                    Equipment Name <span className="text-slate-400 font-normal">(optional)</span>
                                </label>
                                <input type="text" placeholder="e.g., Ceiling Fan, AC Unit"
                                    value={data.equipment_name} onChange={e => setData('equipment_name', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                            </div>

                            {/* Location fields */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Location</label>
                                <select value={data.location_name} required onChange={e => setData('location_name', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all">
                                    <option value="">Select Area / Building</option>
                                    {LOCATION_NAMES.map(l => <option key={l}>{l}</option>)}
                                </select>
                                {errors.location_name && <p className="text-red-500 text-xs">{errors.location_name}</p>}
                                <input type="text" placeholder="Building name (e.g., Building A) — optional"
                                    value={data.building_name} onChange={e => setData('building_name', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                                <input type="text" placeholder="Room / area (e.g., Room 206, Dean's Office) — optional"
                                    value={data.room_details} onChange={e => setData('room_details', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                                <input type="text" placeholder="Description (e.g., Left side of room, near elevator) — optional"
                                    value={data.location_description} onChange={e => setData('location_description', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                            </div>

                            {/* Issue description */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Issue Description</label>
                                <textarea rows="4" placeholder="Describe the problem in detail..." required
                                    value={data.issue_description} onChange={e => setData('issue_description', e.target.value)}
                                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none" />
                                {errors.issue_description && <p className="text-red-500 text-xs">{errors.issue_description}</p>}
                            </div>
                        </div>

                        {/* Image upload with preview */}
                        <div className="w-full lg:w-[320px] flex flex-col items-center">
                            <label className="text-sm font-semibold text-slate-600 mb-4">Photo Evidence</label>
                            <div className="relative w-full aspect-square max-w-[280px] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden hover:border-amber-500 transition-all">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-slate-400 text-sm px-4">
                                        <p className="text-2xl mb-2">📷</p>
                                        <p>No image selected</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 w-full flex flex-col items-center gap-2">
                                <label htmlFor="file-upload"
                                    className="w-full text-center text-sm font-bold text-slate-700 bg-white px-6 py-3 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                                    Upload Image
                                </label>
                                <input id="file-upload" type="file" accept="image/*" className="hidden"
                                    onChange={e => setData('image_proof', e.target.files[0])} />
                                {previewUrl && (
                                    <button type="button" onClick={() => setData('image_proof', null)}
                                        className="text-xs text-red-400 hover:text-red-600">
                                        Remove image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t border-slate-100">
                        <button type="button" onClick={() => window.history.back()}
                            className="w-full sm:w-auto bg-slate-200 hover:bg-red-500 hover:text-white text-slate-700 px-16 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 shadow-xl">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing}
                            className="w-full sm:w-auto bg-[#001219] hover:bg-amber-500 text-white px-16 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 shadow-xl disabled:opacity-50">
                            {processing ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestSubmission;