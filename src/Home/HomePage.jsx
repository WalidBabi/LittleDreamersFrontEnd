import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../SideBarWithPagination/Sidebar";
import Pagination from "../SideBarWithPagination/Pagination";

const HomePage = () => {
  const productsPerPage = 20;
  const navigate = useNavigate();
  const { userName } = useParams();

  const [filters, setFilters] = useState({
    Age: false,
    Price: false,
    Category: false,
    Brand: false,
    DevelopmentalBenefits: false,
    SocialEvents: false,
  });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          selectedAccount && !selectedAccount.isParentAccount
            ? `http://localhost:8000/api/products/${selectedAccount.id}`
            : "http://localhost:8000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        );
      }
    };
    fetchData();
  }, [selectedAccount]);

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

  const fetchProducts = async (childId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommendations/${childId}`
      );
      setProducts(response.data);
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

  const totalPages = Math.ceil(products.length / productsPerPage);

  const renderPagination = () => {
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    );
  };

  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const currentProducts = products.slice(startIdx, endIdx);

  return (
    <div className="flex">
      <Sidebar
        currentUser={currentUser}
        userAccounts={userAccounts}
        selectedAccount={selectedAccount}
        handleAccountSelect={handleAccountSelect}
      />

      <div className="w-4/5 p-4">
        <div className="grid grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-container">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-2 transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <Link to={`/products/${product.id}`}>
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
  );
};

export default HomePage;
