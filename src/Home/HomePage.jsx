import React, { useState } from "react";
import aboutUss from "../images/aboutUss.jpg";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";

const HomePage = () => {
  const { cartItems } = useCart();
  const [filters, setFilters] = useState({
    Age: false,
    Price: false,
    Category: false,
    Brand: false,
    DevelopmentalBenefits: false,
    SocialEvents: false,
  });

  const [selectedAccount, setSelectedAccount] = useState(null);

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

  const products = [
    {
      id: 1,
      name: "Product 1",
      imageUrl: aboutUss,
      price: "$20",
    },
    {
      id: 2,
      name: "Product 2",
      imageUrl: aboutUss,
      price: "$25",
    },
    {
      id: 3,
      name: "Product 3",
      imageUrl: aboutUss,
      price: "$15",
    },
    {
      id: 4,
      name: "Product 4",
      imageUrl: aboutUss,
      price: "$30",
    },
  ];

  const currentUser = {
    name: "John Doe",
    isParentUser: true, // Mock flag for the parent user
  };

  const userAccounts = [
    {
      id: 1,
      name: "Parent Account 1",
      isParentAccount: true, // Mock flag for the parent account
    },
    {
      id: 2,
      name: "Child Account 1",
      isParentAccount: false,
      parentId: 1, // Linking child to parent using parentId
    },
    {
      id: 3,
      name: "Child Account 2",
      isParentAccount: false,
      parentId: 1,
    },
  ];

  const sendApiRequest = (id, parentUserName, childUserName) => {
    // Simulating Axios API request
    console.log("Sending API request with data:", {
      id,
      parentUserName,
      childUserName,
    });
    // You can replace this with your actual API call
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  return (
    <div className="flex">
      {/* Sidebar with selected menu */}
      <div className="w-1/5 bg-gray-200 p-4 h-screen overflow-y-auto">
        {/* Account Dropdown with scrolling */}
        <div className="mb-4">
          <div
            className={`bg-gray-100 p-4 flex items-center justify-between cursor-pointer transition duration-300 ${
              selectedAccount ? "hover:bg-gray-200" : ""
            }`}
          >
            <div>
              <h2 className="text-lg font-semibold">
                {selectedAccount ? selectedAccount.name : currentUser.name}
              </h2>
            </div>
            {currentUser.isParentUser && (
              <Link to="/register">
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

        {/* Combined Category Filters and Dropdown */}
        <div className="mb-4">
          {/* Category Filters */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Category Filters</h2>
            <div className="space-y-2">
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

          {/* Additional Dropdown or Other Elements Can Be Added Here */}
        </div>
      </div>

      {/* Product Display */}
      <div className="w-4/5 p-4">
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded">
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
      </div>
    </div>
  );
};

export default HomePage;
