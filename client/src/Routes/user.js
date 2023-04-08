import React from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Home from "../Pages/Clients/Home";
import UserLogin from "../Pages/Clients/Login";
import Register from "../Pages/Clients/Register";
import Cars from "../Pages/Clients/Cars";
import Payment from '../Pages/Clients/Payment'
import Bookings from "../Pages/Clients/Bookings";
import BookingSuccess from "../Pages/Clients/BookingSuccess";

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
                <Route path="/bookings" element= {IsAuth ?<Bookings />:  <Navigate to='/login'/>}/>  
                <Route path="/success" element= {IsAuth ? <BookingSuccess /> : <Navigate to='/login'/>}/>  
            </Routes>
        </div>
    );
}

export default UserRoute;
