

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import React,{ useEffect } from "react";

import axios from "../../../Axios/ownerAxios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BookingsChart() {
    const [monthlyWiseBooking,setMonthlyWiseBooking]=useState([])
    let token = useSelector((state) => state.Owner.Token);
    const navigate=useNavigate();
    
    
  if (!token) {
    console.log("no token")
    navigate("/owner");
  }
      
    const monthlyWiseBookings = async () => {
        try {
          console.log("useeffect working");
          const { data } = await axios.get("/monthlywisebookings", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMonthlyWiseBooking(JSON.parse(data))
          console.log(data)
         
        } catch (error) {
          console.log(error.message,"error in useeffect");
        }
      }
    
      useEffect(() => {
        monthlyWiseBookings();
      }, []);
  
  return (
    
      
    <ResponsiveContainer width="100%">


    <BarChart data={monthlyWiseBooking}>
      <XAxis dataKey="month" stroke="#2884ff" />
      <Bar dataKey="bookings" stroke="#2884ff" fill="#2884ff" barSize={30} />

      <Tooltip wrapperClassName="tooltip__style" cursor={false} />
    </BarChart>
  </ResponsiveContainer>
  
 
  )
}

export default BookingsChart
