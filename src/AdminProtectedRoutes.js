import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AddPage from "./Components/CRUD/AddPage";
import EditPage from "./Components/CRUD/EditPage";
import AdminRegister from "./Admin/AdminRegister";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import AdminLogin from "./Admin/AdminLogin";

const AdminProtectedRoutes = ({ isLoggedIn, isAdmin }) => {
  return (
    <Routes>
      <Route
        path="/add-product"
        element={isLoggedIn ? <AddPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/edit-product/:id"
        element={isLoggedIn ? <EditPage /> : <Navigate to="/" replace />}
      />
      {/* <Route
        path="/admin-register"
        element={isLoggedIn ? <Navigate to="/" replace /> : <AdminRegister />}
      /> */}

      {/* {isLoggedIn && isAdmin ? (
        <Route path="/dashboard-page" element={<Navigate to="/dashboard-page" replace />} />
      ) : (
        <Route path="/admin-register" element={<AdminRegister />} />
      )} */}

      {/* <Route
        path="/dashboard-page"
        element={
          isLoggedIn ? (
            isAdmin ? (
              <DashboardPage />
            ) : (
              <Navigate to="/admin-login" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="/admin-login" element={<AdminLogin />} /> */}
    </Routes>
  );
};

export default AdminProtectedRoutes;
