// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import EventCard from '../components/Shared/EventCard';

function Home() {
  const featuredEvents = [
    {
      id: 1,
      title: "AI Innovations Summit",
      date: "July 12, 2025",
      venue: "Tech Hub Arena",
      price: "$180"
    },
    {
      id: 2,
      title: "Summer Music Carnival",
      date: "August 2, 2025",
      venue: "Riverfront Park",
      price: "$90"
    },
    {
      id: 3,
      title: "Gourmet Food Fest",
      date: "August 25, 2025",
      venue: "City Convention Center",
      price: "$60"
    },
    {
      id: 4,
      title: "Entrepreneurship Forum",
      date: "September 18, 2025",
      venue: "Innovation Tower",
      price: "$250"
    },
    {
       id: 5,
       title: "Culinary Masters Showcase",
       date: "August 5, 2025",
       venue: "Gourmet Pavilion",
       price: "$70"
    },
    {
       id: 4,
       title: "Global Business Leaders Conference",
       date: "September 22, 2025",
       venue: "Skyline Grand Hall",
       price: "$300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800 font-sans">
    {/* Hero Section */}
    <section className="py-20 px-6 md:px-12 lg:px-24 text-center flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-r from-pink-300 to-pink-400 text-white">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">EventZen</h1>
      <p className="text-xl md:text-2xl max-w-md mx-auto mb-10 font-light"> Stay Updated on the Best Local Happenings!</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-xs mx-auto">
        <Link to="/register" className="py-3 px-8 bg-white text-pink-500 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-center">Sign Up</Link>
        <Link to="/login" className="py-3 px-8 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-pink-500 transition-all duration-300 text-center">Log in</Link>
      </div>
    </section>
  
    {/* Featured Events Section */}
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Upcoming Events</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
      EventZen presents a handpicked collection of top-tier events, crafted for a seamless and sophisticated experience.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {featuredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
              <div className="text-sm text-gray-600 mb-4">
                <p>{event.date}</p>
                <p>{event.venue}</p>
              </div>
              <p className="text-lg font-bold text-pink-500">{event.price}</p>
              <button 
                onClick={() => console.log('View details:', event.id)}
                className="mt-4 py-2 px-4 bg-pink-100 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-200 transition-all duration-300 inline-block"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  
    {/* About Section */}
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-pink-300 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">About EventZen</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      We bridge the gap between event organizers and attendees, ensuring a smooth, hassle-free experience for both. With our intuitive platform, event management becomes effortless, making every event more accessible, engaging, and enjoyable.
      </p>
    </section>
  </div>
  );
}

export default Home;