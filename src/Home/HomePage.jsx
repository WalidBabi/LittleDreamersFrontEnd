import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./style.css";

const HomePage = () => {
  const [filters, setFilters] = useState({
    Age: false,
    Price: false,
    Category: false,
    Brand: false,
    DevelopmentalBenefits: false,
    SocialEvents: false,
  });
  const productsPerPage = 20;

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    isParentUser: false,
  });

  // const currentUser = {
  //   name: localStorage.getItem("userName") || "Guest",
  //   isParentUser: localStorage.getItem("isParentUser") === "true" || true,
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (selectedAccount && selectedAccount.isParentAccount === false) {
          // Fetch products for the selected child account
          response = await axios.get(
            `http://localhost:8000/api/products/${selectedAccount.id}`
          );
        } else {
          // Fetch all products for the parent account
          response = await axios.get("http://localhost:8000/api/products");
        }

        setProducts(response.data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        );
      }
    };

    const storedUsername = localStorage.getItem("userName");
    const username = storedUsername || "Guest";

    const isParentUser =
      localStorage.getItem("isParentUser") === "true" || false;

    // Update currentUser state
    setCurrentUser((prevCurrentUser) => ({
      ...prevCurrentUser,
      name: storedUsername ? storedUsername : "Guest",
      isParentUser: isParentUser,
    }));

    console.log("Username from localStorage:", username);

    fetchData();
  }, [selectedAccount]);

  const toggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const filterOptions = {
    Age: ["0-2 years", "3-5 years", "6-8 years", "9-12 years"],
    Price: ["Under $10", "$10 - $20", "$20 - $50", "Over $50"],
    Category: ["Toys", "Books", "Games", "Electronics"],
    Brand: ["Brand A", "Brand B", "Brand C", "Brand D"],
    DevelopmentalBenefits: ["Cognitive", "Motor Skills", "Creativity"],
    SocialEvents: ["Party", "Outdoor", "Indoor", "Educational"],
  };

  const userAccounts = [
    {
      id: 1,
      name: "Parent Account 1",
      isParentAccount: true,
    },
    {
      id: 2,
      name: "Child Account 1",
      isParentAccount: false,
      parentId: 1,
    },
    {
      id: 3,
      name: "Child Account 2",
      isParentAccount: false,
      parentId: 1,
    },
  ];

  const sendApiRequest = (id, parentUserName, childUserName) => {
    console.log("Sending API request with data:", {
      id,
      parentUserName,
      childUserName,
    });
    // You can replace this with your actual API call
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);

    // Update currentUser state
    setCurrentUser({
      name: account.name,
      isParentUser: account.isParentAccount,
    });
  };

  // Pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginationRange = 6;

  const getPaginationRange = () => {
    const start = Math.max(1, currentPage - Math.floor(paginationRange / 2));
    const end = Math.min(totalPages, start + paginationRange - 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const paginationArray = getPaginationRange();

    return (
      <div className="mt-8 flex justify-center items-center">
        {currentPage > 1 && (
          <button
            className="mx-1 px-3 py-2 rounded bg-blue-500 text-white"
            onClick={() => paginate(currentPage - 1)}
          >
            &laquo; Previous
          </button>
        )}

        <div className="flex space-x-2">
          {paginationArray.map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {currentPage < totalPages && (
          <button
            className="mx-1 px-3 py-2 rounded bg-blue-500 text-white"
            onClick={() => paginate(currentPage + 1)}
          >
            Next &raquo;
          </button>
        )}
      </div>
    );
  };

  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const currentProducts = products.slice(startIdx, endIdx);

  return (
    <div className="flex">
      {/* Sidebar with selected menu */}
      <div className="w-1/5 bg-gray-200 p-4 max-h-full flex flex-col overflow-y-auto border-r border-gray-300">
        {/* Account Dropdown with scrolling */}
        <div className="mb-4">
          <div
            className={`bg-gray-100 p-4 flex items-center justify-between cursor-pointer transition duration-300 ${
              selectedAccount ? "hover:bg-gray-200" : ""
            }`}
          >
            <div>
              <h2 className="text-lg font-semibold">
                {/* Use the user's name from localStorage */}
                {currentUser.name}
              </h2>
            </div>
            {currentUser.isParentUser && (
              <Link to="/child-form">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Link>
            )}
          </div>
          <div className="bg-white p-2 mt-2 rounded shadow-md">
            {userAccounts.map((account) => (
              <div
                key={account.id}
                onClick={() => handleAccountSelect(account)}
                className={`p-2 cursor-pointer hover:bg-gray-100 transition duration-300 ${
                  selectedAccount && selectedAccount.id === account.id
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                {account.name}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-t-2 border-gray-300" />

        {/* Combined Category Filters and Dropdown */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Category Filters</h2>
          <div className={`space-y-2 ${filters.Category ? "" : "collapsed"}`}>
            {Object.keys(filters).map((filterKey) => (
              <div key={filterKey}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleFilter(filterKey)}
                >
                  <h3 className="text-sm font-semibold">{filterKey}</h3>
                  <svg
                    className={`h-4 w-4 transform ${
                      filters[filterKey] ? "rotate-90" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                {filters[filterKey] && (
                  <div className="ml-4">
                    {filterOptions[filterKey].map((option) => (
                      <label
                        key={option}
                        className="flex items-center mb-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 cursor-pointer"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="w-4/5 p-4">
        <div className="grid grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-container">
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mb-2 transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <Link to={`/product/${product.id}`}>
                <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
                  Show Details
                </button>
              </Link>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="">{renderPagination()}</div>
      </div>
    </div>
  );
};

export default HomePage;
