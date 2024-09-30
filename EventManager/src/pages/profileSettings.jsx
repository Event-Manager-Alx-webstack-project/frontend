import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserProfile, updateUserProfile } from '../api/authApi';

const ProfileSettings = () => {
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load current user profile (bio and profile pic) when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await axios.get('/api/users/profile');
        const response = getUserProfile();
        console.log(response);
        setBio(response.data.bio);
        setPreviewPic(response.data.profilePic);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile information.");
      }
    };
    fetchProfile();
  }, []);

  // Handle success message timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000); // Hide success message after 3 seconds
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [success]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    // Validate file type (e.g., only images)
    if (file && !file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    // Validate file size (e.g., 2MB limit)
    if (file && file.size > 2 * 1024 * 1024) {
      setError('File size should not exceed 2MB.');
      return;
    }
    setProfilePic(file);
    setPreviewPic(URL.createObjectURL(file)); // Show preview of the uploaded image
    setError(''); // Clear previous error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Upload profile picture if there's a new one
      let profilePicUrl = previewPic;
      if (profilePic) {
        const formData = new FormData();
        formData.append('avatar', profilePic);
        const uploadResponse = await axios.post('/api/upload-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        profilePicUrl = uploadResponse.data.url;
      }

      // Save the bio and updated profile pic URL
      // await axios.put('/api/users/profile', {
      //   bio,
      //   profilePic: profilePicUrl,
      // });
      await updateUserProfile({bio, profilePicUrl});

      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Error updating profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={bio}
            onChange={handleBioChange}
            rows="4"
          />
        </div>
        <div>
          <label className="block font-medium">Profile Picture</label>
          <input type="file" onChange={handleProfilePicChange} />
          {previewPic && (
            <img
              src={previewPic}
              alt="Profile Preview"
              className="mt-4 w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-white mr-2"></span>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;