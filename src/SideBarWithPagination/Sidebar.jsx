  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import LoadingAnimation from "../Loading/LoadingAnimation";

  const Sidebar = ({
    currentUser,
    userAccounts,
    selectedAccount,
    handleAccountSelect,
  }) => {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading delay with setTimeout
    useEffect(() => {
      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 1600); // Adjust the delay time as needed

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(delay);
    }, []); // Run only once on component mount

    return (
      <div className="w-72 bg-gray-200 p-4 max-h-full flex flex-col overflow-y-auto border-r border-gray-300">
        {/* Account Dropdown with scrolling */}
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          currentUser.name !== "Guest" &&
          currentUser.name !== null && (
            <div className="mb-4">
              <div className="bg-white p-4 flex items-center justify-between cursor-pointer transition duration-300 hover:bg-gray-300">
                <Link to="/">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {currentUser.name || "Guest"}
                    </h2>
                  </div>
                </Link>
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
              <div className="bg-white mt-4 rounded shadow-md">
                {Array.isArray(userAccounts) &&
                  userAccounts.map((account) => (
                    <div
                      key={account.parent_id}
                      onClick={() => handleAccountSelect(account)}
                      className={`p-4 ${
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
                              <div className="p-1 hover:bg-gray-300 transition duration-300">
                                <h3
                                  className={`text-lg font-medium ${
                                    selectedAccount &&
                                    selectedAccount.parent_id ===
                                      account.parent_id
                                  }`}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Link to={`/recommendations/${child.child_id}`}>
                                    {child.name}
                                  </Link>
                                </h3>
                              </div>
                              {index !== account.children.length - 1 && (
                                <hr className="my-4 border-t-2 border-gray-300" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )
        )}
        {/* Divider */}
        <hr className="my-4 border-t-2 border-gray-300" />
      </div>
    );
  };

  export default Sidebar;
