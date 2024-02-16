import axios from "axios";

export const sendLogoutRequest = async (logoutEndpoint) => {
  try {
    const response = await axios.post(logoutEndpoint);
    return handleLogoutResponse(response.data);
  } catch (error) {
    return handleLogoutError(error);
  }
};

const handleLogoutResponse = (data) => {
  if (data && data.success) {
    // Successful logout
    return { success: true };
  } else {
    // Logout failure
    const errorMessage = data ? data.message : "Unknown error";
    console.error("Logout failed:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

const handleLogoutError = (error) => {
  // Handle error during logout
  console.error("Error during logout:", error);
  // Display an error message to the user (if needed)
  // ...
  return { success: false, message: "An error occurred during logout." };
};
