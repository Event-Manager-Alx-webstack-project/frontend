import React, { useState } from 'react';
import { Avatar, Typography, Container, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Account = ({ userData }) => {
    const navigate = useNavigate();
    console.log('Received userData in Account:', userData);
  
    // Check if userData is null or undefined
    if (!userData) {
      return <Typography variant="h6">No user data available.</Typography>;
    }
    const [profilePicture, setProfilePicture] = useState(userData.profilePicture || null); // Initialize with userData.profilePicture

/**const Account = ({ userData }) => {
    const [profilePicture, setProfilePicture] = useState(userData.profilePicture);*/
  
    const handleProfilePictureChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setProfilePicture(URL.createObjectURL(file));
      }
    };

// Define categories
const categories = [
    'Religious',
    'Social',
    'Festivals',
    'Parties',
    'Online Webinars',
    'Educational'
  ];

return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Account Section</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <label htmlFor="profile-picture-upload">
            <Avatar
              src={profilePicture}
              alt="Profile"
              sx={{ width: 100, height: 100, cursor: 'pointer' }}
            />
          </label>
          <input
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }} // Hide the default file input
            onChange={handleProfilePictureChange}
          />
          <Typography variant="h5" noWrap>{userData.name}</Typography>
          <Typography variant="body1">{userData.bio}</Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h6" noWrap>{userData.username}</Typography>
          <Typography variant="body2">Following: {userData.followingCount}</Typography>
          <Typography variant="body2">Followers: {userData.followerCount}</Typography>
        </Box>
      </Box>

      {/* Categories Section */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>Event Categories</Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <Typography variant="h6">{category}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Account;
