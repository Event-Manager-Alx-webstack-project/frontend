import React, { useState, useEffect } from 'react';

const ProfileSettings = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State to store the uploaded image file
  const [profilePicture, setProfilePicture] = useState(null); // State to store the Base64 profile picture

  useEffect(() => {
    // Load the profile picture from localStorage when the component mounts
    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  // Function to handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      convertToBase64(file);
    }
  };

  // Convert the image file to Base64 and store it in localStorage
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfilePicture(base64String); // Set the Base64 image string in the state
      localStorage.setItem('profilePicture', base64String); // Save it in localStorage
    };
    reader.readAsDataURL(file);
  };

  // Function to handle the form submission (just for uploading the picture)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      // Profile picture is already stored in localStorage by convertToBase64 function
      alert('Profile picture uploaded successfully!');
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      
      {/* Display profile picture */}
      <div className="profile-picture">
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full" />
        ) : (
          <p>No profile picture uploaded</p>
        )}
      </div>

      {/* Upload form */}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload Picture</button>
      </form>
    </div>
  );
};

export default ProfileSettings;