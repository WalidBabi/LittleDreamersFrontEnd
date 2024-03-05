// ParentComponent.js

import React, { useState } from "react";
import NavBar from "./Navbar";
import LogIn from "./LogIn";

function ParentComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <LogIn setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default ParentComponent;
