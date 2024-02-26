import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../SideBarWithPagination/Sidebar";
import Pagination from "../SideBarWithPagination/Pagination";
import axios from "axios";
import not_found from "../images/not_found.png";

function SearchResults() {
  const [results, setResults] = useState([]);
  const { id } = useParams();
  const productsPerPage = 20;
  const navigate = useNavigate();
  const { userName } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    Age: false,
    Price: false,
    Category: false,
    Brand: false,
    DevelopmentalBenefits: false,
    SocialEvents: false,
  });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => ({
    name: localStorage.getItem("fullName") || "Guest",
    isParentUser: true,
    children: [],
  }));
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const response = await axios.get(
            "http://localhost:8000/api/user-details"
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

    fetchUserDetails();
  }, []);

  // Update the following line to retrieve the search term from the URL
  const searchParams = new URLSearchParams(window.location.search);
  const searchTerm = searchParams.get("query");

  useEffect(() => {
    // Fetch search results based on the search term
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/search?query=${searchTerm}`
        );
        setResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  useEffect(() => {
    const fetchCategoryFilters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/category-filters"
        );
        setCategoryFilters(response.data);
      } catch (error) {
        console.error("Error fetching category filters:", error);
      }
    };

    fetchCategoryFilters();
  }, []);

  // const toggleFilter = (filter) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [filter]: !prevFilters[filter],
  //   }));
  // };

  // const sendApiRequest = (id, parentUserName, childUserName) => {
  //   console.log("Sending API request with data:", {
  //     id,
  //     parentUserName,
  //     childUserName,
  //   });
  // };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);

    setCurrentUser({
      name: account.name,
      isParentUser: account.isParentAccount,
    });

    if (!account.isParentAccount) {
      fetchProducts(account.id);
    }
  };

  const fetchProducts = async (childId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommendations/${childId}`
      );
      setRecommendations(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
    }
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
        Results of search:
      </h1>
    );
  };

  const renderProducts = () => {
    if (results.length === 0) {
      // Display "not found" image when there are no search results
      return (
        <div>
          <img src={not_found} alt="not_found" />
        </div>
      );
    }

    // Display search results
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
    <div className="flex h-screen">
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

export default SearchResults;
