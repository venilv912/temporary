import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';  // Importing Font Awesome search icon

export default function Header() {
  return (
    <nav className="bg-gradient-to-r from-[#023E8A] to-[#48CAE4] text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold tracking-wide font-sans">
            RealEstate
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="flex items-center w-1/3 relative">
          <input
            type="text"
            className="w-full p-2 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring focus:border-blue-400 text-sm font-medium tracking-wide"
            placeholder="Search properties..."
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Menu Section */}
        <div className="flex items-center space-x-6 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-gray-300 hover:underline transition duration-200 hidden md:block"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-300 hover:underline transition duration-200 hidden md:block"
          >
            About
          </Link>
          <Link
            to="/sign-in"
            className="hover:text-gray-300 hover:underline transition duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
