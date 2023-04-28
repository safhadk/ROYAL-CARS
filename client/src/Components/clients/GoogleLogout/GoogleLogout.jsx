import React from 'react'
import { GoogleLogout } from 'react-google-login';
const ClientId=process.env.REACT_APP_GoogleClientId
function GoogleLogouts() {
    const logout=(res)=>{
console.log('logout succesfull')
    }
    
  return (
    <div> 
     <GoogleLogout
      clientId={ClientId}
      buttonText="Logout"
      onLogoutSuccess={logout}
    ></GoogleLogout>
   </div>
  )
}

export default GoogleLogouts