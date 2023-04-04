import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import UserEditProfile from "../Pages/Clients/EditProfile";
// import UserProfile from "../Pages/Clients/Profile";
import Home from "../Pages/Clients/Home";
import UserLogin from "../Pages/Clients/Login";
import Register from "../Pages/Clients/Register";
import Cars from "../Pages/Clients/Cars";
import Payment from '../Pages/Clients/Payment'

function UserRoute() {
    const IsAuth = useSelector((state) => state.Client.Token);
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={IsAuth ?<Home />:<Register />} />
                <Route path="/login" element={IsAuth? <Home /> : <UserLogin />} />
                <Route path="/cars" element= {<Cars />}/>
                <Route path="/payment" element= {<Payment />}/>
                
            </Routes>
        </div>
    );
}

export default UserRoute;
