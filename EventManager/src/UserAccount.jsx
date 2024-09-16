import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Avatar, Typography, Container } from '@mui/material';

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
        // Log form data before setting userData
        console.log('Form submitted:', {
          name,
          username,
          bio,
          profilePicture,
          followingCount,
          followerCount,
        });

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
  <Container maxWidth="sm">
    <Typography variant="h4" gutterBottom>User Account</Typography>
    <form onSubmit={handleSubmit}>
      <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <TextField label="Bio" fullWidth margin="normal" multiline rows={4} value={bio} onChange={(e) => setBio(e.target.value)} required />
      <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
      {profilePicture && <Avatar src={profilePicture} alt="Profile Preview" sx={{ width: 100, height: 100, marginTop: 2 }} />}
        <Button type="submit" variant="contained" color="primary" fullWidth>Save</Button>
      </form>
    </Container>
  );
};

export default UserAccount;
