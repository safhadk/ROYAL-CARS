import { useLocation } from 'react-router-dom'
import './BookingDetail.css'
import React from 'react'
import { useEffect,useState } from 'react';
import Axios from "../../../Axios/userAxios.js";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment'

function BookingDetail() {
    const navigate=useNavigate()
    const location=useLocation();
    console.log(location.state.id,"id here")


    let token = useSelector((state) => state.Client.Token);
    const [booking,setBooking]=useState({})

    if (!token) {
        console.log("no token")
        navigate("/");
      }
    
    useEffect( () => {
      Axios.get(`/bookingDetails?id=${location.state.id}`,
      {headers:{
        Authorization: `Bearer ${token}`,
      }}).then((res) => {
        setBooking(res.data)
        console.log(res.data,"response here")
   
     }).catch((error) => {
         console.log(error.message);
     });
  }, []);
    
  return (
 
     <section class="vh-100 gradient-custom-2">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-10 col-lg-8 col-xl-12">
          <div class="card card-stepper" style={{borderRadius: '16px'}}>
            <div class="card-header p-4">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="text-muted mb-2"> Booking ID : <span class="fw-bold text-body">#{booking?.bookingId}</span></p>
                  <p class="text-muted mb-0"> Place On : <span class="fw-bold text-body"> 
                    <Moment format="dddd,DD-MM-YYYY hh:mm:a">{booking?.createdAt}</Moment></span> </p>
                    <p class="text-muted mb-2"> Rent : <span class="fw-bold text-body">₹{booking?.TotalAmount}</span></p>
                </div>
                <div>
                  {/* <h6 class="mb-0"> <a href="#">View Details</a> </h6> */}
                </div>
              </div>
            </div>
            <></>
            <div class="card-body p-4">
              <div class="d-flex flex-row mb-4 pb-2">
                <div class="flex-fill">
                  <h3 class="bold mb-1">{booking.car?.carModel}</h3>
                  <p class="text-muted mb-1"> Location: {booking.car?.place} , {booking.car?.location}</p>
                  <h5 class="bold mb-1"> Registration : {booking.car?.registrationNumber}</h5>
                  <h5 class="bold mb-1"> Seater : {booking.car?.seater}</h5>
                  <h5 class="bold mb-1"> Transmission : {booking.car?. transmission}</h5>
                  <h5 class="bold mb-3"> Fuel : {booking.car?.fuel}</h5>
                  <h5 class="bold mb-1"> Advance Paid: ₹{booking?.Advance}</h5>
                  <h4 class="mb-1"> Balance Amount : ₹{booking?.ownerAmount} <span class="small text-muted"> pay to owner (COD/Online) </span></h4>
                  <h5 class="bold mb-3"> Total Rent : ₹{booking?.TotalAmount}</h5>
                  <h5 class="bold mb-1"> Pickup Date and Time : <Moment format="dddd,DD-MM-YYYY hh:mm:a">{booking?.pickup}</Moment></h5>
                  <h5 class="bold mb-1"> Drop Date and Time : <Moment format="dddd,DD-MM-YYYY hh:mm:a">{booking?.drop}</Moment></h5>
                 
                  <p class="text-muted mt-5">Tracking Status on: <span class="text-body"> <Moment format="dddd,DD-MM-YYYY hh:mm:a">{booking?.updatedAt}</Moment></span></p>
                </div>
                <div>
                  <img class="align-self-center img-fluid" alt="....image"
                    src={`/safad/${booking.car?.images[0]}`} width="250"/>
                </div>
                <div>
                  <img class="align-self-center img-fluid" alt="....image"
                    src={`/safad/${booking.car?.images[1]}`} width="250"/>
                </div>
                <div>
                  <img class="align-self-center img-fluid" alt="....image"
                    src={`/safad/${booking.car?.images[2]}`} width="250"/>
                </div>
                <div>
                  <img class="align-self-center img-fluid" alt="....image"
                    src={`/safad/${booking.car?.images[3]}`} width="250"/>
                </div>
              </div>
              <ul id="progressbar-1" class="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
               {booking?.status==='pickup pending' ? <li  class="step0 active" id="step1"><span  style={{marginLeft: '15px', marginTop: '12px'}}>Booked</span></li> :  <li  class="step0 " id="step1"><span  style={{marginLeft: '22px', marginTop: '12px'}}>Booked</span></li> }
               {booking?.status==='pickup pending' ? <li  class="step0 active text-center"  id="step2"><span  >Pickup pending</span></li> :  <li  class="step0 " id="step2"><span  >Pickup pending</span></li> }   
                {/* <li class="step0 active   text-center" id="step2"><span>Pickup pending</span></li> */}
                <li class="step0   text-muted text-end" id="step3"><span
                    style={{marginRight: '16px'}}>Picked</span></li>
                    <li class="step0  text-muted text-end" id="step4"><span
                    style={{marginRight: '-12px'}}>Drop Pending</span></li>
                     <li class="step0  text-muted text-end" id="step5"><span
                    style={{marginRight: '7px'}}>Dropped </span></li>
                    <li class="step0  text-muted text-end" id="step6"><span
                    style={{marginRight: '12px'}}>Amount </span></li>
                    
              </ul>
            </div>
            {/* <div class="card-footer p-4">
              <div class="d-flex justify-content-between">
                <h5 class="fw-normal mb-0"><a href="#!">Track</a></h5>
                <div class="border-start h-100"></div>
                <h5 class="fw-normal mb-0"><a href="#!">Cancel</a></h5>
                <div class="border-start h-100"></div>
                <h5 class="fw-normal mb-0"><a href="#!">Pre-pay</a></h5>
                <div class="border-start h-100"></div>
                <h5 class="fw-normal mb-0"><a href="#!" class="text-muted"><i class="fas fa-ellipsis-v"></i></a>
                </h5>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default BookingDetail