import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [logoutCompleted, setLogoutCompleted] = useState(false);

  useEffect(() => {
    const logoutAdmin = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");

        if (!adminToken) {
          navigate("/admin-login");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        };

        const response = await axios.post(
          "http://localhost:8000/api/logout",
          null,
          config
        );

        if (response.status === 200) {
          localStorage.removeItem("adminToken");
          setMessage("Logout successful");
        } else {
          setMessage(
            "Logout failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        console.error("Error occurred during logout:", error.message);
        setMessage("Error occurred during logout. Please try again later.");
      } finally {
        // Set logout completed to true
        setLogoutCompleted(true);
      }
    };
    logoutAdmin();
  }, [navigate]);
  
  useEffect(() => {
    // Redirect after 8 seconds only if logout process completed
    if (logoutCompleted) {
      const redirectTimer = setTimeout(() => {
        navigate("/admin-login");
      }, 8000);

      return () => clearTimeout(redirectTimer);
    }
  }, [navigate, logoutCompleted]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-lg">
        {message && (
          <div
            className={`${
              message.includes("successful") ? "bg-green-100" : "bg-red-100"
            } border ${
              message.includes("successful")
                ? "border-green-400"
                : "border-red-400"
            } text-gray-700 px-4 py-3 rounded mb-4`}
          >
            <strong className="font-bold">
              {message.includes("successful") ? "Success!" : "Error!"}
            </strong>{" "}
            {message}
          </div>
        )}
        {/* Only display "Logging out..." if logout process completed */}
        {logoutCompleted && (
          <div className="mt-4 text-center text-gray-600">Logging out...</div>
        )}
      </div>
    </div>
  );
};

export default AdminLogout;
