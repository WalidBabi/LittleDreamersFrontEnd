import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white h-full py-4">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Explore</h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="hover:text-red-500 font-sans">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-red-500 font-sans">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-red-500 font-sans">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Legal</h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/User-product-policy" className="hover:text-red-500 font-sans">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/User-product-policy" className="hover:text-red-500 font-sans">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Connect With Us</h3>
          <div className="flex items-center space-x-4">
            <FaFacebook className="text-2xl hover:text-red-500 font-sans" />
            <FaTwitter className="text-2xl hover:text-red-500 font-sans" />
            <FaInstagram className="text-2xl hover:text-red-500 font-sans" />
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Newsletter</h3>
          <p className="mb-4 text-gray-400">
            Subscribe to our newsletter for the latest updates and promotions.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="py-2 px-4 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          &copy; 2024 Little Dreamers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
