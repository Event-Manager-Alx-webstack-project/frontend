import { useNavigate } from 'react-router-dom';

const handleLogout = () => {
    // Remove auth token from localStorage
    localStorage.removeItem('authToken');
    
    // Optionally remove other user data from localStorage if stored
    // localStorage.removeItem('userData');

    // Redirect to login page
    navigate('/login');
};

// Example button to trigger logout
<button onClick={handleLogout} className="text-red-500">
    Logout
</button>
