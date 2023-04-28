import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from '../../../Axios/userAxios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { ClientLogin } from '../../../Redux/ClientAuth';

const ClientId=process.env.REACT_APP_GoogleClientId


function GoogleLog() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
    const responseGoogle = (response) => {
      const email=response.profileObj.email
      console.log(email,"email")
        console.log(response.profileObj.email,'in login');
        axios.post("/login", { email:email,login:"google"}).then((res) => {
          const result = res.data.userSignUp;
          console.log(result)

          if (result.Status) {
              const token = result.token;
              const name = result.name
              dispatch(ClientLogin({ token: token,name:name}));
              navigate("/");
          } else {
              navigate('/login')
          }
      })
      }
  return (
    <div> 
    <GoogleLogin
    clientId={ClientId}
    buttonText="Google Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /></div>
  )
}

export default GoogleLog