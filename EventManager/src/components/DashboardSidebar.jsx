import { NavLink } from 'react-router-dom';

const DashboardSidebar = ({ users }) => {
    return (
        <aside className="w-64 bg-black text-white h-screen p-6">
            <h2 className="text-2xl font-bold mb-6">{users} Dashboard</h2>
            <nav>
                <>
                    <NavLink 
                        to="/dashboard/profile-settings" 
                        className={({ isActive }) => 
                            `block py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        Profile Settings
                    </NavLink>
                    <NavLink 
                        to="/dashboard/create-event" 
                        className={({ isActive }) => 
                            `block py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        Create Event
                    </NavLink>
                    <NavLink 
                        to="/dashboard/manage-events" 
                        className={({ isActive }) => 
                            `block py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        Manage Events
                    </NavLink>
                    <NavLink 
                        to="/dashboard/promote-events" 
                        className={({ isActive }) => 
                            `block py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        Promote Events
                    </NavLink>
                    <NavLink 
                        to="/dashboard/my-events" 
                        className={({ isActive }) => 
                            `block py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        Registered Events
                    </NavLink>
                    <NavLink 
                        to="/dashboard/tickets" 
                        className={({ isActive }) => 
                            `block py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        My Tickets
                    </NavLink>
                </>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;