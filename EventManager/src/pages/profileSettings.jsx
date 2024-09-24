import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load current user profile (bio and profile pic) when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        setBio(response.data.bio);
        setPreviewPic(response.data.profilePic);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreviewPic(URL.createObjectURL(file)); // Show preview of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      await axios.put('/api/users/profile', {
        bio,
        profilePic: profilePicUrl,
      });

      alert('Profile updated successfully!');
    } catch (err) {
      setError('Error updating profile');
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
              className="mt-4 w-32 h-32 rounded-full"
            />
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;