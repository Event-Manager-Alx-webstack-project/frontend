import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAccount = ({ setUserData }) => {
  const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [followingCount, setFollowingCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProfilePicture(URL.createObjectURL(file));
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        // Set user data in the parent component
        setUserData({
          name,
          username,
          bio,
          profilePicture,
          followingCount,
          followerCount,
        });
        // Navigate to the Account section
        navigate('/account');
      };

      return (
        <div className="user-account">
          <h2>User Account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserAccount;
