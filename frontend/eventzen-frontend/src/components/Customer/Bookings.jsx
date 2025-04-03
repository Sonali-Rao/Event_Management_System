// src/components/Customer/Bookings.jsx
import { useState } from 'react';

function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data since backend isn't implemented
  const mockBookings = {
    upcoming: [
      {
        id: 1,
        eventName: "AI & Robotics Summit",
        date: "July 20, 2024",
        venue: "Tech Hub Arena",
        ticketType: "Premium",
        price: "$200",
        confirmation: "AIROBO-001-PREM"
      },
      {
        id: 2,
        eventName: "Global Startup Expo",
        date: "August 10, 2024",
        venue: "Innovation Center",
        ticketType: "General",
        price: "$120",
        confirmation: "STARTUP-202-GEN"
      }
    ],
    past: [
      {
        id: 3,
        eventName: "Digital Marketing Workshop",
        date: "May 5, 2024",
        venue: "Business Convention Hall",
        ticketType: "VIP",
        price: "$180",
        confirmation: "DIGIMARK-305-VIP"
      }
    ]
  };

  const handleCancel = (id) => {
    // In a real app, this would call the backend
    alert(`Booking ${id} would be cancelled `);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-50 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-pink-800 mb-2">My Bookings</h2>
    <p className="text-pink-600 mb-6">Manage your event bookings and tickets</p>
    
    <div className="flex border-b border-pink-200 mb-6">
      <button 
        className={`py-2 px-4 font-medium text-sm ${activeTab === 'upcoming' ? 'border-b-2 border-pink-500 text-pink-800 font-semibold' : 'text-pink-600 hover:text-pink-800'}`}
        onClick={() => setActiveTab('upcoming')}
      >
        Upcoming
      </button>
      <button 
        className={`py-2 px-4 font-medium text-sm ${activeTab === 'past' ? 'border-b-2 border-pink-500 text-pink-800 font-semibold' : 'text-pink-600 hover:text-pink-800'}`}
        onClick={() => setActiveTab('past')}
      >
        Past
      </button>
    </div>
    
    <div className="space-y-4">
      {mockBookings[activeTab].map(booking => (
        <div key={booking.id} className="bg-white p-5 rounded-lg shadow-sm border border-pink-100">
          <h3 className="text-lg font-semibold text-pink-800 mb-3">{booking.eventName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-pink-700 mb-4">
            <p><span className="font-medium">Date:</span> {booking.date}</p>
            <p><span className="font-medium">Venue:</span> {booking.venue}</p>
            <p><span className="font-medium">Ticket:</span> {booking.ticketType} ({booking.price})</p>
            <p><span className="font-medium">Confirmation:</span> {booking.confirmation}</p>
          </div>
          
          {activeTab === 'upcoming' && (
            <div className="mt-4">
              <button 
                onClick={() => handleCancel(booking.id)}
                className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-md transition-colors duration-200"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
}

export default Bookings;