import React from 'react'
import Sidebar from '../../Components/admin/Sidebar/Sidebar'
import Navbar from "../../Components/admin/Navbar/Navbar";
import UserDetails from '../../Components/admin/UserDetails/UserDetails';
function UserDetail() {
  return (
    <div className="main__layout">
      <Sidebar />
      <div className="layout">
        <Navbar />
        <div className="content" style={{ marginLeft: '280px' }}>
          <UserDetails />
        </div>
      </div>
    </div>
  )
}

export default UserDetail