import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import log_in_foto from "../images/log_in_foto.png";
import style from "./style.css";

function LogIn({ setIsLoggedIn }) {
  const navigate = useNavigate();
  // const { updateToken } = useAuth(); // Use useAuth to get updateToken function

  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          email: "",
          password: "",
        };
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = true;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: formData.email,
          password: formData.password,
        });

        // Use the updateToken function from useAuth to update the token
        // updateToken(response.data.token);

        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("isParentUser", response.data.isParentUser);

        // Set token in Axios headers for subsequent requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log("login successful:", response.data);
        setIsLoggedIn(true);
        navigate("/");
      } catch (error) {
        if (error.response) {
          console.error(
            "Server responded with a status code:",
            error.response.status
          );
          console.error("Server response data:", error.response.data);

          const errorMessage = error.response.data?.message; // Use optional chaining

          if (errorMessage) {
            let errorText = "An error occurred. Please try again later.";

            if (errorMessage.includes("duplicate")) {
              errorText =
                "Username or email already exists. Please use a different one.";
            } else if (errorMessage.includes("short")) {
              errorText =
                "Password is too short. Please use a longer password.";
            } else if (errorMessage.includes("not found")) {
              errorText = "User not found. Please check your credentials.";
            } else if (errorMessage.includes("invalid")) {
              errorText =
                "Invalid credentials. Please check your email and password.";
            }

            setErrorMessage(errorText);
          } else {
            setErrorMessage("An error occurred. Please try again later.");
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          setErrorMessage(
            "No response received from the server. Please try again later."
          );
        } else {
          console.error("Error:", error.message);
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className="items-center justify-between h-screen bg-gray-100">
      <div className="p-20 flex justify-center gap-20 items-center">
        <div className="pl-50 ml-50">
          <img src={log_in_foto} alt="log-in-foto" />
        </div>
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-4">Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  Email cannot be empty.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.password ? "border-red-500" : ""
                }`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password cannot be empty.
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register here
            </Link>
            .
          </p>
        </div>
      </div>
      {errorMessage && (
        <div className="error-modal">
          <div className="error-content">
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogIn;
