import { useEffect, useState } from 'react';
import axios from 'axios';

function AttendeeManagement() {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [newAttendee, setNewAttendee] = useState({
    name: '',
    email: '',
    phone: '',
    eventIds: []
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAttendees();
    fetchEvents();
  }, []);

  const fetchAttendees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/attendees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
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
    setNewAttendee(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewAttendee(prev => {
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
        await axios.put(`http://localhost:8081/api/attendees/${editingId}`, newAttendee, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8081/api/attendees', newAttendee, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setNewAttendee({
        name: '',
        email: '',
        phone: '',
        eventIds: []
      });
      setEditingId(null);
      fetchAttendees();
    } catch (error) {
      console.error('Error saving attendee:', error);
    }
  };

  const handleEdit = (attendee) => {
    setNewAttendee({
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phone,
      eventIds: attendee.events?.map(e => e.id) || []
    });
    setEditingId(attendee.id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/attendees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAttendees();
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };

  const getEventNames = (attendeeEvents) => {
    if (!attendeeEvents) return 'None';
    return attendeeEvents.map(e => e.name).join(', ');
  };

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4">Attendee Management</h2>
  
  <button
    className="mb-4 py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 flex items-center"
    onClick={() => setNewAttendee({
      name: '',
      email: '',
      phone: '',
      eventIds: []
    })}
  >
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
    Add Attendee
  </button>
  
  <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-pink-100">
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-1">Full Name</label>
      <input
        type="text"
        name="name"
        value={newAttendee.name}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={newAttendee.email}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-1">
      <label className="block text-pink-700 text-sm font-medium mb-1">Phone</label>
      <input
        type="text"
        name="phone"
        value={newAttendee.phone}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
      />
    </div>
    
    <div className="md:col-span-2">
      <label className="block text-pink-700 text-sm font-medium mb-1">Events</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {events.map(event => (
          <div key={event.id} className="flex items-center">
            <input
              type="checkbox"
              id={`event-${event.id}`}
              value={event.id}
              checked={newAttendee.eventIds.includes(event.id)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-pink-500 focus:ring-pink-300 border-pink-200 rounded"
            />
            <label htmlFor={`event-${event.id}`} className="ml-2 text-pink-700">{event.name}</label>
          </div>
        ))}
      </div>
    </div>
    
    <div className="md:col-span-2">
      <button type="submit" className="py-2 px-6 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors duration-300">
        {editingId ? 'Update Attendee' : 'Add Attendee'}
      </button>
    </div>
  </form>
  
  <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-pink-100 mb-4">
    <table className="min-w-full divide-y divide-pink-100">
      <thead className="bg-pink-100">
        <tr>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">ID</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Name</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Email</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Phone</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Events</th>
          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-pink-100">
        {attendees.map(attendee => (
          <tr key={attendee.id} className="hover:bg-pink-50">
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">{attendee.id}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-pink-800">{attendee.name}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">{attendee.email}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">{attendee.phone}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-pink-600">{getEventNames(attendee.events)}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
              <button 
                onClick={() => handleEdit(attendee)} 
                className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(attendee.id)} 
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

export default AttendeeManagement;