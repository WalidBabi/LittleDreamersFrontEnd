import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MyContextProvider } from "./Context/MyContext"; // Import your context provider
import AdminRegister from "./Admin/LoginAndLogout/AdminRegister";
import AdminLogin from "./Admin/LoginAndLogout/AdminLogin";
import AdminLogout from "./Admin/LoginAndLogout/AdminLogout";
import AdminNavbar from "./Admin/Layout/AdminNavbar";
import AddToy from "./Admin/Crud/AddToy";
import EditToy from "./Admin/Crud/EditToy";
import DashboardPage from "./Admin/Dashboard/DashboardPage";
import RegisterUser from "./User/LoginAndLogout/UserRegister";
import LoginUser from "./User/LoginAndLogout/UserLogin";
import NavBar from "./Layout/Navbar/Navbar";
import HomePage from "./Components/Home/HomePage";
import FAQ from "./Components/StaticPages/Faq";
import ContactUs from "./Components/StaticPages/ContactUs";
import AboutUs from "./Components/StaticPages/AboutUs/AboutUs";
import ChildForm from "./Components/ChildForm";
import ProductPage from "./Components/ProductPage";
import Recommendations from "./Components/DynamicPages/Recommendations";
import SearchResults from "./Components/DynamicPages/SearchResults";
import PolicyComponent from "./Components/Policy/PolicyComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if there is a token in localStorage
    return !!localStorage.getItem("token");
  });
  const isAdmin = localStorage.getItem("adminToken");
  const issAdmin = isAdmin ? true : false;
  // console.log("isAdmin", issAdmin);

  useEffect(() => {
    const handleUserActivity = () => {
      // Clear existing timeout
      clearTimeout(activityTimeout);

      // Set a new timeout to logout after 30 minutes of inactivity
      const timeoutId = setTimeout(() => {
        // Perform logout or token clearing logic here
        console.log("User inactive for 30 minutes. Logging out...");
        setIsLoggedIn(false);
        // Clear tokens or session data on the client side (if applicable)
        // navigate("/login");
      }, 30 * 60 * 1000); // 30 minutes in milliseconds

      // Save the timeout ID
      setActivityTimeout(timeoutId);
    };

    const handleMouseMove = () => {
      handleUserActivity();
    };

    const handleKeyDown = () => {
      handleUserActivity();
    };

    // Set an initial timeout to logout after 30 minutes of inactivity
    handleUserActivity();

    // Attach event listeners for user activity
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // No dependencies to avoid triggering on every render

  const [activityTimeout, setActivityTimeout] = useState(null);

  return (
    <AuthProvider>
      <Fragment>
        <Router>
          <MyContextProvider>
            {/* Hide NavBar when isAdmin is true or the path is "/admin-login" or "/admin-register" */}
            {!isAdmin &&
              !["/admin-login", "/admin-register"].includes(
                window.location.pathname
              ) && (
                <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              )}

            {/* AdminNavbar is rendered conditionally for admin routes */}
            {issAdmin && <AdminNavbar />}

            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route
                path="/User-product-policy"
                element={<PolicyComponent />}
              />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route
                path="/recommendations/:id"
                element={<Recommendations />}
              />
              {isLoggedIn ? (
                <Route path="/register" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/register" element={<RegisterUser />} />
              )}
              {isLoggedIn ? (
                <Route path="/login" element={<Navigate to="/" replace />} />
              ) : (
                <Route
                  path="/login"
                  element={<LoginUser setIsLoggedIn={setIsLoggedIn} />}
                />
              )}

              {isLoggedIn ? (
                <Route path="/" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/admin-login" element={<AdminLogin />} />
              )}

              {isLoggedIn ? (
                <Route path="/" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/admin-Register" element={<AdminRegister />} />
              )}

              {!isLoggedIn ? (
                <Route path="/" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/child-form" element={<ChildForm />} />
              )}

              {!issAdmin ? (
                <Route path="/" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/dashboard-page" element={<DashboardPage />} />
              )}

              {!issAdmin ? (
                <Route path="/" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/add-toy" element={<AddToy />} />
              )}

              {!issAdmin ? (
                <Route path="/" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/edit-toy/:id" element={<EditToy />} />
              )}

              {!issAdmin ? (
                <Route path="/" element={<Navigate to="/" replace />} />
              ) : (
                <Route path="/admin-logout" element={<AdminLogout />} />
              )}
              <Route path="*" element={<Navigate to="/" replace />} />

              {/* <Route path="/dashboard-page" element={<DashboardPage />} /> */}
            </Routes>
          </MyContextProvider>
        </Router>
      </Fragment>
    </AuthProvider>
  );
}

export default App;
