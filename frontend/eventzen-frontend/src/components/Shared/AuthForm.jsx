// src/components/Shared/AuthForm.jsx
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function AuthForm({ type, onSubmit, error }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 my-8 w-full">
  <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
    {type === 'login' ? 'Welcome Back' : 'Create Account'}
  </h2>
  <p className="text-gray-600 mb-6 text-center">
    {type === 'login' ? 'Sign in to access your account!' : 'Join EventZen to discover amazing events.'}
  </p>
  
  {error && (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-200">
      {error}
    </div>
  )}
  
  <form onSubmit={handleSubmit} className="space-y-5">
    {type === 'register' && (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <FaUser />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    )}
    
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Email Address</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {type === 'login' ? <FaUser /> : <FaEnvelope />}
        </div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
    
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <FaLock />
        </div>
        <input
          type="password"
          name="password"
          placeholder={type === 'login' ? "Enter your password" : "Create password"}
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
    
    {type === 'register' && (
      <>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FaLock />
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isAdmin" className="text-sm text-gray-700">
            {type === 'login' ? 'Login as Admin' : 'Register as Admin'}
          </label>
        </div>
      </>
    )}
    
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 transform hover:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {type === 'login' ? 'Sign In' : 'Create Account'}
    </button>
  </form>
  
  <div className="mt-6 text-center text-sm">
    {type === 'login' ? (
      <>
        <p className="text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
          <a href="/forgot-password" className="hover:underline">Forgot password?</a>
        </p>
        <p className="text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline font-medium">Sign up</a>
        </p>
      </>
    ) : (
      <p className="text-gray-600">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline font-medium">Sign in</a>
      </p>
    )}
  </div>
</div>
  );
}

export default AuthForm;