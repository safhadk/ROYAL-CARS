import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import userAxios from "../../../Axios/userAxios.js";
import Paypal from '../Paypal/Paypal.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Payment() {
  const [carData, setCarData] = useState([]);
  const [rent, setRent] = useState(null);
  const [advance, setAdvance] = useState(0);
  let location = useLocation();
  let car = location.state.bookingCarData;
  const carId = location.state.id;
  const ownerAmount = rent - ((rent * 10) / 100);
  const TotalAmount = rent;

  const bookingData = {
    advance,
    carId,
    ownerAmount,
    TotalAmount,
    pickup: car.pickup,
    drop: car.drop
  }

  useEffect(() => {

    userAxios.get(`/cars?id=${location.state.id}&pickup=${car.pickup}&drop=${car.drop}`)
      .then((response) => {
        setCarData(response.data.data);
        setRent(response.data.rentAmount)
        setAdvance(response.data.rentAmount * 0.1)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (

    <div class="container-fluid pt-5">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8 mb-5">
            <h1 class="display-4 text-uppercase mb-5">{carData[0]?.carModel}</h1>

            <div class="col-lg-6 mb-4">
              <h1 class="">Amount : ₹ {rent} </h1>
              <div class="d-flex mb-3">
                <h6 class="mr-2">Rating:</h6>
                <div class="d-flex align-items-center justify-content-center mb-1">
                  <small class="fa fa-star text-warning mr-1"></small>
                  <small class="fa fa-star text-warning mr-1"></small>
                  <small class="fa fa-star text-warning mr-1"></small>
                  <small class="fa fa-star text-warning mr-1"></small>
                  <small class="fa fa-star-half-alt text-warning mr-1"></small>
                  <small>(250)</small>
                </div>
              </div>
            </div>

            <div class="row mx-n2 mb-3">
              <div class="col-md-3 col-6 px-2 pb-2">
                <img class="img-fluid w-100" src={`/safad/${carData[0]?.images[0]}`} alt="" />
              </div>
              <div class="col-md-3 col-6 px-2 pb-2">
                <img class="img-fluid w-100" src={`/safad/${carData[0]?.images[1]}`} alt="" />
              </div>
              <div class="col-md-3 col-6 px-2 pb-2">
                <img class="img-fluid w-100" src={`/safad/${carData[0]?.images[2]}`} alt="" />
              </div>
              <div class="col-md-3 col-6 px-2 pb-2">
                <img class="img-fluid w-100" src={`/safad/${carData[0]?.images[3]}`} alt="" />
              </div>
            </div>
            <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt magna dolores aliquyam dolores dolore. Amet erat amet et magna</p>
            <div class="row pt-2">
              <div class="col-md-3 col-6 mb-2">
                <i class="fas fa-gas-pump text-primary mr-2"></i>
                <span>Fuel : {carData[0]?.fuel} </span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="fa fa-cogs text-primary mr-2"></i>
                <span>Transmission : {carData[0]?.transmission}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="fa fa-map-marker text-primary mr-2"></i>
                <span>Location : {carData[0]?.place}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="fas fa-city text-primary mr-2"></i>
                <span>City : {carData[0]?.location}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="fa fa-car text-primary mr-2"></i>
                <span>Seater : {carData[0]?.seater}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="	fa fa-address-card text-primary mr-2"></i>
                <span>Registration : {carData[0]?.registrationNumber} </span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="	fas fa-money-check text-primary mr-2"></i>
                <span>Per Hour Charge : ₹ {carData[0]?.perHourCharge}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="	fas fa-money-check-alt text-primary mr-2"></i>
                <span>Per Day Charge : ₹ {carData[0]?.perDayCharge}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="far fa-credit-card text-primary mr-2"></i>
                <span>Per Month Charge : ₹ {carData[0]?.perMonthCharge}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="fas fa-map-marker-alt text-primary mr-2"></i>
                <span>Pickup : {car.pickup}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="fas fa-map-marker text-primary mr-2"></i>
                <span>Drop : {car.drop}</span>
              </div>
              <div class="col-md-3 col-6 mb-2">
                <i class="fa fa-road text-primary mr-2"></i>
                <span>Mileage : 20km </span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 mb-5" style={{ backgroundColor: "#2b2e4a", borderRadius: "50px" }}>
            <div class="p-5">
              <h1 class="text-warning text-center mb-4">Advance Payment</h1>

              <div class='form-group'>
                <h1 class='text-white'>Total Amount : ₹ {rent}</h1>
              </div>

              <div class='form-group'>
                <h1 class='text-white'>Advance Amount : ₹ {(rent * 10) / 100}</h1>
              </div>

              <div class='form-group'>
                <h1 class='text-white'>Balance Amount (Pay to Car Owner) : ₹ {rent - ((rent * 10) / 100)}</h1>

              </div>


              <div class="form-group">
                <select class="custom-select px-4" style={{ height: '50px' }}>
                  <option value="">-Select Payment Method-</option>
                  <option value="Paypal">Paypal</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="DD">DD</option>
                  <option value="NEFT">NEFT</option>
                  <option value="RTGS">RTGS</option>
                  <option value="IMPS">IMPS</option>
                  <option value="UPI">UPI</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="GooglePay">GooglePay</option>
                  <option value="Paytm">Paytm</option>
                </select>
              </div>

              <div class="form-group mb-0">
                {/* <button class="btn btn-success btn-block" type="submit" style={{ height: '50px', backgroundColor: "green" }}>Pay Advance Now ₹ {(rent * 10) / 100}</button> */}
                {/* <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons style={{ layout: "horizontal" }} />
               </PayPalScriptProvider> */}
                {
                  advance !== 0 && (
                    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_ClientId }}>
                      <Paypal advance={advance} bookingData={bookingData} />
                    </PayPalScriptProvider>
                  )
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment