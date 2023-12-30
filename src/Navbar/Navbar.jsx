import React from 'react';
import logo from '../images/logo.png';
import SignIn from './RegisterUser';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="bg-gray-800 py-3 flex items-center justify-between px-6">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-50" />
      </div>

      {/* Navigation Links in the center */}
      <div className="flex justify-center space-x-6">
        <Link to="/" className="nav-link text-white hover:text-red-500">
          HOME
        </Link>
        <Link to="/" className="nav-link text-white hover:text-red-500">
          BOYS
        </Link>
        <Link to="/" className="nav-link text-white hover:text-red-500">
          GIRLS
        </Link>
        <Link to="/faq" className="nav-link text-white hover:text-red-500">
          FAQ
        </Link>
        <Link to="/contact-us" className="nav-link text-white hover:text-red-500">
          CONTACT-US
        </Link>
        <Link to="/about-us" className="nav-link text-white hover:text-red-500">
          ABOUT-US
        </Link>
      </div>

      {/* Search bar, Sign In, Register, and Shopping Cart */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                // d="M12.356 13.78a6.5 6.5 0 111.414-1.414l3.962 3.962a1 1 0 11-1.415 1.415l-3.961-3.963zm-4.855-.643a5 5 0 116.303.748l3.971 3.97a1 1 0 01-1.415 1.414l-3.971-3.97a5 5 0 11-5.888-5.887l3.97 3.972a1 1 0 11-1.415 1.414l-3.97-3.971a5 5 0 01.748 6.303z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border-4 border-gray-400 rounded-md text-gray-700 focus:outline-none"
          />
        </div>
        <a href={SignIn} className="nav-link text-white hover:text-red-500">
          SIGN IN
        </a>
        <Link to="/register" className="nav-link text-white hover:text-red-500">
          REGISTER
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white hover:text-red-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* SVG path for shopping cart icon */}
        </svg>
      </div>
    </div>
  );
}

export default NavBar;
