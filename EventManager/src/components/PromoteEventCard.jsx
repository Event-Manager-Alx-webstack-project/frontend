import { useState } from 'react';

const PromoteEventCard = ({ title, date, promoteAction }) => {
    const [loading, setLoading] = useState(false);

    const handlePromote = async () => {
        setLoading(true);
        await promoteAction();  // Assuming it's a promise-based action
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 mb-2">
                {new Date(date).toLocaleDateString()} {/* Date formatting */}
            </p>
            <button
                onClick={handlePromote}
                className={`bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'}`}
                disabled={loading}  // Disable the button when loading
            >
                {loading ? 'Promoting...' : 'Promote Event'}
            </button>
        </div>
    );
};

export default PromoteEventCard;
