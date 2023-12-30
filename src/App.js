import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContextProvider } from "./MyContext"; // Import your context provider
import FAQ from "./Navbar/Faq";
import ContactUs from "./Navbar/ContactUs";
import AboutUs from "./Navbar/AboutUs/AboutUs";
import RegisterUser from "./Navbar/RegisterUser";
import NavBar from "./Navbar/Navbar";
import HomePage from "./Home/HomePage";

function App() {
  return (
    <Fragment>
      <Router>
        <MyContextProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            {/* <Route path="/boys" element={<Boys/>} />
        <Route path="/girls" element={<Girls/>} /> */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/register" element={<RegisterUser />} />
            {/* <Route path="/sign-in" element={<SignIn/>} /> */}
          </Routes>
        </MyContextProvider>
      </Router>
    </Fragment>
  );
}

export default App;
