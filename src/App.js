import "./App.css";
import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContextProvider } from "./MyContext"; // Import your context provider
import FAQ from "./Navbar/Faq";
import ContactUs from "./Navbar/ContactUs";
import AboutUs from "./Navbar/AboutUs/AboutUs";
import RegisterUser from "./Navbar/RegisterUser";
import LoginUser from "./Navbar/LogIn";
import NavBar from "./Navbar/Navbar";
import HomePage from "./Home/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <Route path="/login" element={<LoginUser setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </MyContextProvider>
      </Router>
    </Fragment>
  );
}

export default App;
