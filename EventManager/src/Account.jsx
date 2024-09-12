import React from 'react';

const Account = ({ userData }) => {
  return (
    <div className="account">
      <h2>Account Section</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <img
            src={userData.profilePicture}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <h3>{userData.name}</h3>
          <p>{userData.bio}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h4>{userData.username}</h4>
          <p>Following: {userData.followingCount}</p>
          <p>Followers: {userData.followerCount}</p>
        </div>
      </div>
      </div>
  );
};

export default Account;
