// src/components/Customer/Events.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Events() {
  // Mock data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Technoform 2025",
      date: "2025-05-15T09:00:00",
      venue: "Alt High Ground",
      description: "Annual technology conference featuring the latest innovations",
      price: 45,
      capacity: 500,
      registered: false
    },
    {
      id: 2,
      title: "Lollapaloza",
      date: "2025-04-11T20:00:00",
      venue: "Silvet Park, Mumbai",
      description: "Weekend music festival with top artists",
      price: 120,
      capacity: 2000,
      registered: true
    },
    {
      id: 3,
      title: "Baking Workshop",
      date: "2025-08-24T11:00:00",
      venue: "Blue Tokai",
      description: "Gourmet food and Baking workshop for beginners",
      price: 20,
      capacity: 150,
      registered: false
    },
    {
      id: 4,
      title: "Gourmet Food Fest",
      date: "2025-08-25T14:00:00",
      venue: "City Convention Center",
      description: "A culinary journey featuring top chefs and live cooking demos",
      price: 60,
      capacity: 500,
      registered: false
    },
    {
      id: 5,
      title: "Entrepreneurship Forum",
      date: "2025-09-18T08:00:00",
      venue: "Innovation Tower",
      description: "A networking and learning event for aspiring entrepreneurs",
      price: 250,
      capacity: 300,
      registered: false
    },
    {
       id: 6,
       title: "Culinary Masters Showcase",
       date: "2025-08-05T18:00:00",
       venue: "Gourmet Pavilion",
       description: "An exclusive showcase of world-class culinary artists",
       price: 70,
       capacity: 455,
       registered: true
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const handleRegister = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? {...event, registered: true} : event
    ));
    setShowModal(false);
    alert('Successfully registered for the event!');
  };

  const handleBookTicket = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? {...event, registered: true} : event
    ));
    setShowModal(false);
    alert(`Successfully booked ${ticketQuantity} ticket(s)!`);
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
    <h2 className="text-2xl font-bold text-pink-800">Browse Events</h2>
    
    {/* Events Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-pink-100">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-pink-800 mb-2">{event.title}</h3>
            <p className="text-pink-600 mb-1">
              <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(event.date)}
            </p>
            <p className="text-pink-600 mb-1">
              <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.venue}
            </p>
            <p className="text-pink-600 mb-4">
              <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${event.price}
            </p>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedEvent(event);
                  setShowModal(true);
                }}
                className="flex-1 py-2 px-4 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
              >
                View Details
              </button>
              
              {event.registered ? (
                <span className="flex-1 py-2 px-4 bg-green-700 text-white rounded text-center">
                  Registered
                </span>
              ) : (
                <button 
                  onClick={() => handleRegister(event.id)}
                  className="flex-1 py-2 px-4 bg-red-400 text-white rounded hover:bg-pink-500 transition-colors"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  
    {/* Event Details Modal */}
    {showModal && selectedEvent && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-pink-100">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-pink-800">{selectedEvent.title}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-pink-400 hover:text-pink-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-pink-700">Date & Time</h4>
                <p className="text-pink-600">{formatDate(selectedEvent.date)}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-pink-700">Venue</h4>
                <p className="text-pink-600">{selectedEvent.venue}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-pink-700">Description</h4>
                <p className="text-pink-600">{selectedEvent.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-pink-700">Price</h4>
                <p className="text-pink-600">${selectedEvent.price}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-pink-700">Capacity</h4>
                <p className="text-pink-600">{selectedEvent.capacity} attendees</p>
              </div>
              
              {!selectedEvent.registered && (
                <div className="pt-4 border-t border-pink-100">
                  <h4 className="font-semibold text-pink-700 mb-2">Book Tickets</h4>
                  <div className="flex items-center space-x-4">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-pink-600">Quantity</label>
                      <select
                        id="quantity"
                        value={ticketQuantity}
                        onChange={(e) => setTicketQuantity(Number(e.target.value))}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-pink-200 focus:outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm rounded-md"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => handleBookTicket(selectedEvent.id)}
                      className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                      Book {ticketQuantity} Ticket{ticketQuantity !== 1 ? 's' : ''}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default Events;