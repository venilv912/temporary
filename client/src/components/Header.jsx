import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-green-600 text-white p-3 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            <h1 className="flex flex-wrap">
              <span className="text-white">Real</span>
              <span className="text-slate-200">Estate</span>
            </h1>
          </Link>
        </div>

        {/* Search Bar */}
        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-black"
          />
          <FaSearch className="text-slate-600" />
        </form>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-4">
          <li><Link to="/" className="text-white text-sm hover:text-gray-200">Home</Link></li>
          <li><Link to="/about" className="text-white text-sm hover:text-gray-200">About</Link></li>
          <li><Link to="/login" className="bg-green-500 text-white px-3 py-2 rounded-full text-sm hover:bg-green-400">Sign in</Link></li>
        </ul>
      </div>
    </nav>
  );
}
