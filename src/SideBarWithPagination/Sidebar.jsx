import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  currentUser,
  userAccounts,
  selectedAccount,
  handleAccountSelect,
}) => {
  return (
    <div className="w-72 bg-gray-200 p-4 max-h-full flex flex-col overflow-y-auto border-r border-gray-300">
      {/* Account Dropdown with scrolling */}
      <div className="mb-4">
        <div className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer transition duration-300 hover:bg-gray-200">
          <div>
            <h2 className="text-lg font-semibold">
              {currentUser.name || "Guest"}
            </h2>
          </div>
          {currentUser.name && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => handleAccountSelect(null)} // Reset selected account
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          )}
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
                <h2
                  className={`text-lg font-semibold ${
                    selectedAccount &&
                    selectedAccount.parent_id === account.parent_id
                      ? "text-blue-500"
                      : "text-gray-800"
                  } hover:text-blue-500 focus:text-blue-500 outline-none`}
                >
                  <Link to="/"> {account.fullName}</Link>
                </h2>
                <hr className="my-4 border-t-2 border-gray-300" />
                {/* Render children if they exist */}
                {account.children.length > 0 && (
                  <div>
                    {account.children.map((child, index) => (
                      <React.Fragment key={child.child_id} className="mt-2">
                        <div className="p-2 hover:bg-gray-100 transition duration-300">
                          <h3
                            className={`text-sm ${
                              selectedAccount &&
                              selectedAccount.parent_id === account.parent_id
                                ? "text-blue-500"
                                : "text-gray-800"
                            } hover:text-gray-700 focus:bg-gray-700 outline-none`}
                          >
                            <Link to={`/recommendations/${child.child_id}`}>
                              {child.name}
                            </Link>
                          </h3>
                        </div>
                        {/* Add hr divider after each row except the last one */}
                        {index !== account.children.length - 1 && (
                          <hr className="my-2 border-t-2 border-gray-200" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-t-2 border-gray-300" />
    </div>
  );
};

export default Sidebar;
