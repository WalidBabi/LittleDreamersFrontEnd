import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddToy = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    price: 1,
    quantity: 1,
    age: 1,
    category: "",
    gender: "",
    description: "",
    company: "",
    holiday: "",
    skill_development: "",
    play_pattern: "",
    image: null, // added image property
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
    // Clear the error when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Add validation checks here
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    // Add more validation checks for other fields

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "http://localhost:8000/api/add-product",
        formDataToSend
      );

      console.log("Server response:", response.data);
      navigate("/dashboard-page");
    } catch (error) {
      console.error("Error adding toy:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-4/5 p-6 m-6 rounded-md shadow-lg">
        <h2 className="text-3xl text-white p-2 rounded-md font-medium mb-6 text-center shadow-lg bg-blue-500">
          Add Toy
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 pt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter toy name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                name="description"
                placeholder="Enter description name"
                value={formData.description}
                onChange={handleChange}
                className={`w-full mt-1 h-32 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Enter category name"
                value={formData.category}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="holiday"
                className="block text-sm font-medium text-gray-700"
              >
                Holiday
              </label>
              <input
                type="text"
                id="holiday"
                name="holiday"
                placeholder="Enter holiday name"
                value={formData.holiday}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="skill_development"
                className="block text-sm font-medium text-gray-700"
              >
                Skill Development
              </label>
              <input
                type="text"
                id="skill_development"
                name="skill_development"
                placeholder="Enter skill_development name"
                value={formData.skill_development}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="play_pattern"
                className="block text-sm font-medium text-gray-700"
              >
                Play Pattern
              </label>
              <input
                type="text"
                id="play_pattern"
                name="play_pattern"
                placeholder="Enter play_pattern name"
                value={formData.play_pattern}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter price name"
                value={formData.price}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter quantity name"
                value={formData.quantity}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter age name"
                value={formData.age}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 mb-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToy;
