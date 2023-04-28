import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OwnerLogout } from "../../../Redux/OwnerAuth";
import './Header.css'

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const owner = useSelector((state) => state.Owner.Token);
    const name = useSelector((state) => state.Owner.name);
    const logout = () => {
        dispatch(OwnerLogout());
        navigate("/owner/login");
    };

    return (
        
        <nav class="navbar navbar-expand-lg navbar-dark ">
            <div class="container-fluid">
                <a class="navbar-brand pe-5 ms-3">
                    <b>
                        <i className="Active">Royal Cars Owner</i>
                    </b>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                
                                onClick={() => {
                                    navigate("/owner");
                                }}
                                aria-current="page"
                            >
                                <b>Dashboard</b>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                onClick={() => {
                                    navigate("/owner/cars");
                                }}
                            >
                                <b>Cars</b>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                onClick={() => {
                                    navigate("/owner/bookings");
                                }}
                            >
                                <b>Bookings</b>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                onClick={() => {
                                    navigate("/owner/profile");
                                }}
                            >
                                <b>Profile</b>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                
                                onClick={() => {
                                    navigate("/owner/chat");
                                }}
                                aria-current="page"
                            >
                                <b>Chats</b>
                            </a>
                        </li>
                        
                    </ul>
                   
                    {owner ? (
                        <h6
                            className="text-white me-4"
                            onClick={() => {
                                navigate("/owner/profile");
                            }}
                        >
                            {name}
                        </h6>
                    ) : null}
                    {owner ? (
                       
                     
                        <button className="btn btn-warning me-4" onClick={logout}>
                        Logout
                    </button>
                   
                    
                    ) : (
                       
                        <button className="btn text-white me-4" style={{backgroundColor:'#F77D0A'}}  onClick={() => {
                            navigate("/owner");
                        }}>
                        Login
                    </button>
                     
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
