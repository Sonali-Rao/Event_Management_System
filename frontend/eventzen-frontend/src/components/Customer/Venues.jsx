import { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../Shared/EventCard';

function Venues() {
  const [venues, setVenues] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');

  useEffect(() => {
    fetchVenues();
  }, [locationFilter, capacityFilter]);

  const fetchVenues = async () => {
    try {
      let url = 'http://localhost:8081/api/customer/venues';
      const params = new URLSearchParams();
      
      if (locationFilter) params.append('location', locationFilter);
      if (capacityFilter) params.append('minCapacity', capacityFilter);
      
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await axios.get(url);
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-pink-50 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-pink-800">Available Venues</h2>
  
  <div className="flex flex-col md:flex-row gap-4 mb-8">
    <div className="flex-1">
      <label className="block mb-2 font-medium text-pink-700">Location:</label>
      <input
        type="text"
        placeholder="Filter by location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="w-full p-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
      />
    </div>
    
    <div className="flex-1">
      <label className="block mb-2 font-medium text-pink-700">Minimum Capacity:</label>
      <input
        type="number"
        placeholder="Filter by capacity"
        value={capacityFilter}
        onChange={(e) => setCapacityFilter(e.target.value)}
        className="w-full p-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
      />
    </div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {venues.map(venue => (
      <EventCard 
        key={venue.id}
        title={venue.name}
        date={venue.location}
        venue={`Capacity: ${venue.capacity}`}
        price="View Details"
        onViewDetails={() => console.log('View details:', venue.id)}
      />
    ))}
  </div>
</div>
  );
}

export default Venues;