import { useState } from 'react';
import InputField from '../../components/Auth/InputField';
import AuthButton from '../../components/Auth/Button';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/tailwind.css';
import { registerUser } from '../../api/authApi';

// Utility function for email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Utility function for password strength validation
const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
};

const Signup = () => {
    const [username, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Field validation checks
    const validateFields = () => {
        const errors = {};

        if (!username) errors.username = "Username is required.";
        if (!firstName) errors.firstName = "First name is required.";
        if (!lastName) errors.lastName = "Last name is required.";

        if (!email) {
            errors.email = "Email is required.";
        } else if (!isValidEmail(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!password) {
            errors.password = "Password is required.";
        } else if (!isStrongPassword(password)) {
            errors.password = "Password must be at least 8 characters long, include at least one letter, one number, and one special character.";
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        console.log(username);
        e.preventDefault();
        setError('');
        setFieldErrors({});

        const errors = validateFields();

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser({
                username,
                firstName,
                lastName,
                email,
                password
            });
            console.log('Registration successful:', data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Registration failed. Please check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-400 to-yellow-300">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-orange-600">EventMeet</h1>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-orange-600">Login!</Link>
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <InputField
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {fieldErrors.username && <p className="text-red-500 text-sm">{fieldErrors.username}</p>}
                    
                    <InputField
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}
                    
                    <InputField
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}
                    
                    <InputField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                    
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
                    
                    <InputField
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>}
                    
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <AuthButton type="submit" text={loading ? "Signing up..." : "Sign Up"} disabled={loading} />
                    <div className="flex items-center justify-center mt-4">
                        <AuthButton text="Sign up with Google" isGoogle onClick={() => console.log('Google signup')} disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
