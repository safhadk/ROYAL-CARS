// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AdminLogout } from "../../../Redux/AdminAuth";

// function Navbar() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const logout = () => {
//         dispatch(AdminLogout());
//         navigate("/admin");
//     };

//     return (
//         <nav class="navbar navbar-expand-lg navbar-dark bg-dark ps-4 pe-4">
//             <div class="container-fluid">
//                 <button
//                     class="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarTogglerDemo01"
//                     aria-controls="navbarTogglerDemo01"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
//                     <a class="navbar-brand">
//                         <b>Admin Panel</b>
//                     </a>
//                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li class="nav-item">
//                             <a
//                                 class="nav-link active"
//                                 onClick={() => {
//                                     navigate("/admin/admin_home");
//                                 }}
//                                 aria-current="page"
//                             >
//                                 <i>Home</i>
//                             </a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link active" onClick={logout}>
//                                 <i>Clients</i>
//                             </a>
//                         </li>
//                     </ul>
//                     <form class="d-flex" role="search">
//                         <button
//                             class="btn btn-dark"
//                             onClick={() => {
//                                 navigate("/admin");
//                             }}
//                             type="submit"
//                         >
//                             Logout!
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </nav>

        
       
//     );
// }

// export default Navbar;

import React from "react";

import { Link } from "react-router-dom";

import "./top-nav.css";

const TopNav = () => {
  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        <div className="search__box">
          <input type="text" placeholder="search or type" />
          <span>
            <i class="ri-search-line"></i>
          </span>
        </div>
        <div className="top__nav-right">
          <span className="notification">
            <i class="ri-notification-3-line"></i>
            <span className="badge">1</span>
          </span>
          <div className="profile">
            <Link to="/settings">
              <img src="/safad/profile-02.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

