import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";
import Users from "../Pages/Admin/Users";
import Owners from "../Pages/Admin/Owners";
import Locations from "../Pages/Admin/Locations";
import AddLocation from "../Pages/Admin/AddLocation";

function AdminRoute() {
    const IsAdminAuth = useSelector((state) => state.Admin.Token);
    return (
        <div>
            <Routes>
                <Route path="/" element={IsAdminAuth ? <AdminHome /> : <Login />} />
                <Route path="/admin_home" element={IsAdminAuth ? <AdminHome /> : <Login />} />
                <Route path="/users" element={IsAdminAuth ? <Users/> : <Login />} />
                <Route path="/owners" element={IsAdminAuth ? <Owners/> : <Login />} />
                <Route path="/locations" element={IsAdminAuth ? <Locations/> : <Login />} />
                <Route path="/add-location" element={IsAdminAuth ? <AddLocation/> : <Login />} />
           
                
            </Routes>
        </div>
    );
}

export default AdminRoute;
