import { useState } from 'react';

const ProfilePicture = () => {
    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result); // Set the uploaded image
            };
            reader.readAsDataURL(file); // Convert the file to a base64 URL
        }
    };

    return (
        <div className="relative">
            <label className="flex items-center cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <div className="w-12 h-12 rounded-full border-2 border-orange-500 overflow-hidden flex items-center justify-center bg-gray-200">
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400">Upload</span>
                    )}
                </div>
            </label>
        </div>
    );
};

export default ProfilePicture;
