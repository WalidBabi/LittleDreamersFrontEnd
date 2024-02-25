import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../SideBarWithPagination/Sidebar";
import Pagination from "../SideBarWithPagination/Pagination";
import style from "./style.css";

const Recommendations = () => {
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
    name: localStorage.getItem("userName") || "Guest",
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

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userName}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    retrieveUserData();
  }, [userName]);

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userName}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    retrieveUserData();
  }, [userName]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/recommendations?child_id=${id}`
        );
        setRecommendations(response.data.toys);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [id]);

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

  const toggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const sendApiRequest = (id, parentUserName, childUserName) => {
    console.log("Sending API request with data:", {
      id,
      parentUserName,
      childUserName,
    });
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);

    setCurrentUser({
      name: account.fullName,
      isParentUser: account.children && account.children.length > 0,
      children: account.children || [],
    });

    if (!account.children) {
      fetchProducts(account.parent_id);
    }
  };

  const fetchProducts = async (child_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommendations/${child_id}`
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

  const totalPages = Math.ceil(recommendations.length / productsPerPage);

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
  const currentRecommendations = recommendations.slice(startIdx, endIdx);

  return (
    <div className="flex">
      <Sidebar
        currentUser={currentUser}
        userAccounts={userAccounts}
        selectedAccount={selectedAccount}
        handleAccountSelect={handleAccountSelect}
      />
      <div className="w-4/5 h-screen">
        <div className="text-center mb-4">
          <h1 className="text-3xl pt-4 font-medium text-blue-500">
            Suitable For Your Child
          </h1>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {currentRecommendations.map((toy) => (
              <div key={toy.id} className="product-container">
                <div className="relative overflow-hidden">
                  <img
                    src={toy.image}
                    alt={toy.name}
                    className="mb-2 transition-transform duration-300 transform hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold">{toy.name}</h3>
                <p className="text-gray-600">{toy.price}</p>
                <Link to={`/products/${toy.id}`}>
                  <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
                    Show Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
