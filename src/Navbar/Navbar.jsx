import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import ShoppingCart from "./ShoppingCart";
import SearchResults from "../Components/SearchResults";
import LoadingAnimation from "../Loading/LoadingAnimation"; // Import the LoadingAnimation component
import throttle from "lodash/throttle";

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClearSearch = () => {
    // Use setTimeout to ensure state is updated before navigating
    setTimeout(() => {
      // Clear the search term
      setSearchTerm("");
      // Clear the search results
      setSearchResults([]);
      // Reload the component by navigating to the current location
      navigate("/");
    }, 0);
  };

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Use lodash's throttle to limit the API calls while typing
  const throttledSearch = throttle(async (value) => {
    try {
      if (value.trim() !== "") {
        // Check if the search term is not empty
        const response = await axios.get(
          `http://localhost:8000/api/search?query=${value}`
        );
        setSearchResults(response.data.data);
        // Navigate to search results page with results as a URL parameter
        navigate(`/search-results?query=${encodeURIComponent(value)}`);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, 500); // Adjust the throttle timeout as needed

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    throttledSearch(value); // Call the throttled search function
    try {
      if (value.trim() !== "") {
        const response = await axios.get(
          `http://localhost:8000/api/search?query=${value}`
        );
        setSearchResults(response.data.data);
        navigate(`/search-results?query=${encodeURIComponent(value)}`);
      } else {
        setSearchResults([]);
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search?query=${searchTerm}`
      );
      const searchResults = response.data.data;

      // Update the search results state
      setSearchResults(response.data.data);

      // Navigate to search results page with results as a URL parameter
      navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleLogout = () => {
    // Show confirmation modal
    setShowConfirmation(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoading(true); // Show loading animation

    const logoutEndpoint = "http://localhost:8000/api/logout";

    try {
      // Include the authentication token in the request headers
      const response = await axios.post(logoutEndpoint, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear user authentication state
      setIsLoggedIn(false);

      // Clear tokens or session data on the client side (if applicable)
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("cartItems"); // Remove cartItems

      // Close the confirmation modal
      setShowConfirmation(false);

      // Log success message
      console.log("Logout successful");

      // Redirect to the login page or another appropriate page (if needed)
      // history.push("/login");

      // Reload the entire project
      window.location.reload(true); // Pass true to force a full page reload
    } catch (error) {
      // Handle other errors, such as network issues
      console.error("Error during logout:", error);

      // Clear user authentication state
      setIsLoggedIn(false);

      // Clear tokens or session data on the client side (if applicable)
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken"); // Remove any other tokens if needed
      // ...

      // Close the confirmation modal
      setShowConfirmation(false);

      // Redirect to the login page or another appropriate page (if needed)
      // history.push("/login");

      // Reload the entire project
      window.location.reload(true); // Pass true to force a full page reload
    } finally {
      setIsLoading(false); // Hide loading animation regardless of success or failure
    }
  };

  const handleCancelLogout = () => {
    // Close the confirmation modal
    setShowConfirmation(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart); // Toggle the display of the cart popup
  };

  const handleBuyClick = () => {
    // Prepare data to send to the backend
    const purchaseData = {
      products: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        rating: item.rating,
        fullPrice: item.price * item.quantity,
      })),
    };

    // Send the data to the backend using Axios
    axios
      .post(`your-purchase-api-endpoint`, purchaseData)
      .then((response) => {
        console.log("Purchase data sent to backend successfully");

        // Clear the cart items in state
        setCartItems([]);
        // Clear the cart items in local storage
        localStorage.removeItem("cartItems");
        // Close the cart popup
        setShowCart(false);

        // Display success message
        const successMessage = document.createElement("div");
        successMessage.innerHTML =
          "Purchase successful! Thank you for shopping!";
        successMessage.className =
          "fixed top-0 left-0 right-0 bg-green-500 text-white p-6 text-center";
        document.body.appendChild(successMessage);

        // Remove the success message after 3 seconds (adjust as needed)
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error sending purchase data to backend:", error);
      });
  };

  const handleAddItem = (itemId) => {
    // Update the quantity of the selected item in the cart
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    // Update the quantity of the selected item in the cart
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleDeleteAllItems = () => {
    // Clear the cart items in state
    setCartItems([]);
    // Clear the cart items in local storage
    localStorage.removeItem("cartItems");
    // Close the cart popup
    setShowCart(false);
  };

  // Product rendering logic
  const renderProducts = () => {
    if (searchResults.length > 0) {
      // Render search results
      return (
        <div className={`search-results ${showCart ? "hidden" : ""}`}>
          {/* Render search results */}
          <h3>Result of search:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <img
                  src={result.image}
                  alt={result.name}
                  className="search-result-image"
                />
                <p>{result.name}</p>
                <p>${result.price}</p>
                {/* Add other product details as needed */}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      // Render default product links
      return (
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
          <Link
            to="/about-us"
            className="nav-link text-white hover:text-red-500"
          >
            ABOUT-US
          </Link>
          <Link to="/faq" className="nav-link text-white hover:text-red-500">
            FAQ
          </Link>
          <Link
            to="/User-product-policy"
            className="nav-link text-white hover:text-red-500"
          >
            POLICIES
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-800 py-3 px-8 flex items-center justify-between">
      {/* Logo on the left */}
      <Link to="/">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-50" />
        </div>
      </Link>

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
        <Link
          to="/User-product-policy"
          className="nav-link text-white hover:text-red-500"
        >
          POLICIES
        </Link>
      </div>

      {/* Search bar, Sign In/Register or Logout, and Shopping Cart */}
      <div className="flex items-center space-x-4">
        <div className="relative md:w-72 mr-2">
          <div className="flex items-center bg-white rounded-full shadow-sm overflow-hidden">
            <input
              type="text" // Change the type to "text"
              value={searchTerm}
              onChange={handleInputChange}
              className="py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none"
              placeholder="Search for toys"
            />
            {searchTerm && (
              <button
                className="text-blue-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleClearSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <button
              className="text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6"
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

        {/* Render the loading animation when isLoading is true */}
        {isLoading && <LoadingAnimation />}

        {/* {console.log("isLoggedInnnnnnn",isLoggedIn)}      */}
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
                <ShoppingCart
                  cartItems={cartItems}
                  showCart={showCart}
                  setShowCart={setShowCart}
                  handleRemoveItem={handleRemoveItem}
                  handleAddItem={handleAddItem}
                  handleDeleteAllItems={handleDeleteAllItems}
                  handleBuyClick={handleBuyClick}
                  calculateTotalPrice={calculateTotalPrice}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                onClick={handleConfirmLogout}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancelLogout}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
