import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from '../pages/HomePage';
import DiscoverEvents from '../pages/events/DiscoverEvents';
import CreateEvent from '../pages/events/CreateEvents';
import LoginPage from '../pages/Auth/login';
import SignUpPage from '../pages/Auth/signup';
import ForgotPage from '../pages/Auth/forgotPassword';
import ProfileSettings from '../pages/profileSettings';
import OrganizerDashboard from "../pages/Dashboard/OrganizerDashboard";
import AttendeeDashboard from "../pages/Dashboard/AttendeeDashboard";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events/discover" element={<DiscoverEvents />} />
                <Route path="/events/create" element={<CreateEvent />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPage />} />
                <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
                <Route path="/dashboard" element={<AttendeeDashboard />} />
                <Route path="/profile-settings" element={<ProfileSettings />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;