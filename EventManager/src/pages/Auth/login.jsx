import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../../components/Auth/Button';
import { Link } from 'react-router-dom';
import { loginUser, storeAuthToken } from '../../api/authApi';
import '../../assets/styles/tailwind.css';
import InputField from '../../components/Auth/InputField';

const Login = () => {
    const [email, setEmail] = useState(''); // Renamed to email for consistency
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailInputChange = (e) => setEmail(e.target.value);

    const handlePasswordInputChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous errors

        try {
            const response = await loginUser(email, password);
            if (response.message === "Login successful") {
                storeAuthToken(response.token); // Store auth token
                localStorage.setItem('authToken', response.token); // Save token in local storage
                navigate('/'); // Redirect to home page or dashboard
            } else {
                setError(response.message); // Show error if login fails
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please check your email and password and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-400 to-yellow-300">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-orange-600">EventMeet</h1>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don&apos;t have an account? <Link to="/signup" className="text-orange-600">Create a new account now!</Link>
                </p>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        placeholder="Email/Username"
                        value={email}
                        onChange={handleEmailInputChange}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordInputChange}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <AuthButton text={loading ? "Logging in..." : "Login now"} disabled={loading} />
                    <div className="flex items-center justify-center mt-4">
                        <AuthButton text="Login with Google" isGoogle />
                    </div>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    <Link to="/forgot-password" className="text-gray-600">Forgot password? <span className="text-orange-600">Click here!</span></Link>
                </p>
            </div>
        </div>
    );
};

export default Login;