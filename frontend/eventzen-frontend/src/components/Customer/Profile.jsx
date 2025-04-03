// src/components/Customer/Profile.jsx
import { useState } from 'react';

function Profile() {
  // Mock data since backend isn't implemented
  const [profile, setProfile] = useState({
    name: "Sonali Rao",
    email: "sonali@example.com",
    phone: "+1 (555) 123-4567",
    notifications: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call the backend
    alert('Profile would be saved ');
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-50 rounded-lg shadow-md">
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-pink-800 mb-2">My Profile</h2>
    <p className="text-pink-600 mb-4">Access and manage your account information</p>
    
    <div className="bg-white p-4 rounded-lg shadow-sm border border-pink-100 mb-4">
      <h3 className="text-xl font-semibold text-pink-800">{profile.name}</h3>
      <p className="text-pink-600">{profile.email}</p>
    </div>
    
    <button 
      onClick={() => setIsEditing(!isEditing)}
      className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-pink-800 rounded-md transition-colors duration-200"
    >
      {isEditing ? 'Cancel Editing' : 'Edit Profile'}
    </button>
  </div>
  
  {isEditing ? (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-pink-100">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-pink-700">Full Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-pink-700">Email Address</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-pink-700">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={profile.phone}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="notifications"
          name="notifications"
          checked={profile.notifications}
          onChange={handleInputChange}
          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-pink-300 rounded"
        />
        <label htmlFor="notifications" className="ml-2 block text-sm text-pink-700">
          Enable Notifications
        </label>
      </div>
      
      <button 
        type="submit" 
        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-200"
      >
        Save Changes
      </button>
    </form>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-pink-100">
            <td className="py-3 pr-4 text-pink-700 font-medium w-1/3">Full Name</td>
            <td className="py-3 text-pink-800">{profile.name}</td>
          </tr>
          <tr className="border-b border-pink-100">
            <td className="py-3 pr-4 text-pink-700 font-medium">Email Address</td>
            <td className="py-3 text-pink-800">{profile.email}</td>
          </tr>
          <tr className="border-b border-pink-100">
            <td className="py-3 pr-4 text-pink-700 font-medium">Phone Number</td>
            <td className="py-3 text-pink-800">{profile.phone}</td>
          </tr>
          <tr>
            <td className="py-3 pr-4 text-pink-700 font-medium">Notifications</td>
            <td className="py-3 text-pink-800">{profile.notifications ? 'Enabled' : 'Disabled'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
</div>
  );
}

export default Profile;