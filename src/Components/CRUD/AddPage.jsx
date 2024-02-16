import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddPage.css";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Toy Name is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
  quantity: Yup.number().required("Quantity is required"),
  category: Yup.string().required("Category is required"),
  age: Yup.string().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  company: Yup.string().required("Company is required"),
  holiday: Yup.string().required("Holiday is required"),
  cognitiveDevelopment: Yup.string().required(
    "Cognitive Development is required"
  ),
  skillDevelopment: Yup.string().required(
    "Motor Skills Development is required"
  ),
  playPattern: Yup.string().required("Social Development is required"),
  emotionalDevelopment: Yup.string().required(
    "Emotional Development is required"
  ),
  languageAndLiteracy: Yup.string().required(
    "Language and Literacy is required"
  ),
});

const initialValues = {
  name: "",
  price: "",
  description: "",
  image: "",
  quantity: "",
  category: "",
  age: "",
  gender: "",
  company: "",
  holiday: "",
  cognitiveDevelopment: "",
  skillDevelopment: "",
  playPattern: "",
};

const categories = ["Category A", "Category B", "Category C"];
const ages = ["0-2 years", "3-5 years", "6-8 years", "9-12 years"];
const genders = ["Male", "Female"];
const companies = ["Company A", "Company B", "Company C"];
const holidays = ["Holiday A", "Holiday B", "Holiday C"];
const skillDevelopments = [
  "skillDevelopment A",
  "skillDevelopment B",
  "skillDevelopment C",
];
const playPatterns = ["playPattern A", "playPattern B", "playPattern C"];

const AddPage = () => {
  const [isSuccess, setIsSuccess] = useState(false); // State variable for success status

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Create a new FormData object for handling file uploads
      const formData = new FormData();

      // Append non-file fields to FormData
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);
      formData.append("age", values.age);
      formData.append("gender", values.gender);
      formData.append("company", values.company);
      formData.append("holiday", values.holiday);
      formData.append("cognitiveDevelopment", values.cognitiveDevelopment);
      formData.append("skillDevelopment", values.skillDevelopment);
      formData.append("playPattern", values.playPattern);

      // Append the file (image) to FormData
      formData.append("image", values.image);

      // Assuming you have an API endpoint to add a new toy
      const response = await axios.post("/api/toys", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Log the response from the server (you can handle it based on your needs)
      console.log("Server response:", response.data);

      // Reset the form or perform any other actions after successful submission
      // Redirect to the dashboard page after successful submission
      navigate("/dashboard"); // Change "/dashboard" to your desired route
    } catch (error) {
      console.error("Error submitting toy data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Toy</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="4"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <Field
                type="file"
                id="image"
                name="image"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                category
              </label>
              <Field
                as="select"
                id="age"
                name="age"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <Field
                as="select"
                id="age"
                name="age"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Select Age
                </option>
                {ages.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <Field
                as="select"
                id="company"
                name="company"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Select Company
                </option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="company"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="holiday"
                className="block text-sm font-medium text-gray-700"
              >
                Holiday
              </label>
              <Field
                as="select"
                id="holiday"
                name="holiday"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Select Holiday
                </option>
                {holidays.map((holiday) => (
                  <option key={holiday} value={holiday}>
                    {holiday}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="holiday"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="skillDevelopment"
                className="block text-sm font-medium text-gray-700"
              >
                Skill Development
              </label>
              <Field
                as="select"
                id="skillDevelopment"
                name="skillDevelopment"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Skill Development
                </option>
                {skillDevelopments.map((skillDevelopment) => (
                  <option key={skillDevelopment} value={skillDevelopment}>
                    {skillDevelopment}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="skillDevelopment"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="playPattern"
                className="block text-sm font-medium text-gray-700"
              >
                Play Pattern
              </label>
              <Field
                as="select"
                id="playPattern"
                name="playPattern"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Play Pattern
                </option>
                {playPatterns.map((playPattern) => (
                  <option key={playPattern} value={playPattern}>
                    {playPattern}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="playPattern"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`w-full py-2 px-4 mb-4 ${
              isSuccess ? "bg-green-500" : "bg-blue-500"
            } text-white font-semibold rounded-md hover:${
              isSuccess ? "bg-green-600" : "bg-blue-600"
            } transition duration-300`}
          >
            {isSuccess ? "Success!" : "Submit"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddPage;
