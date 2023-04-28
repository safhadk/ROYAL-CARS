import React from 'react'
import Sidebar from '../../Components/admin/Sidebar/Sidebar'
import Navbar from "../../Components/admin/Navbar/Navbar";
import OwnerDetails from '../../Components/admin/OwnerDetails/OwnerDetails';

function OwnerDetail() {
  return (
<div className="main__layout">
   
   <Sidebar />
   <div className="layout">
     <Navbar />
     <div className="content" style={{marginLeft:'280px'}}>
       <OwnerDetails />
     </div>
   </div>
 </div>
  )
}

export default OwnerDetail