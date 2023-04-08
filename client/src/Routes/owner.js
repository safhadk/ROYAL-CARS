import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Owner/Login";
import Register from "../Pages/Owner/Register";
import Home from "../Pages/Owner/Home";
import Cars from "../Pages/Owner/Cars";
import AddCar from "../Pages/Owner/AddCar";

function OwnerRoute() {
    const IsAuth = useSelector((state) => state.Owner.Token);
    return (
        <div>
            <Routes>
                <Route path="/" element={IsAuth ?<Home />: <Login />} />
                <Route path="/register" element={IsAuth ? <Home />: <Register />} />
                <Route path="/login" element={IsAuth ? <Home /> : <Login />} />
                <Route path='/cars' element={IsAuth ? <Cars/>:<Navigate to='/owner/login'/>}/>
                <Route path='/add-car' element={IsAuth ? <AddCar/>:<Navigate to='/owner/login'/>}/>    
            </Routes>
        </div>
    );
}

export default OwnerRoute;
