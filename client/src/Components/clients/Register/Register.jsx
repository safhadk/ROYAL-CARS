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
                navigate("/otp",{state:{name:res.data.name,email:res.data.email,phone:res.data.phone,password:res.data.password}});
            } else {
                setErrMsg("Something went wrong");
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
            <img src="/safad/login-vertical5.jpg"
              alt="login form" class="img-fluid" style={{borderRadius: '15px',height:'675px'}} />
          </div>
          <div class="col-md-6 col-lg-7 d-flex align-items-center">
            <div class="card-body p-4 p-lg-5 text-black">

              <form method="post" onSubmit={signUpForm}>

                <div class="d-flex align-items-center mb-3 pb-1">
                  <i class="fas fa-car fa-2x me-3" style={{color: '#ff6219'}}></i>
                 
                  <span class="h1 fw-bold mb-0" onClick={()=> navigate('/')}>ROYAL CARS</span>
                </div>

                <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Register for new Account</h5>

                <div class="form-outline mb-4">
                  <input type="text" id="form2Example17" class="form-control form-control-lg"
                 value={name}
                                                 onChange={(e) => {
                                                     setName(e.target.value);
                                                 }}
                                                 placeholder="Your Name" />
                  {/* <label class="form-label" for="form2Example17">Email address</label> */}
                </div>

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
                  <input type="text" id="form2Example17" class="form-control form-control-lg"
             
                                                  name="phone"
                                                
                                                  value={phone}
                                                  onChange={(e) => {
                                                      setPhone(e.target.value);
                                                  }}
                                                  placeholder="Your Dial number"/>
                  {/* <label class="form-label" for="form2Example17">Email address</label> */}
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form2Example27" class="form-control form-control-lg"
                
                                                   name="password"
                                                  
                                                   value={password}
                                                   onChange={(e) => {
                                                       setPassword(e.target.value);
                                                   }}
                                                   placeholder="Enter your Password"/>
                  {/* <label class="form-label" for="form2Example27">Password</label> */}
                </div>
{/* 
                {ErrMsg.length > 0 && (
                                  <div>
                                      <p style={{ color: "red" }}>{ErrMsg}</p>
                                  </div>
                              )} */}

                <div class="pt-1 mb-4">
                  <button className="btn text-white me-4" type="submit" style={{backgroundColor:'#F77D0A'}}>
                      Register
                  </button>
                </div>

                {/* <a class="small text-muted" href="#">Forgot password?</a> */}
                <p class="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already a Member ? <a 
                    style={{color: '#393f81'}} onClick={() => {navigate("/login")}}>Login here</a></p>
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

export default UserRegister;
