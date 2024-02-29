import "./App.css";
import { AuthProvider } from "../src/Navbar/AuthContext";
import { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MyContextProvider } from "./MyContext"; // Import your context provider
import NavBar from "./Navbar/Navbar";
import HomePage from "./Home/HomePage";
import FAQ from "./Navbar/Faq";
import ContactUs from "./Navbar/ContactUs";
import AboutUs from "./Navbar/AboutUs/AboutUs";
import RegisterUser from "./Navbar/RegisterUser";
import LoginUser from "./Navbar/LogIn";
import ChildForm from "./Components/ChildForm";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import ProductPage from "./Components/ProductPage";
import AdminLogin from "./Admin/AdminLogin";
import AdminRegister from "./Admin/AdminRegister";
import { Dashboard, Filter, Recommend } from "@mui/icons-material";
import Recommendations from "./Components/Recommendations";
import SearchResults from "./Components/SearchResults";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import AdminLogout from "./Admin/AdminLogout";
import AddPage from "./Components/CRUD/AddPage";
import EditPage from "./Components/CRUD/EditPage";
import AdminNavbar from "./Admin/AdminNavbar";
import Filters from "./Components/Filters";
import AddToy from "./Components/CRUD/AddToy";
import EditToy from "./Components/CRUD/EditToy";
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
        // ...

        // Redirect to the login page or another appropriate page (if needed)
        // history.push("/login");
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
              <Route path="/filters" element={<Filters />} />
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
