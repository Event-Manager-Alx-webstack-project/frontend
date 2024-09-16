import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAccount from './UserAccount';
import Account from './Account';

const App = () => {
  const [userData, setUserData] = useState(null);

console.log('Current userData:', userData); // Log userData to track changes  
return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserAccount setUserData={setUserData} />} />
          <Route path="/account" element={userData ? <Account userData={userData} /> : <div>Please fill out the form first.</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
