import React, { useState, useMemo } from 'react';
// 1. REMOVED: import { useNavigate } from 'react-router-dom';
import { router } from '@inertiajs/react';
import DashboardHeader from '@/Components/DashboardHeader';

const categories = ['Facility', 'Appliance', 'Equipment', 'Flooring', 'Other'];

const RequestSubmission = () => {
  // 2. REMOVED: const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    issue_category: categories[0],
    location_id: '',
    room_details: '',
    issue_description: '',
    image_proof: null,
  });

  const locations = [
    { location_id: 1, name: 'CSM' },
    { location_id: 2, name: 'CHSS' },
    { location_id: 3, name: 'Atrium' },
    { location_id: 4, name: 'DHK' },
    { location_id: 5, name: 'SOM' },
    { location_id: 6, name: 'Sports Complex' },
  ];

  const previewUrl = useMemo(() => {
    return formData.image_proof ? URL.createObjectURL(formData.image_proof) : null;
  }, [formData.image_proof]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image_proof: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 3. UPDATED: Using Inertia router.post instead of fetch for Laravel compatibility
    router.post('/api/requests', {
      user_id: 1,
      location_id: formData.location_id,
      issue_category: formData.issue_category,
      issue_description: formData.issue_description,
      // If your backend handles file uploads, you can include the file here:
      // image: formData.image_proof 
    }, {
      onSuccess: () => alert('Maintenance Request successfully submitted!'),
      onError: () => alert('Error submitting request.'),
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

        <form 
          className="bg-white p-6 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-[1000px] mx-auto" 
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Issue Category</label>
                <select 
                  name="issue_category" 
                  value={formData.issue_category} 
                  onChange={handleInputChange}
                  className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Location</label>
                <select 
                  name="location_id" 
                  value={formData.location_id} 
                  onChange={handleInputChange} 
                  required
                  className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                >
                  <option value="">Select Building/Area</option>
                  {locations.map((loc) => (
                    <option key={loc.location_id} value={loc.location_id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Room / Specific Area</label>
                <input 
                  type="text" 
                  name="room_details" 
                  value={formData.room_details} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Room 203"
                  className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Issue Description</label>
                <textarea 
                  name="issue_description" 
                  value={formData.issue_description} 
                  onChange={handleInputChange} 
                  rows="4" 
                  placeholder="Describe the problem..." 
                  required
                  className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                />
              </div>
            </div>

            <div className="w-full lg:w-[320px] flex flex-col items-center">
              <label className="text-sm font-semibold text-slate-600 mb-4">Photo Evidence</label>
              <div className="relative w-full aspect-square max-w-[280px] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden hover:border-amber-500 transition-all">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-slate-400">No image selected</div>
                )}
              </div>
              <div className="mt-6 w-full flex flex-col items-center">
                <label htmlFor="file-upload" className="w-full text-center text-sm font-bold text-slate-700 bg-white px-6 py-3 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                  Upload Image
                </label>
                <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t border-slate-100">
             <button 
              type="button"
              // 4. UPDATED: Using router.visit for navigation
              onClick={() => router.visit('/')}
              className="w-full sm:w-auto px-10 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-[#001219] hover:bg-amber-500 text-white px-16 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestSubmission;