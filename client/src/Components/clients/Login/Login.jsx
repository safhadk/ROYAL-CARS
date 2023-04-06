import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userAxios from "../../../Axios/userAxios.js";
import { ClientLogin } from "../../../Redux/ClientAuth";
import "./assets/material-icon/css/material-design-iconic-font.min.css";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ErrMsg, setErrMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LoginFormPost = (e) => {
        e.preventDefault();
       
        userAxios.post("/login", { email, password }).then((res) => {
            const result = res.data.userSignUp;
            console.log(result)

            if (result.Status) {
                const token = result.token;
                const name = result.name
                dispatch(ClientLogin({ token: token,name:name}));
                navigate("/");
            } else {
                setErrMsg(result.message);
            }
        });
    };
    return (
        <div>
            <section className="sign-in">
                <div className="container_login" style={{ marginTop: "100px" }}>
                    <div className="signIn-content">
                        <div className="signIn-image">
                            <figure>
                                <img src={process.env.PUBLIC_URL + "/safad/about.png"} alt="sing up image" />
                            </figure>
                            <a
                                href="#"
                                onClick={() => {
                                    navigate("/register");
                                }}
                                className="signUp-image-link"
                            >
                                Create an account
                            </a>
                        </div>

                        <div className="signIn-form">
                            <h2 className="form-title">Log In</h2>
                            <form method="POST" className="register-form" onSubmit={LoginFormPost} id="login-form">
                                <div className="form-group">
                                    <label for="your_name">
                                        {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                                    </label>
                                    <input
                                        type="text"
                                        name="your_name"
                                        id="your_name"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="your_pass">
                                        {/* <i className="zmdi zmdi-lock"></i> */}
                                    </label>
                                    <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeholder="Password"
                                    />
                                </div>
                                <button type="submit" className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                      Log In
                    </button>
                                {ErrMsg.length > 0 && (
                                    <div>
                                        <p style={{ color: "red" }}>{ErrMsg}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>












    );
}

export default Login;
