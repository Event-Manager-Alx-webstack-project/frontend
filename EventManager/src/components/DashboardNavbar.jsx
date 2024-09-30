const DashboardNavbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li><NavLink to="/profile-settings">Profile Settings</NavLink></li>
                <li><NavLink to="/create-event">Create a New Event</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
            </ul>
        </nav>
    );
};
export default DashboardNavbar;