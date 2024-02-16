import "./App.css";
import { Fragment, useState } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { MyContextProvider } from "./MyContext"; // Import your context provider
import FAQ from "./Navbar/Faq";
import ContactUs from "./Navbar/ContactUs";
import AboutUs from "./Navbar/AboutUs/AboutUs";
import RegisterUser from "./Navbar/RegisterUser";
import LoginUser from "./Navbar/LogIn";
import NavBar from "./Navbar/Navbar";
import HomePage from "./Home/HomePage";
import AddPage from "./Components/CRUD/AddPage";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import EditPage from "./Components/CRUD/EditPage";
import ProductPage from "./Components/ProductPage";
import ChildForm from "./Components/ChildForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if there is a token in localStorage
    return !!localStorage.getItem("token");
  });
  const { id: productId } = useParams();

  return (
    <Fragment>
      <Router>
        <MyContextProvider>
          <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/add-product" element={<AddPage />} />
            <Route
              path="/edit-product/:id"
              element={<EditPage productId={productId} />}
            />
            <Route path="/dashboard-page" element={<DashboardPage />} />
            <Route
              path="/product/:id"
              element={<ProductPage productId={productId} />}
            />
            <Route
              path="/login"
              element={<LoginUser setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/child-form" element={<ChildForm />} />
          </Routes>
        </MyContextProvider>
      </Router>
    </Fragment>
  );
}

export default App;
