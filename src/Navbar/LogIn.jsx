import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const navigate = useNavigate(); 
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
        const response = await axios.post(
          "http://localhost:8000/api/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        console.log("Login successful:", response.data);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
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
              Password
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
      </div>
    </div>
  );
}

export default LogIn;
