import React from "react";
import Navbar from "../../Components/admin/Navbar/Navbar";
import Dashboard from "../../Components/admin/Dashboard/Dashboard";
import Sidebar from "../../Components/admin/Sidebar/Sidebar";

function AdminHome() {
    return (
<div className="main__layout">
      <Sidebar />
      <div className="layout">
        <Navbar />
        <div className="content">
          <Dashboard />
        </div>
      </div>
    </div>
    );
}
export default AdminHome;
