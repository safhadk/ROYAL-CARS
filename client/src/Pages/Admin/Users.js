import React from "react";
import Navbar from "../../Components/admin/Navbar/Navbar";
import Sidebar from "../../Components/admin/Sidebar/Sidebar";
import User from "../../Components/admin/User/User";

function Users() {
  return (
    <div className="main__layout">
      <Sidebar />
      <div className="layout">
        <Navbar />
        <div className="content" style={{ marginTop: '100px', marginLeft: '270px', marginRight: '15px' }}>
          <User />
        </div>
      </div>
    </div>
  );
}
export default Users;
