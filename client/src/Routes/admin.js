import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";

function AdminRoute() {
    const IsAdminAuth = useSelector((state) => state.Admin.Token);
    return (
        <div>
            <Routes>
                <Route path="/" element={IsAdminAuth ? <AdminHome /> : <Login />} />
                <Route path="/admin_home" element={IsAdminAuth ? <AdminHome /> : <Login />} />
            </Routes>
        </div>
    );
}

export default AdminRoute;
