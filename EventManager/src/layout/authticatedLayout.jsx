import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticatedLayout = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
        } else {
            setLoading(false); // Stop loading once the token is confirmed
        }
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return <div>{children}</div>;
};

export default AuthenticatedLayout;
