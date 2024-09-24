import { useEffect, useState } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import EventCard from '../../components/EventCard';
import PromoteEventCard from '../../components/PromoteEventCard';

const OrganizerDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const organizerId = "organizer-id"; // Replace with the real organizer ID

        getOrganizerEvents(organizerId)
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to fetch events");
                setLoading(false);
            });
    }, []);

    const handlePromote = (eventId) => {
        promoteEvent(eventId)
            .then(() => alert('Event promoted successfully!'))
            .catch(() => alert('Failed to promote event'));
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>{error}</div>; // Error handling
    }

    return (
        <div className="flex">
            <DashboardSidebar user="Organizer" />
            <div className="flex-1 p-6">
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
                                    title={event.title}
                                    date={event.date}
                                    location={event.location}
                                    description={event.description}
                                    thumbnail={event.thumbnail}
                                    price={event.price}
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
