import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../Axios/ownerAxios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";



import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

const carStaticsData = [
    {
      name: "Sat",
      week: 4000,
      prevWeek: 2400,
    },
    {
      name: "Sun",
      week: 3000,
      prevWeek: 1398,
    },
    {
      name: "Mon",
      week: 2000,
      prevWeek: 9800,
    },
    {
      name: "Tue",
      week: 2780,
      prevWeek: 3908,
    },
    {
      name: "Wed",
      week: 1890,
      prevWeek: 4800,
    },
    {
      name: "Thu",
      week: 2390,
      prevWeek: 3800,
    },
    {
      name: "Fri",
      week: 3490,
      prevWeek: 4300,
    },
  ];
  
  

const DailyBookingsChart = () => {

    const [dailyWiseBooking,setDailyWiseBooking]=useState({})

    let token = useSelector((state) => state.Owner.Token);
    const navigate=useNavigate();
    
  if (!token) {
    console.log("no token")
    navigate("/owner");
  }
      
    const dailyWiseBookings = async () => {
        try {
          console.log("useeffect working");
          const { data } = await axios.get("/dailywisebookings", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDailyWiseBooking(JSON.parse(data))
          console.log(data)
       
         
        } catch (error) {
          console.log(error.message,"error in useeffect");
        }
      }
    
      useEffect(() => {
        dailyWiseBookings();
      }, []);


   

   

  return (

    <ResponsiveContainer>
      <AreaChart
        data={dailyWiseBooking?dailyWiseBooking:""}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" stroke="#ddd" />

        <CartesianGrid strokeDasharray="0" stroke="#b7ffe913" />
        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
        <Area
          type="monotone"
          dataKey="bookings"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/* <Area
          type="monotone"
          dataKey="prevWeek"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        /> */}
      </AreaChart>
    </ResponsiveContainer>



 
  );
};

export default DailyBookingsChart;
