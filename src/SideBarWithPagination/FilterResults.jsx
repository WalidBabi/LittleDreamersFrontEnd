import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Pagination from "../SideBarWithPagination/Pagination";
import LoadingAnimation from "../Loading/LoadingAnimation";
import axios from "axios";

function FilterResults({ filteredToysData }) {
  const [results, setResults] = useState(filteredToysData || []); // Initialize results with filteredToysData
  const productsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => ({
    name: localStorage.getItem("fullName") || "Guest",
    isParentUser: true,
    children: [],
  }));
  const [userAccounts, setUserAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Modify the request to use POST method and send filter data in the body
          const response = await axios.post(
            "http://localhost:8000/api/user-details",
            { filterData: filteredToysData }, // Include your filter data here
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data) {
            setUserAccounts([response.data]);
            setCurrentUser({
              name: response.data.fullName,
              isParentUser:
                response.data.children && response.data.children.length > 0,
              children: response.data.children || [],
            });
          } else {
            console.error("User details response is null");
          }
        } else {
          console.error("Token not found in local storage");
        }
      } catch (error) {
        console.error("Error retrieving user details:", error);
      }
    };

    setResults(filteredToysData || []); // Update results with filteredToysData
  }, [filteredToysData]);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);

    setCurrentUser({
      name: account.name,
      isParentUser: account.isParentAccount,
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(results.length / productsPerPage);

  const renderHeader = () => {
    if (results.length === 0) {
      // Display "not found" message when there are no search results
      return (
        <h1 className="text-3xl pt-6 pr-8 font-medium text-blue-500">
          Sorry, we didn't find it...
        </h1>
      );
    }

    // Display "Results of search:" when there are search results
    return (
      <h1 className="text-3xl pt-4 pr-8 font-medium text-blue-500">
        Result of Filter:
      </h1>
    );
  };

  const renderProducts = () => {
    return (
      <div className="grid grid-cols-4 gap-4">
        {currentResults.map((result) => (
          <div key={result.id} className="product-container">
            <div className="relative overflow-hidden">
              <img
                src={result.image}
                alt={result.name}
                className="mb-2 transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <h3 className="font-semibold">{result.name}</h3>
            <p className="text-gray-600">{result.price}</p>
            <Link to={`/products/${result.id}`}>
              <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
                Show Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    // Conditionally render pagination only when there is more than one page
    if (totalPages > 1) {
      return (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      );
    }
    return null; // Don't render pagination if there's only one page
  };

  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const currentResults = results.slice(startIdx, endIdx);

  return (
    <div className="flex">
      <Sidebar
        currentUser={currentUser}
        userAccounts={userAccounts}
        selectedAccount={selectedAccount}
        handleAccountSelect={handleAccountSelect}
      />
      <div className="w-4/5 h-full">
        <div className="text-center mb-4">{renderHeader()}</div>
        <div className="p-4">
          {renderProducts()}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
}

export default FilterResults;
