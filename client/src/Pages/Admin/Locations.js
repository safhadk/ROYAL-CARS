import React from 'react'
import Sidebar from '../../Components/admin/Sidebar/Sidebar'
import Navbar from "../../Components/admin/Navbar/Navbar";
import Locations from '../../Components/admin/Locations/Locations';

function Location() {

  return (
<div className="main__layout">
   <Sidebar />
   <div className="layout">
     <Navbar />
     <div className="content" style={{marginLeft:'280px'}}>
       <Locations />
     </div>
   </div>
 </div>
  )
}

export default Location