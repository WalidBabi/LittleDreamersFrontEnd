import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChildForm = () => {
  const navigate = useNavigate();
  const [parentID, setParentID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Ensure there is a token before making the request
    if (token) {
      axios
        .get("http://localhost:8000/api/user-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setParentID(response.data.parent_id);
        })
        .catch((error) => {
          console.error("Error fetching parent_id:", error);

          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);

            // Handle authentication errors (e.g., token expired)
            if (error.response.status === 401) {
              console.error("Authentication error: Token may be expired");
              // Redirect to login or take appropriate action
            }
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up the request:", error.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    childGender: "",
    childInterests: "",
    childChallenges: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    childName: "",
    childAge: "",
    childInterests: "",
    childChallenges: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear field-specific error message when the user starts typing
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Wait for the parent_id to be fetched before submitting the form
    await fetchParentID();

    // Add parent_id to the form data
    const formDataWithParentID = {
      ...formData,
      parent_id: parentID,
    };

    // Check for empty fields
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const isInterestsAndPreferences = key === "childInterests";
      if (isInterestsAndPreferences) {
        // Check for empty and handle appropriately
        if (formData[key].trim() === "") {
          errors[key] = "This field is required";
        }
      } else {
        // For other fields
        if (formData[key] === "") {
          errors[key] = "This field is required";
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      // Set errors and prevent form submission
      setFieldErrors(errors);
      return;
    }

    // Check if age is not negative
    if (formData.childAge < 0) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        childAge: "Age cannot be negative",
      }));
      return;
    }

    // Replace the following URL with your backend endpoint
    const apiUrl = "http://localhost:8000/api/Form";

    // Send form data to the backend
    axios
      .post(apiUrl, formDataWithParentID)
      .then((response) => {
        console.log("Form submitted successfully!", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      });
  };

  const fetchParentID = async () => {
    // Make the API call to fetch parent_id
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setParentID(response.data.parent_id);
      } catch (error) {
        console.error("Error fetching parent_id:", error);

        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);

          // Handle authentication errors (e.g., token expired)
          if (error.response.status === 401) {
            console.error("Authentication error: Token may be expired");
            // Redirect to login or take appropriate action
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 bg-gray-100">
      <div className="max-w-3xl w-full p-6 bg-white rounded-md shadow-md">
        <div className="mb-4 text-gray-600 bg-gray-300 rounded-md p-4">
          Our website provided toy recommendations from 1 to 10 years old.
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Child Information Section */}
          <fieldset className="border p-4 rounded-md mb-6">
            <legend className="text-lg font-bold mb-2">
              Child Information:
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Child's Name:
                </label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                  className={`mt-1 p-2 w-full border rounded-md ${
                    fieldErrors.childName ? "border-red-500" : ""
                  }`}
                />
                {fieldErrors.childName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.childName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Age:
                </label>
                <input
                  type="number"
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    // Allow the Backspace key
                    if (e.key === "Backspace") {
                      return;
                    }
                    // Prevent typing non-numeric characters
                    if (isNaN(parseInt(e.key))) {
                      e.preventDefault();
                    }
                    // Allow numbers between 1 and 10
                    const validKeys = [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "0",
                    ];
                    if (!validKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                    // Prevent typing '0' or '00'
                    if (e.target.value === "0" || e.target.value === "00") {
                      e.preventDefault();
                    }
                    // Ensure the value does not exceed two digits
                    const newValue = e.target.value + e.key;
                    if (newValue.length > 2 || parseInt(newValue) > 10 || parseInt(newValue) === 0) {
                      e.preventDefault();
                    }
                  }}
                  required
                  min="1"
                  max="10"
                  className={`mt-1 p-2 w-full border rounded-md ${
                    fieldErrors.childAge ? "border-red-500" : ""
                  }`}
                />

                {fieldErrors.childAge && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.childAge}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">
                Gender (Optional):
              </label>
              <select
                id="childGender"
                name="childGender"
                value={formData.childGender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </fieldset>

          {/* Interests and Preferences Section */}
          <fieldset className="border p-4 rounded-md mb-6">
            <legend className="text-lg font-bold mb-2">
              Interests and Preferences:
            </legend>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                What activities does the child enjoy the most? This could
                include playing with toys, games, sports, or any other hobbies
                or interests. Please describe in detail to help us understand
                what brings joy to the child's life.
              </label>
              <textarea
                id="childInterests"
                name="childInterests"
                value={formData.childInterests}
                onChange={handleChange}
                rows="4"
                className={`mt-1 p-2 w-full border rounded-md ${
                  fieldErrors.childInterests ? "border-red-500" : ""
                }`}
              ></textarea>
              {fieldErrors.childInterests && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.childInterests}
                </p>
              )}
            </div>
          </fieldset>

          {/* Challenges or Learning Needs Section */}
          <fieldset className="border p-4 rounded-md mb-6">
            <legend className="text-lg font-bold mb-2">
              Challenges or Learning Needs:
            </legend>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Are there any specific challenges or areas where the child needs
                extra support or attention in their development or learning
                journey? This could include difficulties they may face, such as
                learning disabilities, behavioral challenges, or specific
                educational needs. Please provide as much detail as possible to
                help us tailor our support to the child's unique requirements.
              </label>
              <textarea
                id="childChallenges"
                name="childChallenges"
                value={formData.childChallenges}
                onChange={handleChange}
                rows="4"
                className={`mt-1 p-2 w-full border rounded-md ${
                  fieldErrors.childChallenges ? "border-red-500" : ""
                }`}
              ></textarea>
              {fieldErrors.childChallenges && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.childChallenges}
                </p>
              )}
            </div>
          </fieldset>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChildForm;
