import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaHeart, FaShareAlt, FaCommentAlt, FaUserPlus } from 'react-icons/fa';

const EventCard = ({ id, title, date, location, description, thumbnail, price, onLike, onFollow, onComment, onShare }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState('');
    
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
        onLike(id); // Call the backend to register the like
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        onComment(id, comment);
        setComment(''); // Clear the comment box after submission
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <div className="relative">
                {thumbnail ? (
                    <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image Available</span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                <div className="text-sm text-gray-600 mb-4">
                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="text-yellow-600 mr-2" />
                        {new Date(date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                        {location}
                    </div>
                    {price !== 0 && (
                        <div className="flex items-center mb-2">
                            <FaDollarSign className="text-yellow-600 mr-2" />
                            <span>{price}</span>
                        </div>
                    )}
                </div>
                <p className="text-gray-700 mb-4">{description}</p>
                
                {/* Interaction Buttons */}
                <div className="flex space-x-4 mb-4">
                    <button onClick={handleLike} className={`flex items-center ${isLiked ? 'text-red-600' : 'text-gray-600'} focus:outline-none`}>
                        <FaHeart className="mr-1" /> {likes}
                    </button>
                    <button onClick={() => onFollow(id)} className="flex items-center text-gray-600 focus:outline-none">
                        <FaUserPlus className="mr-1" /> Follow
                    </button>
                    <button onClick={() => onShare(id)} className="flex items-center text-gray-600 focus:outline-none">
                        <FaShareAlt className="mr-1" /> Share
                    </button>
                    <button className="flex items-center text-gray-600 focus:outline-none">
                        <FaCommentAlt className="mr-1" /> Comment
                    </button>
                </div>
                
                {/* Comment Section */}
                <form onSubmit={handleCommentSubmit} className="mb-4">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition-colors">
                        Post Comment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventCard;