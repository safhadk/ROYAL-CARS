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
import BookingDetail from "../Pages/Clients/BookingDetail";
import Profile from "../Pages/Clients/Profile";
import Chat from "../Pages/Clients/Chat";
import E404 from "../Components/Common/E404/E404";
import OTP from "../Pages/Clients/OTP";
function UserRoute() {
    const IsAuth = useSelector((state) => state.Client.Token);
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/otp" element= {<OTP />}/>
                <Route path="/register" element={IsAuth ?<Home />:<Register />} />
                <Route path="/login" element={IsAuth? <Home /> : <UserLogin />} />
                <Route path="/cars" element= {<Cars />}/>
                <Route path="/payment" element= {<Payment />}/>
                <Route path="/bookings" element= {IsAuth ?<Bookings />:  <Navigate to='/login'/>}/>  
                <Route path="/success" element= {IsAuth ? <BookingSuccess /> : <Navigate to='/login'/>}/>  
                <Route path="/bookingDetail" element= {IsAuth ? <BookingDetail /> : <Navigate to='/login'/>}/>  
                <Route path="/profile" element= {IsAuth ? <Profile /> : <Navigate to='/login'/>}/>
                <Route path="/chat" element= {IsAuth ? <Chat /> : <Navigate to='/login'/>}/>
                <Route path='*' element={<E404 link={'/'}/>}/>
            </Routes>
        </div>
    );
}

export default UserRoute;
