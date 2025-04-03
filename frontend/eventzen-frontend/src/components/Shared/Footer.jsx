// src/components/Shared/Footer.jsx
function Footer() {
    return (
      <footer className="bg-pink-100 text-black py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-pink-600">EventZen</h3>
            <p className="text-black-400">Your Ultimate Event Planning Companion</p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-black-400 hover:text-pink-200 transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-black-400 hover:text-pink-200 transition duration-200">
                Who We Are
                </a>
              </li>
              <li>
                <a href="/contact" className="text-black-400 hover:text-pink-200 transition duration-200">
                Get in Touch
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">Legal Information</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-black-400 hover:text-pink-200 transition duration-200">
                Privacy & Data Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-black-400 hover:text-pink-200 transition duration-200">
                User Agreement
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 text-center md:text-left text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EventZen. All rights reserved.</p>
        </div>
      </div>
    </footer>
    );
  }
  
  export default Footer;