import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [isToggled, setIsToggled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
<nav className="flex items-center justify-between py-4 px-4 md:px-8 lg:px-16 bg-pink-50 shadow-md relative">
  <div className="flex items-center">
    <Link to="/" className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
      <span className="text-2xl font-bold text-pink-500">EventZen</span>
    </Link>
  </div>
  
  <div className="hidden md:flex items-center space-x-6">
    <Link to="/" className="text-gray-700 hover:text-pink-500 transition-colors duration-300">Home</Link>
    
    {isLoggedIn ? (
      <>
        {role === 'admin' ? (
          <Link to="/admin" className="text-pink-600 hover:text-pink-700 transition-colors duration-300">Admin Dashboard</Link>
        ) : (
          <Link to="/customer" className="text-gray-700 hover:text-pink-500 transition-colors duration-300">My Events</Link>
        )}
        
        <div className="relative group">
          <button className="flex items-center space-x-1 text-gray-700 hover:text-pink-500 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="ml-1">Account</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
            <Link to={role === 'admin' ? "/admin" : "/customer/profile"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-500">Profile</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-500">Logout</button>
          </div>
        </div>
      </>
    ) : (
      <>
        <Link to="/login" className="text-gray-700 hover:text-pink-500 transition-colors duration-300">Login</Link>
        <Link to="/register" className="py-2 px-4 bg-pink-300 text-pink-900 font-medium rounded-full hover:bg-pink-400 transition-colors duration-300 shadow-sm">Register</Link>
      </>
    )}
  </div>
  
  {/* Mobile menu button */}
  <div className="md:hidden flex items-center">
    <button 
      className="text-pink-600 hover:text-pink-700 focus:outline-none" 
      onClick={() => setIsToggled(prev => !prev)}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </div>
  
  {/* Mobile menu */}
  {isToggled && (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-pink-50 shadow-md z-10 flex flex-col items-start">
      <Link to="/" className="block py-4 px-6 text-gray-700 hover:bg-pink-100 hover:text-pink-500 border-b border-pink-100 w-full">Home</Link>
      
      {isLoggedIn ? (
        <>
          {role === 'admin' ? (
            <Link to="/admin" className="block py-4 px-6 text-pink-600 hover:bg-pink-100 hover:text-pink-700 border-b border-pink-100 w-full">Admin Dashboard</Link>
          ) : (
            <Link to="/customer" className="block py-4 px-6 text-gray-700 hover:bg-pink-100 hover:text-pink-500 border-b border-pink-100 w-full">My Events</Link>
          )}
          <Link to={role === 'admin' ? "/admin" : "/customer/profile"} className="block py-4 px-6 text-gray-700 hover:bg-pink-100 hover:text-pink-500 border-b border-pink-100 w-full">Profile</Link>
          <button onClick={handleLogout} className="block w-full text-left py-4 px-6 text-gray-700 hover:bg-pink-100 hover:text-pink-500">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="block py-4 px-6 text-gray-700 hover:bg-pink-100 hover:text-pink-500 border-b border-pink-100 w-full">Login</Link>
          <Link to="/register" className="block py-4 px-6 text-pink-600 hover:bg-pink-100 hover:text-pink-700 w-full">Register</Link>
        </>
      )}
    </div>
  )}
</nav>
  );
}

export default Navbar;