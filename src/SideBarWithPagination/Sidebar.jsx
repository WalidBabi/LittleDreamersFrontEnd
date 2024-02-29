import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingAnimation from "../Loading/LoadingAnimation";
import axios from "axios"; // Import axios for making HTTP requests
import arrow from "../images/arrow.svg";

const Sidebar = ({
  currentUser,
  userAccounts,
  selectedAccount,
  handleAccountSelect,
  sendFilterData, // Add the callback function to receive filter data
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    category: [],
    age: [],
    holiday: [],
    skill_development: [],
    companies: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    age: [],
    holiday: [],
    skill_development: [],
    companies: [],
    price: { min: 5, max: 140 }, // Initial price range from $5 to $140
  });

  const [activeHeader, setActiveHeader] = useState(null);

  // Fetch filter data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/filter");
        setFilterData(response.data || {});
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        // Whether success or error, set loading to false
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/filterResults");
        setFilterData(response.data || {});
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        // Whether success or error, set loading to false
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simulate loading delay with setTimeout
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Adjust the delay time as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(delay);
  }, []); // Run only once on component mount

  // Define options for select
  const options = {
    category:
      userAccounts?.category?.map((category) => ({
        value: category,
        label: category,
      })) || [],
    age: userAccounts?.age?.map((age) => ({ value: age, label: age })) || [],
    holiday:
      userAccounts?.holiday?.map((holiday) => ({
        value: holiday,
        label: holiday,
      })) || [],
    skill_development:
      userAccounts?.skill_development?.map((skill) => ({
        value: skill,
        label: skill,
      })) || [],
    companies: Object.entries(userAccounts?.companies || {}).map(
      ([key, value]) => ({
        value: key,
        label: value,
      })
    ),
  };

  const handleApplyFilters = () => {
    // Send the selected filters via Axios API call
    axios
      .post("http://localhost:8000/api/filterSubmit", selectedFilters)
      .then((response) => {
        console.log("Filters sent successfully:", selectedFilters);
      })
      .catch((error) => {
        console.error("Error sending filters:", error);
      });
    //setActiveHeader(false);
  };

  const handleCancelFilter = () => {
    setSelectedFilters({
      category: [],
      age: [],
      holiday: [],
      skill_development: [],
      companies: [],
      price: { min: 5, max: 140 }, // Reset price range to initial values
    });
    setActiveHeader(false);
  };

  const handleHeaderClick = (header) => {
    setActiveHeader(activeHeader === header ? null : header);
  };

  return (
    <div className="w-80 bg-gray-200 p-4 max-h-full flex flex-col overflow-y-auto border-r border-gray-300">
      {/* Account Dropdown with scrolling */}
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="mb-4">
          {Array.isArray(userAccounts) &&
            userAccounts.some((account) => account.fullName) && (
              <div className="bg-white p-2 rounded-md shadow-md flex items-center justify-between cursor-pointer transition duration-300 hover:bg-gray-100">
                {userAccounts.map((account) => (
                  <Link to="/" key={account.parent_id}>
                    <h2 className="text-xl pl-2 pt-2 font-semibold text-gray-800">
                      {account.fullName}
                    </h2>
                  </Link>
                ))}
                <div>
                  <Link to="/child-form">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => handleAccountSelect(null)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

          <div className="bg-white mt-4 rounded shadow-md">
            {Array.isArray(userAccounts) &&
              userAccounts.map((account) => (
                <div
                  key={account.parent_id}
                  onClick={() => handleAccountSelect(account)}
                  className={`p-2 ${
                    selectedAccount &&
                    selectedAccount.parent_id === account.parent_id
                      ? "bg-gray-100"
                      : ""
                  }`}
                >
                  {account.children.length > 0 && (
                    <div>
                      {account.children.map((child, index) => (
                        <React.Fragment key={child.child_id}>
                          <div className="p-2 hover:bg-gray-100 transition duration-300">
                            <h3
                              className={`text-md font-sans ${
                                selectedAccount &&
                                selectedAccount.parent_id === account.parent_id
                                  ? selectedAccount.child_id === child.child_id
                                    ? "text-blue-500"
                                    : "text-black"
                                  : "text-black"
                              }`}
                              style={{
                                cursor: "pointer",
                                marginTop: "0.25rem",
                              }}
                            >
                              <Link to={`/recommendations/${child.child_id}`}>
                                {child.name}
                              </Link>
                            </h3>
                          </div>
                          {index !== account.children.length - 1 && (
                            <hr className="my-2 border-t-2 border-gray-300" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="filter-options p-4 bg-white rounded-md shadow-md font-medium-semibold">
            {Object.keys(filterData).map((filterType, index) => (
              <div key={index} className="filter">
                <h3
                  onClick={() => handleHeaderClick(filterType)}
                  className="flex justify-between items-center"
                >
                  {filterType}
                  <img src={arrow} className="h-3" alt="Your SVG" />
                </h3>
                {activeHeader === filterType && (
                  <div
                    className="options"
                    style={{
                      maxHeight: "800px",
                      overflowY: "auto",
                      color: "black",
                    }}
                  >
                    <hr className="my-2 border-t-2" />
                    {Object.keys(filterData[filterType]).map((key) => (
                      <label key={key} className="checkbox-label pl-3">
                        <input
                          type="checkbox"
                          value={key}
                          className="m-2"
                          checked={selectedFilters[filterType].includes(key)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            const selectedOptions = [
                              ...selectedFilters[filterType],
                            ];
                            if (isChecked) {
                              selectedOptions.push(value);
                            } else {
                              const index = selectedOptions.indexOf(value);
                              if (index !== -1) {
                                selectedOptions.splice(index, 1);
                              }
                            }
                            setSelectedFilters((prevFilters) => ({
                              ...prevFilters,
                              [filterType]: selectedOptions,
                            }));
                          }}
                        />
                        {filterData[filterType][key]}
                        <hr className="my-4 border-t-2 border-gray-300" />
                      </label>
                    ))}
                  </div>
                )}
                <hr className="my-4 border-t-2 border-gray-300" />
              </div>
            ))}

            <div className="price-range mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range:
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="range"
                  min="5"
                  max="140"
                  step="30"
                  value={selectedFilters.price.min}
                  onChange={(e) => {
                    const minPrice = parseInt(e.target.value);
                    setSelectedFilters((prevFilters) => ({
                      ...prevFilters,
                      price: {
                        ...prevFilters.price,
                        min: minPrice,
                        max: minPrice + 30 > 140 ? 140 : minPrice + 30,
                      },
                    }));
                  }}
                  className="appearance-none w-full h-2 bg-gray-300 rounded-full outline-none"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <div>$5</div>
                <div>$140</div>
              </div>
              <div className="price-text mt-2 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <div className="w-1/4 h-1 bg-gray-500"></div>
                  <div className="text-lg font-semibold">
                    ${selectedFilters.price.min} - ${selectedFilters.price.max}
                  </div>
                  <div className="w-1/4 h-1 bg-gray-500"></div>
                </div>
              </div>
            </div>

            <div className="button-group pt-4">
              <button
                className="apply-button rounded-md bg-blue-500 text-white border-l-gray-600 p-2 px-3"
                onClick={handleApplyFilters}
              >
                Apply Filter
              </button>
              <span className="p-1"></span>
              <button
                className="cancel-button rounded-md bg-white text-black border-black p-2 px-3"
                onClick={handleCancelFilter}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
