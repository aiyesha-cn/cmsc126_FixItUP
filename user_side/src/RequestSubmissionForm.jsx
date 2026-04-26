import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestSubmissionForm.css';

const categories = ['Facility', 'Appliance', 'Equipment', 'Flooring', 'Other'];

const RequestSubmissionForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    issue_category: categories[0], 
    location_id: '', 
    room_details: '',
    issue_description: '',
    image_proof: null,
  });

  // Placeholder locations 
  const locations = [
    { location_id: 1, name: 'CSM' },
    { location_id: 2, name: 'CHSS' },
    { location_id: 3, name: 'Atrium' },
    { location_id: 4, name: 'DHK' },
    { location_id: 5, name: 'SOM' },
    { location_id: 6, name: 'Sports Complex' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image_proof: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestPayload = {
        user_id: 1, // Simulate logged-in user
        location_id: formData.location_id,
        issue_category: formData.issue_category,
        issue_description: formData.issue_description
        // Image upload requires a more complex setup, so text for now
    };

    try {
        const response = await fetch('http://localhost:5000/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
        });

        if (response.ok) {
            alert('Maintenance Request successfully submitted!');
            navigate('/'); // Redirect back to the dashboard to see the new entry
        } else {
            alert('Error submitting request. Check console.');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
  };

  return (
    <div className="submission-container">
      <h2 className="submission-title">Maintenance Request Submission</h2>
      <form className="submission-form" onSubmit={handleSubmit}>
        <div className="form-sections">
          <div className="form-fields">
            <div className="form-group">
              <label>Issue Category</label>
              <select name="issue_category" value={formData.issue_category} onChange={handleInputChange}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <select name="location_id" value={formData.location_id} onChange={handleInputChange} required>
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Room Details</label>
              <input type="text" name="room_details" value={formData.room_details} onChange={handleInputChange} placeholder="e.g., Room 203, near elevator"/>
            </div>
            <div className="form-group">
              <label>Issue Description</label>
              <textarea name="issue_description" value={formData.issue_description} onChange={handleInputChange} rows="4" placeholder="Provide details about the issue..." required/>
            </div>
          </div>
          <div className="form-image-upload">
            <div className="pg-icon-box">
              <div className="pg-icon-placeholder"></div>
              <div className="pg-text">PG</div>
            </div>
            <div className="upload-link-container">
              <label htmlFor="file-upload" className="upload-link">Upload image</label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
              {formData.image_proof && <p className="file-name">{formData.image_proof.name}</p>}
            </div>
          </div>
        </div>
        <div className="form-submit-container">
          <button type="submit" className="submit-button-form">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RequestSubmissionForm;