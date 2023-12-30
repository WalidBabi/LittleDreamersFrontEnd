import React, { useState, useEffect } from 'react';

function RegisterUser() {
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem('formData');
    return storedData ? JSON.parse(storedData) : {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { ...errors };

    // Check for empty fields
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = true;
        hasErrors = true;
      }
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      // Perform registration logic here using formData state
      console.log('Form Submitted:', formData);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.firstName ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">First Name cannot be empty.</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.lastName ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">Last Name cannot be empty.</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.email ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email cannot be empty.</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.password ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password cannot be empty.</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match. Please try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
