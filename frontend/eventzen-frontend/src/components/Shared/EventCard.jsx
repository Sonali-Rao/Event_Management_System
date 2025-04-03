// src/components/Shared/EventCard.jsx
function EventCard({ title, date, venue, price, onViewDetails }) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 bg-gradient-to-r from-pink-300 to-pink-500">
        {/* Placeholder for event image */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
          {title.charAt(0)}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm font-medium text-pink-600 mb-1">{date}</p>
        <h3 className="text-xl font-bold text-pink-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-pink-600 mb-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {venue}
        </p>
        <p className="text-pink-800 font-semibold mt-2 mb-4">{price}</p>
        
        <div className="mt-auto">
          <button 
            onClick={onViewDetails} 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 transform hover:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
    );
  }
  
  export default EventCard;