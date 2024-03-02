import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../SideBarWithPagination/Sidebar";
import Pagination from "../SideBarWithPagination/Pagination";
import LoadingAnimation from "../Loading/LoadingAnimation";
import Footer from "../Footer/Footer";
import "./style.css";

const HomePage = () => {
  const productsPerPage = 20;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState(() => ({
    name: localStorage.getItem("fullName") || "Guest",
    isParentUser: true,
    children: [],
  }));
  const [loading, setLoading] = useState(true);
  const [userAccounts, setUserAccounts] = useState([]);
  // Define a function to receive filter data from Sidebar
  const receiveFilterData = (filters) => {
    console.log("Received filter data in HomePage:", filters);
    // Update state or perform any actions based on the received filter data
  };

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
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        );
        setLoading(false); // Set loading state to false in case of error
      }
    };
    fetchData();
  }, [selectedAccount]);

  const handleAccountSelect = (account) => {
    if (account) {
      setSelectedAccount(account);

      setCurrentUser({
        name: account.fullName || "", // Ensure fullName is not accessed if account.fullName is null or undefined
        isParentUser: account.children && account.children.length > 0,
        children: account.children || [],
      });

      if (!account.children) {
        fetchProducts(account.parent_id);
      }
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
    <>
      <div className="flex">
        <Sidebar
          currentUser={currentUser}
          userAccounts={userAccounts}
          selectedAccount={selectedAccount}
          handleAccountSelect={handleAccountSelect}
          sendFilterData={receiveFilterData} // Pass the callback function
        />

        <div className="w-4/5 p-4">
          {loading ? ( // Render loading animation if data is loading
            <LoadingAnimation />
          ) : (
            <div>
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
          )}
        </div>
      </div>
      <div>
      {!loading && <Footer />}
      </div>
    </>
  );
};

export default HomePage;
