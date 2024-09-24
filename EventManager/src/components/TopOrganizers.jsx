import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const TopOrganizers = ({ organizers = [] }) => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Function to render star ratings
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => 
            index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
        );
    };

    return (
        <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">
                    Top <span className="text-yellow-500">Organizers</span>
                </h2>
                {organizers.length > 0 ? (
                    <div className="relative flex space-x-8 overflow-x-auto snap-x scrollbar-hide" data-aos="fade-up" data-aos-delay="100">
                        {organizers.map((organizer, index) => (
                            <div key={index} className="flex-shrink-0 bg-gray-800 rounded-lg shadow-lg p-6 mx-2 transform hover:scale-105 transition duration-300 ease-in-out snap-center">
                                <img src={organizer.image || '/path/to/placeholder.jpg'} alt={organizer.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{organizer.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">{organizer.description}</p>
                                <div className="flex justify-center space-x-1 text-yellow-400">
                                    {renderStars(organizer.rating)} {/* Ensure rating is a number between 0 and 5 */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-400">No organizers found.</p>
                )}
            </div>
        </section>
    );
};

export default TopOrganizers;