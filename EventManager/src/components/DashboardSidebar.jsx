import { NavLink } from 'react-router-dom';

const DashboardSidebar = ({ role }) => {
    return (
        <aside className="w-64 bg-black text-white h-screen p-6">
            <h2 className="text-2xl font-bold mb-6">{role} Dashboard</h2>
            <nav>
                {role === 'Organizer' ? (
                    <>
                        <NavLink to="/dashboard/profile-settings" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">Profile Settings</NavLink>
                        <NavLink to="/dashboard/create-event" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">Create Event</NavLink>
                        <NavLink to="/dashboard/manage-events" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">Manage Events</NavLink>
                        <NavLink to="/dashboard/assigned-events" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">Assigned Events</NavLink>
                        <NavLink to="/dashboard/promote-events" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">Promote Events</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/dashboard/profile-settings" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">Profile Settings</NavLink>
                        <NavLink to="/dashboard/progress-events" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">My Event Progress</NavLink>
                        <NavLink to="/dashboard/my-events" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">My Registered Events</NavLink>
                        <NavLink to="/dashboard/tickets" className="block py-2 px-4 rounded hover:bg-gray-700" activeClassName="bg-gray-700">My Tickets</NavLink>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default DashboardSidebar;
