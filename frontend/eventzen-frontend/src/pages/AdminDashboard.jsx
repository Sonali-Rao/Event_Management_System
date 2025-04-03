// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('venues');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'admin') {
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
        <h2 className="text-2xl font-semibold mb-6 text-pink-800 text-center md:text-left">Admin Portal</h2>
        <ul className="space-y-2">
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'venues' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link to="venues" onClick={() => setActiveTab('venues')} className="block">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Venue Management
              </span>
            </Link>
          </li>
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'events' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link to="events" onClick={() => setActiveTab('events')} className="block">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Event Management
              </span>
            </Link>
          </li>
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'vendors' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link to="vendors" onClick={() => setActiveTab('vendors')} className="block">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Vendor Management
              </span>
            </Link>
          </li>
          <li className={`p-2 rounded-md transition-colors ${activeTab === 'attendees' ? 'bg-pink-200 text-pink-900' : 'text-pink-700 hover:bg-pink-200'}`}>
            <Link to="attendees" onClick={() => setActiveTab('attendees')} className="block">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Attendee Management
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

export default AdminDashboard;