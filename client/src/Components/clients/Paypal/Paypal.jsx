import React from 'react'
import {  PayPalButtons } from "@paypal/react-paypal-js";
import userAxios from "../../../Axios/userAxios.js";
import { Toast } from '../../../Helper/Toast.js';
import { useNavigate } from 'react-router-dom';
import { useSelector  } from "react-redux";

function Paypal(props) {
    // const advance=props.advance
   let advance=props.advance
    console.log(props.advance + "amount")
    // console.log(advance + "advance")
    const navigate=useNavigate()

    const initialOptions = {
        "client-id": process.env.REACT_APP_ClientId,
        currency: "USD",
        intent: "capture",
        // "data-client-token": "abc123xyz==",
    };
    


    const createOrder = (data) => {

        console.log(advance,"kadva");
        if (advance===0){
            advance=1
        }
      // Order is created on the server and the order id is returned
      return userAxios.post(`/createOrder`,{car:{description:"car",cost:advance }},
      { headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product skus and quantities
      })
      .then((response) => {
        console.log(response.data+ " response in create order 456")
        
        return(response.data.id)

      }).catch((e)=>{
        console.log(e.message+ " error in create order 458")
      })
    };
    const onApprove = (data) => {
       // Order is captured on the server and the response is returned to the browser
       return userAxios.post(`/verifyPayment`, {orderID: data.orderID},{
         headers: {
          "Content-Type": "application/json",
        }
    }).then((response) => {
         console.log("payment and order success")
         Toast.fire({
         icon: "success",
         title: "Booking Success",
          }).then(()=>{
            navigate("/bookings");
          })
    });
    };
  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  )
}

export default Paypal