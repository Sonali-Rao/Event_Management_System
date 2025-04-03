import { useEffect, useState } from 'react';
import axios from 'axios';

function VendorManagement() {
  const [vendors, setVendors] = useState([]);
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);
  const [newVendor, setNewVendor] = useState({
    name: '',
    service: '',
    contact: '',
    venueId: '',
    eventIds: []
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVendors();
    fetchVenues();
    fetchEvents();
  }, []);

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/vendors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewVendor(prev => {
      const eventIds = [...prev.eventIds];
      if (checked) {
        eventIds.push(value);
      } else {
        const index = eventIds.indexOf(value);
        if (index > -1) {
          eventIds.splice(index, 1);
        }
      }
      return { ...prev, eventIds };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (editingId) {
        await axios.put(`http://localhost:8081/api/vendors/${editingId}`, newVendor, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8081/api/vendors', newVendor, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setNewVendor({
        name: '',
        service: '',
        contact: '',
        venueId: '',
        eventIds: []
      });
      setEditingId(null);
      fetchVendors();
    } catch (error) {
      console.error('Error saving vendor:', error);
    }
  };

  const handleEdit = (vendor) => {
    setNewVendor({
      name: vendor.name,
      service: vendor.service,
      contact: vendor.contact,
      venueId: vendor.venue?.id || '',
      eventIds: vendor.events?.map(e => e.id) || []
    });
    setEditingId(vendor.id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/vendors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchVendors();
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const getVenueName = (venueId) => {
    const venue = venues.find(v => v.id === venueId);
    return venue ? venue.name : 'Unknown Venue';
  };

  const getEventNames = (vendorEvents) => {
    if (!vendorEvents) return 'None';
    return vendorEvents.map(e => e.name).join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-6">Vendor Management</h2>
  
  <button
    className="mb-6 py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 flex items-center"
    onClick={() => setNewVendor({
      name: '',
      service: '',
      contact: '',
      venueId: '',
      eventIds: []
    })}
  >
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
    Add Vendor
  </button>
  
  <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 border border-pink-100">
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-2">Vendor Name</label>
      <input
        type="text"
        name="name"
        value={newVendor.name}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-2">Service</label>
      <input
        type="text"
        name="service"
        value={newVendor.service}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-2">Contact</label>
      <input
        type="text"
        name="contact"
        value={newVendor.contact}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-2">Venue</label>
      <select
        name="venueId"
        value={newVendor.venueId}
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
    
    <div className="md:col-span-2">
      <label className="block text-pink-700 text-sm font-medium mb-2">Events</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 border border-pink-100 rounded-md bg-pink-50">
        {events.map(event => (
          <div key={event.id} className="flex items-center">
            <input
              type="checkbox"
              id={`event-${event.id}`}
              value={event.id}
              checked={newVendor.eventIds.includes(event.id)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-pink-300 rounded"
            />
            <label htmlFor={`event-${event.id}`} className="ml-2 text-pink-700 text-sm">{event.name}</label>
          </div>
        ))}
      </div>
    </div>
    
    <div className="md:col-span-2">
      <button type="submit" className="py-2 px-6 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors duration-300">
        {editingId ? 'Update Vendor' : 'Add Vendor'}
      </button>
    </div>
  </form>
  
  <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-pink-100">
    <table className="min-w-full divide-y divide-pink-100">
      <thead className="bg-pink-100">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">ID</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Vendor Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Service</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Contact</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Venue</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Events</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-pink-100">
        {vendors.map(vendor => (
          <tr key={vendor.id} className="hover:bg-pink-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-600">{vendor.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-800">{vendor.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-600">{vendor.service}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-600">{vendor.contact}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-600">{getVenueName(vendor.venue?.id)}</td>
            <td className="px-6 py-4 text-sm text-pink-600 max-w-xs truncate">{getEventNames(vendor.events)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
              <button 
                onClick={() => handleEdit(vendor)} 
                className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(vendor.id)} 
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

export default VendorManagement;