import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import userAxios from "../../../Axios/userAxios.js";

function Payment() {
  const [carData, setCarData] = useState([]);
  let location=useLocation()
  let car=location.state.bookingCarData

  useEffect(() => {
        
    userAxios
        .get(`/cars?id=${location.state.id}`)
        .then((response) => {
            setCarData(response.data.data);
            console.log(response.data.data)
        })
        .catch((error) => {
            console.log(error);
        });
}, [location.state.id]);

  return (
    
    <div className='m-5 text-success'>
        Payment Page
        <h1>{`car id : ${location.state.id}`}</h1>
        <h1>{`city : ${car.city}`}</h1>
        <h1>{`pickup date and time :${car.pickup}`}</h1>
        <h1>{`car drop date and time : ${car.drop}`}</h1>
        <h1>{`0 month ${car.days} day ${car.hours} hour`}</h1> 
         <h1>{`model : ${carData[0].carModel}`}</h1>

        <h1>{`no : ${carData[0].registrationNumber}`}</h1>
        {/* <h1>{carData}</h1> */}
        
        <h6 class="btn btn-success px-3 m-1" >Pay Advance Now</h6>
    
    </div>
    
  )
}

export default Payment