import React from 'react'
import {  PayPalButtons } from "@paypal/react-paypal-js";
import userAxios from "../../../Axios/userAxios.js";
import { Toast } from '../../../Helper/Toast.js';
import { useNavigate } from 'react-router-dom';
import { useSelector  } from "react-redux";

function Paypal(props) {
    let advance=props.advance
    const navigate=useNavigate()
    const token = useSelector((state) => state.Client.Token);
    const bookingData=props.bookingData

    const initialOptions = {
        "client-id": process.env.REACT_APP_ClientId,
        currency: "USD",
        intent: "capture",
    };
    
    const createOrder = async (data) => {
      try {
         
        
        if (advance===0){
            advance=1
      }
        const response = await userAxios.post(`/createOrder`, { car: { description: "car", cost: advance } },
          {
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
          })
         

        return (response.data.id);
      } catch (e) {
        console.log(e.message)
        if (e.message === "Request failed with status code 404") {
          navigate('/login');
          Toast.fire({
            icon: "error",
            title: "Please Login",
          });
        }
      }
    };

    const onApprove = (data) => {
       return userAxios.post(`/verifyPayment`, {orderID: data.orderID,bookingData:bookingData},{
         headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
            navigate("/success");
   
    }).catch((e)=>{
      console.log(e.message)
      if(e.message==="Request failed with status code 404"){
        navigate('/login')
        Toast.fire({
          icon: "error",
          title: "Please Login",
           })
      }
    })
    };
  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  )
}

export default Paypal