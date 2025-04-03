// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import VenueManagement from './components/Admin/VenueManagement';
import EventManagement from './components/Admin/EventManagement';
import VendorManagement from './components/Admin/VendorManagement';
import AttendeeManagement from './components/Admin/AttendeeManagement';
import Venues from './components/Customer/Venues';
import Bookings from './components/Customer/Bookings';
import Profile from './components/Customer/Profile';
import Events from './components/Customer/Events';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="venues" replace />} />
          <Route path="venues" element={<VenueManagement />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="attendees" element={<AttendeeManagement />} />
        </Route>
        
        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerDashboard />}>
          <Route index element={<Navigate to="venues" replace />} />
          <Route path="venues" element={<Venues />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="events" element={<Events />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;