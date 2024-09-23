import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EventCard from "../EventCard";
import { getUpcomingEvents } from "../../api/eventsApi"; 

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        
        // Fetch events from an API
        getUpcomingEvents()
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data); // Initially show all events
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load events");
                setLoading(false);
            });
    }, []);

    // Filter events based on the selected category
    const filterEvents = (category) => {
        setActiveFilter(category);
        if (category === "All") {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(event => event.category === category);
            setFilteredEvents(filtered);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800" data-aos="fade-up">
                    Upcoming Public <span className="text-yellow-600">Events</span>
                </h2>
                <p className="text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">
                    Discover All Upcoming Lagos Events. Upcoming Events in your location.
                </p>

                <div className="flex justify-center space-x-4 mb-12" data-aos="fade-up" data-aos-delay="200">
                    <button 
                        onClick={() => filterEvents("All")} 
                        className={`px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring focus:ring-yellow-400 
                        ${activeFilter === "All" ? "bg-yellow-500 text-black" : "bg-gray-200 text-gray-800"}`}>
                        All
                    </button>
                    <button 
                        onClick={() => filterEvents("Concerts")} 
                        className={`px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring focus:ring-yellow-400 
                        ${activeFilter === "Concerts" ? "bg-yellow-500 text-black" : "bg-gray-200 text-gray-800"}`}>
                        Concerts
                    </button>
                    <button 
                        onClick={() => filterEvents("Conferences")} 
                        className={`px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring focus:ring-yellow-400 
                        ${activeFilter === "Conferences" ? "bg-yellow-500 text-black" : "bg-gray-200 text-gray-800"}`}>
                        Conferences
                    </button>
                    <button 
                        onClick={() => filterEvents("Workshops")} 
                        className={`px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring focus:ring-yellow-400 
                        ${activeFilter === "Workshops" ? "bg-yellow-500 text-black" : "bg-gray-200 text-gray-800"}`}>
                        Workshops
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredEvents.map(event => (
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
            </div>
        </section>
    );
};

export default UpcomingEvents;