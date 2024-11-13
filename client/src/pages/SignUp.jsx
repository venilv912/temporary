import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success===false)
    {
      // setError(data.message);
      setError('Username or Email is already taken.');
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(false);
    navigate('/sign-in?success=true');
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with Image */}
      <div className="hidden md:flex w-1/2">
        <img 
          src="https://d3i6fh83elv35t.cloudfront.net/static/2023/07/GettyImages-637513348-1200x795.jpg" 
          alt="Real Estate"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center overflow-auto">
        <div className="w-96 p-8 rounded-lg shadow-lg bg-[#0077B6]">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Sign Up</h2>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-white font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0077B6] text-white"
                placeholder="Enter your Username"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-white font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0077B6] text-white"
                placeholder="Enter your Email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0077B6] text-white"
                placeholder="Enter your Password"
              />
            </div>

            {/* Sign Up Button */}
            <button disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700  text-white py-3 rounded-md disabled:opacity-70 hover:opacity-80 transition duration-300"
            >
              <p className='font-semibold'>
                {loading? 'Loading...' : 'Sign Up'}
              </p>
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-white">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
          {error && <p className='text-red-500 font-semibold mt-5 bg-white rounded-md text-center'>{error}</p>}
        </div>
      </div>
    </div>
  );
}

// src="https://d3i6fh83elv35t.cloudfront.net/static/2023/07/GettyImages-637513348-1200x795.jpg" 