import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ownerAxios from "../../../Axios/ownerAxios.js";
import { OwnerLogin } from "../../../Redux/OwnerAuth";
import "./assets/material-icon/css/material-design-iconic-font.min.css";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ErrMsg, setErrMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const LoginFormPost =async  (e) => {
        e.preventDefault();
        await ownerAxios.post("/login", { email, password }).then((res) => {
            const result = res.data.ownerSignUp;
            if (result.Status) {
                const token = result.token;
                const name = result.name
                dispatch(OwnerLogin({ token: token,name:name,advance:0 }));
                navigate("/owner");
            } else {
                setErrMsg(result.message);
            }
        });
    };
    return (

        <section class="vh-100" style={{backgroundColor:' #2B2E4A'}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderRadius: '1rem'}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="/safad/login-vertical4.jpg"
                alt="login form" class="img-fluid" style={{borderRadius: '15px',height:'600px'}} />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form method="post" onSubmit={LoginFormPost}>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-car fa-2x me-3" style={{color: '#ff6219'}}></i>
                   
                    <span class="h1 fw-bold mb-0" >ROYAL CARS</span>
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

                  <a class="small text-muted" >Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a 
                      style={{color: '#393f81'}} onClick={() => {navigate("/owner/register")}}>Register here</a></p>
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
