import { useState, useEffect } from 'react';
import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import EventCard from '../../components/EventCard';
import PromoteEventCard from '../../components/PromoteEventCard';
import ProfilePicture from '../../components/ProfilePicture'; // Import the new component
import '../../assets/styles/tailwind.css';

const OrganizerDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const organizerId = "organizer-id"; // Replace with the real organizer ID

        getEvents(organizerId)
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to fetch events");
                setLoading(false);
            });
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="relative flex h-screen">
            {/* Toggle Button */}
            <button
                className="p-4 text-white bg-orange-500 fixed top-0 left-0 z-50"
                onClick={toggleSidebar}
            >
                {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>

            {/* Overlay when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-black w-64`}>
                <DashboardSidebar user="Organizer" />
            </div>

            {/* Main content */}
            <div className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                
                {/* Navbar with Profile Picture */}
                <div className="flex justify-between items-center mb-4">
                    <DashboardNavbar />
                    <ProfilePicture /> {/* Profile picture space */}
                </div>

                {/* Header */}
                <DashboardHeader title="Manage Your Events" />
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            event.isPromotable ? (
                                <PromoteEventCard
                                    key={event.id}
                                    title={event.title}
                                    date={event.date}
                                    promoteAction={() => handlePromote(event.id)}
                                />
                            ) : (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    title={event.title}
                                    date={event.date}
                                    location={event.location}
                                    description={event.description}
                                    thumbnail={event.thumbnail}
                                    price={event.price}
                                    onLike={handleLike}
                                    onFollow={handleFollow}
                                    onComment={handleComment}
                                    onShare={handleShare}
                                    onRegister={handleRegister}
                                />

                                
                            )
                        ))}
                    </div>
                ) : (
                    <p>No events found. Start organizing some events!</p>
                )}
            </div>
        </div>
    );
};

export default OrganizerDashboard;