import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClientLogout } from "../../../Redux/ClientAuth";
import './Header.css'

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.Client.Token);
    const name = useSelector((state) => state.Client.name);
    const logout = () => {
        dispatch(ClientLogout());
        navigate("/login");
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <a class="navbar-brand pe-5 ms-3">
                    <b>
                        <i className="Active" onClick={() => {navigate("/"); }}>ROYAL CARS</i>
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
                            <a class="nav-link active" onClick={() => {navigate("/")}}
                            aria-current="page">
                                <b>Home</b>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                                onClick={() => {
                                navigate("/cars");
                                }}
                            >
                                <b>Cars</b>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                                onClick={() => {
                                navigate("/bookings");
                                }}
                            >
                                <b>Bookings</b>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                                onClick={() => {
                                    navigate("/profile");
                                }}
                            >
                                <b>Profile</b>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link"
                                onClick={() => {
                                navigate("/chat");
                                }}
                            >
                                <b>Chats</b>
                            </a>
                        </li>
                        
                    </ul>
                   
                    {user ? (
                        <h6 className="text-white me-4"
                            onClick={() => {
                            navigate("/profile");
                            }}
                        >
                            {name}
                        </h6>
                    ) : null}
                    {user ? (
                       
                        <button className="btn btn-warning me-4" onClick={logout}>
                        Logout
                    </button>
                   
                    ) : (
                        <button className="btn text-white me-4" style={{backgroundColor:'#F77D0A'}} onClick={logout}>
                        Login
                    </button>
                     
                    )}
                   
                </div>
            </div>
        </nav>
    );
}

export default Header;
