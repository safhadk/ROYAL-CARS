import React from 'react'
import Sidebar from '../../Components/admin/Sidebar/Sidebar'
import Navbar from "../../Components/admin/Navbar/Navbar";
import Bookings from '../../Components/admin/Bookings/Bookings';

function Booking() {
  return (
<div className="main__layout">
   <Sidebar />
   <div className="layout">
     <Navbar />
     <div className="content" style={{marginLeft:'280px'}}>
       <Bookings />
     </div>
   </div>
 </div>
  )
}

export default Booking