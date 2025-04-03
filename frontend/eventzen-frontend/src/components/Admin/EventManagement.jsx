import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    venueId: '',
    price: ''
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    fetchVenues();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchVenues = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/venues', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (editingId) {
        await axios.put(`http://localhost:8081/api/events/${editingId}`, newEvent, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8081/api/events', newEvent, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setNewEvent({
        name: '',
        description: '',
        date: '',
        venueId: '',
        price: ''
      });
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (event) => {
    setNewEvent({
      name: event.name,
      description: event.description,
      date: event.date,
      venueId: event.venue?.id || '',
      price: event.price
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getVenueName = (venueId) => {
    const venue = venues.find(v => v.id === venueId);
    return venue ? venue.name : 'Unknown Venue';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4">Event Management</h2>
  
  <button
    className="mb-4 py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 flex items-center"
    onClick={() => setNewEvent({
      name: '',
      description: '',
      date: '',
      venueId: '',
      price: ''
    })}
  >
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
    Add Event
  </button>
  
  <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-pink-100">
    <div className="md:col-span-2">
      <label className="block text-pink-700 text-sm font-medium mb-1">Event Name</label>
      <input
        type="text"
        name="name"
        value={newEvent.name}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-2">
      <label className="block text-pink-700 text-sm font-medium mb-1">Description</label>
      <textarea
        name="description"
        value={newEvent.description}
        onChange={handleInputChange}
        required
        rows="3"
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-1">Date</label>
      <input
        type="datetime-local"
        name="date"
        value={newEvent.date}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-1">Venue</label>
      <select
        name="venueId"
        value={newEvent.venueId}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white"
      >
        <option value="">Select a venue</option>
        {venues.map(venue => (
          <option key={venue.id} value={venue.id}>{venue.name}</option>
        ))}
      </select>
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-1">Price ($)</label>
      <input
        type="number"
        name="price"
        value={newEvent.price}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-2">
      <button type="submit" className="py-2 px-6 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors duration-300">
        {editingId ? 'Update Event' : 'Add Event'}
      </button>
    </div>
  </form>
  
  <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-pink-100 mb-4">
    <table className="min-w-full divide-y divide-pink-100">
      <thead className="bg-pink-100">
        <tr>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">ID</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Event Name</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Description</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Date</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Venue</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Price</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-pink-100">
        {events.map(event => (
          <tr key={event.id} className="hover:bg-pink-50">
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">{event.id}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-pink-800">{event.name}</td>
            <td className="px-4 py-3 text-sm text-pink-600 max-w-xs truncate">{event.description}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">{new Date(event.date).toLocaleString()}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">{getVenueName(event.venue?.id)}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">${event.price}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
              <button 
                onClick={() => handleEdit(event)} 
                className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(event.id)} 
                className="text-red-400 hover:text-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default EventManagement;