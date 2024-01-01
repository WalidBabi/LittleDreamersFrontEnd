import React, { useState } from "react";
import logo from "../images/logo.png";
import SignIn from "./RegisterUser";
import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic using the searchTerm state
    console.log("Performing search for:", searchTerm);
    // You can perform actions such as fetching data or filtering based on searchTerm
  };

  return (
    <div className="bg-gray-800 py-3 flex items-center justify-between px-8">
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
        <Link
          to="/contact-us"
          className="nav-link text-white hover:text-red-500"
        >
          CONTACT-US
        </Link>
        <Link to="/about-us" className="nav-link text-white hover:text-red-500">
          ABOUT-US
        </Link>
      </div>

      {/* Search bar, Sign In, Register, and Shopping Cart */}
      <div className="flex items-center space-x-4">
        <div className="md:w-72 mr-2">
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

            {/* <!--Search button--> */}
            <TERipple color="light">
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
            </TERipple>
          </div>
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
