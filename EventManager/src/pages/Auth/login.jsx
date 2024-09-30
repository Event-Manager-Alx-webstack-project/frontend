import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthButton from '../../components/Auth/Button';
import { loginUser, storeAuthToken } from '../../api/authApi';
import '../../assets/styles/tailwind.css';
import InputField from '../../components/Auth/InputField';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailInputChange = (e) => setEmail(e.target.value);
    const handlePasswordInputChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const credentials = base64_encode(email+':'+password);
        

        try {
            const response = await loginUser(credentials);
            if (response) {
                // console.log(response);
                storeAuthToken(JSON.stringify(response.token));
                // localStorage.setItem('authToken', response);

                // Check user role and navigate accordingly
                //const userRole = response.role; // Ensure your API returns this
                //if (userRole === 'organizer') {
                    navigate('/organizer-dashboard'); // Redirect to organizer dashboard
                //} else {
                  //  navigate('/attendee-dashboard'); // Redirect to attendee dashboard
               // }
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
                        placeholder="Email"
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
                    <AuthButton type="submit" text={loading ? "Logging in..." : "Login now"} disabled={loading} />
                    <div className="flex items-center justify-center mt-4">
                        <AuthButton text="Login with Google" isGoogle />
                    </div>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    <Link to="/organizer-dashboard" className="text-gray-600">Forgot password? <span className="text-orange-600">Click here!</span></Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
