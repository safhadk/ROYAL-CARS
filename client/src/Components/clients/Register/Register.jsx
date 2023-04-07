import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAxios from "../../../Axios/userAxios.js";

function UserRegister() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const signUpForm = async (event) => {
        event.preventDefault();

       await userAxios.post("/register", { name, email, phone, password }).then((res) => {
            if (res.data.status) {
                navigate("/login");
            } else {
                setErrMsg("Something went wrong");
            }
        });
    };

    return (
        <div>
            <section className="signUp">
                <div className="container_login" style={{ marginTop: "100px" }}>
                    <div className="signUp-content">
                        <div className="signUp-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" onSubmit={signUpForm} id="register-form">
                                <div className="form-group">
                                    <label for="name">
                                        {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="email">
                                        {/* <i className="zmdi zmdi-email"></i> */}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="pass">
                                        {/* <i class="fa-sharp fa-solid fa-address-book"></i> */}
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        placeholder="Your Dial number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="re-pass">
                                        {/* <i className="zmdi zmdi-lock-outline"></i> */}
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeholder="Enter your Password"
                                    />
                                </div>
                                <div className="form-group row">
                  <div className="col-sm-8 offset-sm-4">
                    <button type="submit" className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                      Register
                    </button>
                  </div>
                </div>
                            </form>
                            {errMsg ? <div style={{ color: "red" }}>{errMsg}</div> : ""}
                        </div>
                        <div className="signUp-image">
                            <figure>
                                <img src={"/safad/carousel-1.jpg"} alt="sing up image" />
                            </figure>
                            <a
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="signUp-image-link"
                            >
                                I am already member
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserRegister;
