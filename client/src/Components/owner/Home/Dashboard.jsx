import React from "react";
import SingleCard from "../SingleCard/SingleCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../Axios/ownerAxios";
import { useSelector } from "react-redux";
import './Dashboard.css'
import BookingsChart from "../BookingsChart/BookingsChart";
import DailyBookingsChart from "../DailyBookingsChart/DailyBookingsChart";

const Dashboard = () => {
  let token = useSelector((state) => state.Owner.Token);
  const [totalBooking,setTotalBooking]=useState({})
  const [TotalBookingAmount,setTotalBookingAmount]=useState({})
  const [upcoming,setUpcoming]=useState({})
  const [completed,setCompleted]=useState({})

  const totalBookings = async () => {
    try {
      console.log("useeffect working");
      const { data } = await axios.get("/totalBookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalBooking(data.totalBookings);
      setTotalBookingAmount(data.TotalBookingAmount)
      setUpcoming(data.upcoming)
      setCompleted(data.completed)
    } catch (error) {
      console.log(error.message,"error in useeffect");
    }
  }

  useEffect(() => {
    totalBookings();
  }, []);
  
 
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={totalBooking} />
          <SingleCard item={TotalBookingAmount} />
          <SingleCard item={upcoming} />
          <SingleCard item={completed} />
         
        </div>
        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">Bookings Statistics</h3>
            <BookingsChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Daily Bookings Statistics</h3>
            <DailyBookingsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
