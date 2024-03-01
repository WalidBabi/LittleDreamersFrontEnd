import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditToy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    product: {
      name: "",
      price: 1,
      quantity: 1,
      image: null,
    },
    description: {
      age: 1,
      category: "",
      gender: "",
      description: "",
      company: "",
      holiday: "",
      skill_development: "",
      play_pattern: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({
    image: "", // Add other properties if needed
  });

  // ... (previous code)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );

        // Set form data with the fetched values
        const { product, description } = response.data;

        setFormData((prevData) => ({
          ...prevData,
          product: {
            name: product?.name || "",
            price: product?.price || 1,
            quantity: product?.quantity || 1,
            image: product?.image || "",
          },
          description: {
            age: description?.age || 1,
            category: description?.category || "",
            gender: description?.gender || "",
            description: description?.description || "",
            company: description?.company?.name || "",
            holiday: description?.holiday || "",
            skill_development: description?.skill_development || "",
            play_pattern: description?.play_pattern || "",
          },
          company: description?.company?.name || "",
        }));

        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching toy details:", error);
        // Handle error (e.g., redirect to an error page)
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "company") {
      // If the changed field is 'company', update it separately
      setFormData((prevData) => ({
        ...prevData,
        company: value,
      }));
    } else {
      // Otherwise, update the 'description' fields as before
      setFormData((prevData) => ({
        ...prevData,
        product: {
          ...prevData.product,
          [name]: type === "file" ? e.target.files[0] : value,
        },
        description: {
          ...prevData.description,
          [name]: value,
        },
      }));
    }

    // If the input is an image, update the image preview
    if (type === "file" && e.target.files.length > 0) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    // Clear the error when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product.name || !formData.product.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.product.image) {
      newErrors.image = "Image is required";
    }

    if (
      !formData.description.description ||
      !formData.description.description.trim()
    ) {
      newErrors.description = "Description is required";
    }

    if (!formData.company || !formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (
      !formData.description.category ||
      !formData.description.category.trim()
    ) {
      newErrors.category = "Category is required";
    }

    if (!formData.description.gender || !formData.description.gender.trim()) {
      newErrors.gender = "Gender is required"; // Fix the property name here
    }

    if (!formData.description.holiday || !formData.description.holiday.trim()) {
      newErrors.holiday = "Holiday is required";
    }

    if (
      !formData.description.skill_development ||
      !formData.description.skill_development.trim()
    ) {
      newErrors.skill_development = "Skill Development is required";
    }

    if (
      !formData.description.play_pattern ||
      !formData.description.play_pattern.trim()
    ) {
      newErrors.play_pattern = "PlayPattern is required";
    }

    if (!formData.product.price || isNaN(formData.product.price)) {
      newErrors.price = "Price is required and must be a valid number";
    }

    if (!formData.product.quantity || isNaN(formData.product.quantity)) {
      newErrors.quantity = "Quantity is required and must be a valid number";
    }

    if (!formData.description.age || isNaN(formData.description.age)) {
      newErrors.age = "Age is required and must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const dataToSend = {};

      // Append product data
      Object.keys(formData.product).forEach((key) => {
        dataToSend[key] = formData.product[key];
      });

      // Append description data
      Object.keys(formData.description).forEach((key) => {
        // Handle the 'company' field separately
        if (key === "company") {
          dataToSend["company"] = formData[key];
        } else {
          dataToSend[key] = formData.description[key];
        }
      });

      console.log("Data before request:", dataToSend);

      const response = await axios.put(
        `http://localhost:8000/api/edit-product/${id}`,
        dataToSend
      );

      console.log("Server response:", response.data);
      navigate("/dashboard-page");
    } catch (error) {
      console.error("Error editing toy:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading message or animation
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-4/5 p-6 m-6 rounded-md shadow-lg">
        <h2 className="text-3xl text-white p-2 rounded-md font-medium mb-6 text-center shadow-lg bg-blue-500">
          Edit Toy
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
                value={formData.product.name}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 pt-4 flex">
              <div className="w-3/4 pr-2">
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
              <div className="w-1/4 pl-2">
                {formData.product.image && (
                  <div className="mt-2">
                    <img
                      src={formData.product.image || formData.product.image}
                      alt="Product"
                      className="w-30 h-30 shadow-md rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4 pt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="text"
                name="description"
                placeholder="Enter description name"
                value={formData.description.description}
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
                value={formData.description.category}
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
                value={formData.description.gender}
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
                value={formData.description.holiday}
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
                value={formData.description.skill_development}
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
                value={formData.description.play_pattern}
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
                value={formData.product.price}
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
                value={formData.product.quantity}
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
                value={formData.description.age}
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

export default EditToy;
