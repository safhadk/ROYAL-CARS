import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userAxios from "../../../Axios/userAxios.js";
import { ClientLogin } from "../../../Redux/ClientAuth";
import "./assets/material-icon/css/material-design-iconic-font.min.css";
import "./Login.css";
import GoogleLogin from "../GoogleLogin/GoogleLogin.jsx";
import GoogleLogout from "../GoogleLogout/GoogleLogout.jsx";
import { useEffect } from "react";
import {gapi} from 'gapi-script'
const ClientId=process.env.REACT_APP_GoogleClientId




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

    useEffect(() => {
     
    function start(){
      gapi.client.init({
        clientId:ClientId,
        scope:'https://www.googleapis.com/auth/youtube.force-ssl'
      })
    }
      gapi.load('client:auth2',start)
    }, [])
    
    return (

        <section class="vh-100" style={{backgroundColor:' #2B2E4A'}}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card" style={{borderRadius: '1rem'}}>
                <div class="row g-0">
                  <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="/safad/login-vertical5.jpg"
                      alt="login form" class="img-fluid" style={{borderRadius: '15px',height:'600px'}} />
                  </div>
                  <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">
      
                      <form method="post" onSubmit={LoginFormPost}>
      
                        <div class="d-flex align-items-center mb-3 pb-1">
                          <i class="fas fa-car fa-2x me-3" style={{color: '#ff6219'}}></i>
                         
                          <span class="h1 fw-bold mb-0" onClick={()=> navigate('/')}>ROYAL CARS</span>
                        </div>
      
                        <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
      
                        <div class="form-outline mb-4">
                          <input type="email" id="form2Example17" class="form-control form-control-lg"
                          value={email}
                           onChange={(e) => {
                           setEmail(e.target.value);
                           }}
                           placeholder="Your Email" />
                          {/* <label class="form-label" for="form2Example17">Email address</label> */}
                        </div>
      
                        <div class="form-outline mb-4">
                          <input type="password" id="form2Example27" class="form-control form-control-lg"
                          value={password}
                                                          onChange={(e) => {
                                                              setPassword(e.target.value);
                                                          }}
                                                          placeholder="Password" />
                          {/* <label class="form-label" for="form2Example27">Password</label> */}
                        </div>
      
                        {ErrMsg.length > 0 && (
                                          <div>
                                              <p style={{ color: "red" }}>{ErrMsg}</p>
                                          </div>
                                      )}
      
                        <div class="pt-1 mb-4">
                          <button className="btn text-white me-4" type="submit" style={{backgroundColor:'#F77D0A'}}>
                              Login
                          </button>
                        </div>
                        <GoogleLogin/>
                        {/* <GoogleLogout/> */}

                  
      
                        <a class="small text-muted" href="#">Forgot password?</a>
                        <p class="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a 
                            style={{color: '#393f81'}} onClick={() => {navigate("/register")}}>Register here</a></p>
                        <a  class="small text-muted">Terms of use.</a>
                        <a  class="small text-muted">Privacy policy</a>
                      </form>
      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      










    );
}

export default Login;
