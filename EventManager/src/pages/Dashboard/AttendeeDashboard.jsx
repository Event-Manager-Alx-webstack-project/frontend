import { useEffect, useState } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import EventCard from '../../components/EventCard';
import { getEventsByUser } from '../../api/eventsApi'; // Assuming this API fetches the user's registered events

const AttendeeDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with the real user ID, maybe from the authenticated user's data
        const userId = "user-id"; 

        getEventsByUser(userId)
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to fetch events");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>{error}</div>; // Error handling
    }

    return (
        <div className="flex">
            <DashboardSidebar role="Attendee" />
            <div className="flex-1 p-6">
                <DashboardHeader title="My Events" />
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                date={event.date}
                                location={event.location}
                                description={event.description}
                                thumbnail={event.thumbnail}
                                price={event.price}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No events found. You haven't registered for any events yet.</p>
                )}
            </div>
        </div>
    );
};

export default AttendeeDashboard;
