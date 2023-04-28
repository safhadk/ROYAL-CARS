import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../../../Redux/AdminAuth";
import { NavLink } from "react-router-dom";

import "./sidebar.css";

const Sidebar = () => {

      const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(AdminLogout());
        navigate("/admin");
    };
  return (



    
    <div className="sidebar">
      <div className="sidebar__top mt-4">
        <h2>
          <span>
            <i class="ri-taxi-line"></i>
          </span>{" "}
         Royal Cars
        </h2>
      </div>

      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
         
              <li className="nav__item" >
                <NavLink
                  to='/admin/admin_home'
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className="ri-apps-2-line"></i>

                  Dashboard
                </NavLink>
              </li>

              <li className="nav__item" >
                <NavLink
                  to='/admin/bookings'
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className="ri-calendar-line"></i>
                  {/* <i className="ri-time-line"></i>
                  <i className="ri-clipboard-line"></i>
                  <i className="ri-ticket-2-line"></i>
                  <i className="ri-hotel-bed-line"></i> */}

                  Bookings
                </NavLink>
              </li>

              <li className="nav__item" >
                <NavLink
                  to='/admin/users'
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className="ri-group-line"></i>

                  Users
                </NavLink>
              </li>

              <li className="nav__item" >
                <NavLink
                  to='/admin/owners'
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className="ri-car-line"></i>

                  Owners
                </NavLink>
              </li>

              <li className="nav__item" >
                <NavLink
                  to='/admin/locations'
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className="ri-map-pin-2-line"></i>

                  Location
                </NavLink>
              </li>
     
          </ul>
        </div>

        <div className="sidebar__bottom">
          <span  onClick={logout}>
            <i class="ri-logout-circle-r-line"></i> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
