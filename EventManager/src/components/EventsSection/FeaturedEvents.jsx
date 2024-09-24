import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EventCard from "../EventCard";
import { getFeaturedEvents } from "../../api/eventsApi"; // Assuming API call to get featured events

const FeaturedEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        
        getFeaturedEvents()
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load featured events");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator
    }

    if (error) {
        return <div>{error}</div>; // Show an error message
    }

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800" data-aos="fade-up">
                    Featured <span className="text-yellow-600">Events</span>
                </h2>
                <div className="flex justify-center items-center mb-12">
                    <hr className="w-16 border-b-2 border-gray-300" />
                    <span className="mx-4 text-2xl">&#128081;</span> {/* Crown Emoji */}
                    <hr className="w-16 border-b-2 border-gray-300" />
                </div>
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <p>No featured events available at this time.</p>
                )}
            </div>
        </section>
    );
};

export default FeaturedEvents;
