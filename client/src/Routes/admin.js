import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";
import Users from "../Pages/Admin/Users";
import Owners from "../Pages/Admin/Owners";
import Locations from "../Pages/Admin/Locations";
import AddLocation from "../Pages/Admin/AddLocation";
import OwnerDetails from "../Pages/Admin/OwnerDetails";
import UserDetail from "../Pages/Admin/UserDetail";
import Bookings from "../Pages/Admin/Bookings";
import E404 from "../Components/Common/E404/E404";

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
                <Route path="/owner-details" element={IsAdminAuth ? <OwnerDetails/> : <Login />} />
                <Route path="/user-details" element={IsAdminAuth ? <UserDetail/> : <Login />} />
                <Route path="/bookings" element={IsAdminAuth ? <Bookings/> : <Login />} />
                <Route path='*' element={<E404 link={'/admin'}/>}/>
            </Routes>
        </div>
    );
}

export default AdminRoute;
