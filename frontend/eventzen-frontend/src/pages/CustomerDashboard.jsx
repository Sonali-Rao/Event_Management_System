// // src/pages/CustomerDashboard.jsx
// import { useEffect, useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function CustomerDashboard() {
//   const [activeTab, setActiveTab] = useState('venues');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
    
//     if (!token || role !== 'customer') {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen bg-pink-50">
//     <div className="w-64 bg-pink-100 p-4 flex flex-col justify-between">
//       <div>
//         <h2 className="text-2xl font-semibold mb-6 text-pink-800">Customer Portal</h2>
//         <ul className="space-y-2">
//           <li className={`p-2 rounded-md ${activeTab === 'venues' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
//             <Link to="venues" onClick={() => setActiveTab('venues')} className="block">View Venues</Link>
//           </li>
//           <li className={`p-2 rounded-md ${activeTab === 'bookings' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
//             <Link to="bookings" onClick={() => setActiveTab('bookings')} className="block">Manage Bookings</Link>
//           </li>
          
//           <li className={`p-2 rounded-md ${activeTab === 'profile' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
//             <Link to="profile" onClick={() => setActiveTab('profile')} className="block">Manage Profile</Link>
//           </li>
//         </ul>
//       </div>
//       <button onClick={handleLogout} className="mt-auto w-full p-2 bg-pink-300 hover:bg-pink-400 text-pink-900 rounded-md transition-colors">Logout</button>
//     </div>
//     <div className="flex-1 p-6 bg-white">
//       <Outlet />
//     </div>
//   </div>
//   );
// }

// export default CustomerDashboard;


// src/pages/CustomerDashboard.jsx
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('venues');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'customer') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-pink-50">
    {/* Sidebar - collapses on mobile, fixed on desktop */}
    <div className="w-full md:w-64 bg-pink-50 p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-pink-200">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-pink-800 text-center md:text-left">Customer Portal</h2>
        <ul className="space-y-2">
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'venues' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link to="venues" onClick={() => setActiveTab('venues')} className="block">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                View Venues
              </span>
            </Link>
          </li>
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'bookings' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link to="bookings" onClick={() => setActiveTab('bookings')} className="block">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Manage Bookings
              </span>
            </Link>
          </li>
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'events' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link 
              to="events" 
              onClick={() => setActiveTab('events')}
              className="block"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Browse Events
              </span>
            </Link>
          </li>
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link to="profile" onClick={() => setActiveTab('profile')} className="block">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Manage Profile
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <button onClick={handleLogout} className="mt-6 w-full p-2 bg-pink-300 hover:bg-pink-400 text-pink-900 rounded-md transition-colors shadow-sm font-medium">
        <span className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </span>
      </button>
    </div>
    
    {/* Main content area */}
    <div className="flex-1 p-4 md:p-6 bg-white overflow-auto">
      <Outlet />
    </div>
  </div>
  );
}

export default CustomerDashboard;