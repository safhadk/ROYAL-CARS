import React, { useEffect } from 'react'
import axios from '../../../Axios/userAxios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function OTP() {
  const location=useLocation();
    const navigate=useNavigate()
const[OTP,setOTP]=useState(null)
const[ErrMsg,setErrMsg]=useState("")
console.log(location.state.name," location state in otp")


    const OTPFormPost =async (e) => {
        e.preventDefault();
       
       const {data}=await axios.post("/otp", { OTP:OTP,name:location.state.name,email:location.state.email,password:location.state.password,phone:location.state.phone })
       console.log(data)
       if(data.status){
        navigate('/login')
       }else{
        setErrMsg('Inavlid OTP')
       }
    };
  return (
    <form onSubmit={OTPFormPost} >
    <div class="d-flex justify-content-center align-items-center container" style={{marginTop: '50px', marginBottom:'50px'}}>
            <div class="card py-5 px-3">

                
                <h5 class="m-0">Mobile phone verification</h5><span class="mobile-text">Enter the code we just send on your mobile phone <b class="text-danger">9846842107</b></span>
                {/* <span class="mobile-text" style={{color:'red'}}>Re-Enter the code we recently send on your mobile phone</span> */}
                <div class="d-flex flex-row mt-5"><input type="text" class="form-control" name="otp" minlength="6" maxlength="6" required
                 value={OTP}
                 onChange={(e) => {
                     setOTP(e.target.value);
                 }}/></div>
                
                {/* <div class="form-group mt-4">
                      <button type="submit" class="btn btn-dark btn-block text-uppercase" >
                        SUMBIT OTP
                      </button>
                    </div> */}
                     {ErrMsg.length > 0 && (
                                          <div>
                                              <p style={{ color: "red" }}>{ErrMsg}</p>
                                          </div>
                                      )}
      
                    <div class="pt-1 mb-4">
                          <button className="btn text-white me-4" type="submit" style={{backgroundColor:'#F77D0A'}}>
                          SUMBIT OTP
                          </button>
                        </div>
                <div class="text-center "><span class="d-block mobile-text">Don't receive the code?</span><span class="font-weight-bold text-danger cursor">Resend</span></div>
            </div>
        </div>
        </form>
  )
}

export default OTP