import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(false); // State to manage the display of the cart popup

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Performing search for:", searchTerm);
    // Implement your search logic using the searchTerm state
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Implement logout logic here
  };

  const handleCartClick = () => {
    setShowCart(!showCart); // Toggle the display of the cart popup
  };

  // Sample cart content - replace this with your actual cart data
  const cartItems = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 15 },
    // Add more items as needed
  ];

  return (
    <div className="bg-gray-800 py-3 px-8 flex items-center justify-between">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-50" />
      </div>

      {/* Navigation Links in the center */}
      <div className="flex justify-center space-x-6">
        <Link to="/" className="nav-link text-white hover:text-red-500">
          HOME
        </Link>
        <Link
          to="/contact-us"
          className="nav-link text-white hover:text-red-500"
        >
          CONTACT-US
        </Link>
        <Link to="/about-us" className="nav-link text-white hover:text-red-500">
          ABOUT-US
        </Link>
        <Link to="/faq" className="nav-link text-white hover:text-red-500">
          FAQ
        </Link>
      </div>

      {/* Search bar, Sign In/Register or Logout, and Shopping Cart */}
      <div className="flex items-center space-x-4">
        <div className="md:w-72 mr-2">
          {/* Search Input */}
          <div className="relative flex w-full flex-wrap items-stretch">
            <input
              type="search"
              value={searchTerm}
              onChange={handleInputChange}
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] bg-white text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />

            <button
              className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out bg-gray-500 hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {isLoggedIn ? (
          <>
            <button
              onClick={handleLogout}
              className="nav-link text-white hover:text-red-500"
            >
              LOG OUT
            </button>
            {/* Render other authenticated user links here */}
            {/* Shopping Cart Icon */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white hover:text-red-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                onClick={handleCartClick} // Handle click on the cart icon
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              {/* Cart Popup */}
              {showCart && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                  <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
                    <ul>
                      {cartItems.map((item) => (
                        <li key={item.id}>
                          {item.name} - ${item.price}
                        </li>
                      ))}
                    </ul>
                    {/* Add checkout or more cart functionality here */}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="nav-link text-white hover:text-red-500"
            >
              SIGN IN
            </Link>
            <Link
              to="/register"
              className="nav-link text-white hover:text-red-500"
            >
              REGISTER
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
