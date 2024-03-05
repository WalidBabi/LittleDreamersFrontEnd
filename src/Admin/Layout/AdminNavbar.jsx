import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo-admin.png";

function AdminNavbar({ setIsLoggedIn }) {
  const [issAdmin, setIssAdmin] = useState(
    localStorage.getItem("adminToken") ? true : false
  );
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmLogout = async () => {
    // const logoutEndpoint = "http://localhost:8000/api/logout";
    // const adminToken = localStorage.getItem("adminToken");
    // try {
    //   if (!adminToken) {
    //     throw new Error("No adminToken found");
    //   }
    //   await axios.post(
    //     logoutEndpoint,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${adminToken}`,
    //       },
    //     }
    //   );

    // Clear user authentication state
    // Redirect to the login page or another appropriate page (if needed)
    //   navigate("/admin-login");
    // } catch (error) {
    //   console.error("Error during logout:", error.message);
    // } finally {
    //   // This should be moved outside the try block to ensure it's only executed after a successful request
    // }

    // setIsLoggedIn(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("issAdmin");
    setIssAdmin(false);
    // Redirect to the login page or another appropriate page (if needed)
    // Show confirmation modal only after the request has been completed
    setShowConfirmation(true);
    navigate("/admin-login");
  };

  const handleCancelLogout = () => {
    // Close the confirmation modal
    setShowConfirmation(false);
  };

  return (
    <div className="bg-gray-800 py-3 px-8 flex items-center justify-between">
      {/* Logo on the left */}
      <Link to="/dashboard-page" className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-70" />
      </Link>

      {/* Navigation Links in the center */}
      <div className="flex justify-center pr-40 space-x-6">
        <Link to="/" className="nav-link text-white hover:text-red-500">
          Home
        </Link>
        <Link
          to="/dashboard-page"
          className="nav-link text-white hover:text-red-500"
        >
          Dashboard
        </Link>
      </div>

      {/* Login/Logout Button on the right */}
      <div>
        {issAdmin ? (
          <button
            onClick={handleConfirmLogout}
            className="text-white hover:text-red-500"
          >
            Logout
          </button>
        ) : (
          <Link to="/admin-login" className="text-white hover:text-red-500">
            Login
          </Link>
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
                onClick={handleConfirmLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              >
                Yes
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
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

export default AdminNavbar;
