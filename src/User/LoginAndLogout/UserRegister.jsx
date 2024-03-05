import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import register_foto from "../../images/register_foto.png";
import { useAuth } from "../../Validation/AuthContext";

function RegisterUser() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
  });

  // New state for the checkbox
  const [isAgreed, setIsAgreed] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  // Handle checkbox state change
  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
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

    if (!isAgreed) {
      // Check if the checkbox is not checked
      hasErrors = true;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/register",
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
          }
        );

        // Create userName by concatenating firstName and lastName
        const userName = `${formData.firstName} ${formData.lastName}`;

        console.log("Registration successful:", response.data);

        // Log in the user after successful registration
        // const loginResponse = await axios.post(
        //   "http://localhost:8000/api/login",
        //   {
        //     email: formData.email,
        //     password: formData.password,
        //   }
        // );

        // Store token in localStorage
        // localStorage.setItem("token", loginResponse.data.token);

        // Set user information in localStorage
        localStorage.setItem("userName", userName);
        localStorage.setItem("isParentUser", response.data.isParentUser);

        setIsLoggedIn(true);
        navigate("/login");
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <div className="items-center justify-between bg-gray-100 max-h-0">
      <div className="flex justify-between p-20 gap-20 items-center ml-10">
        <div className="pl-40 ml-50">
          <img src={register_foto} alt="register_foto" width={500} />
        </div>
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg mr-10">
          <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  First Name cannot be empty.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  Last Name cannot be empty.
                </p>
              )}
            </div>
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
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match. Please try again.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2 text-gray-700">
                  I agree to the{" "}
                  <Link to="/User-product-policy" className="text-blue-500">
                    User Policy and Terms
                  </Link>
                </span>
              </label>
            </div>
            <button
              disabled={!isAgreed} // Disable the button if not agreed
              onClick={handleSubmit}
              className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md ${
                !isAgreed ? "opacity-50 cursor-not-allowed" : "" // Reduce opacity and disable cursor if not agreed
              } hover:bg-blue-600 transition duration-300`}
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
