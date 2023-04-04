import React, { useState, useEffect } from 'react'
import userAxios from "../../../Axios/userAxios.js";


import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css"; // main css file
import "react-time-picker/dist/TimePicker.css"; // time picker css file
import Search from '../Search/Search.jsx';

import { useNavigate } from 'react-router-dom';


function CarLists() {


let Navigate=useNavigate()
    const [carData, setCarData] = useState({});
    // const [show,setShow]=useState([])
    // const [SearchInput, setSearchInput] = useState("")
    const [city,setCity] = useState("")
    const [pickup,setPickup] = useState("")
    const [drop,setDrop] = useState("")

    const [bookingCarData,setbookingCarData]=useState({})

    useEffect(() => {
        
        userAxios
            .get("/cars")
            .then((response) => {
                setCarData(response.data.data);
            

                // setShow(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // const handleChange = (event) => {
    //     setCity(event.target.value)
    //       setSearchInput(event.target.value)
        
    //    if(event.target.value){
    //     let filteredCar=show.filter((car)=>car.location.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1  )
    //     setCarData(filteredCar)
    //    }else{
    //     setCarData(show)
    //    }
    // }




        const handleSearch=async()=>{
            console.log('button clicked')
             await userAxios
            .post("/search",{city,pickup,drop})
            .then((res) => {
                setCarData(res.data.data);
                setbookingCarData(res.data.bookingCarData)
                
              
            })
            .catch((e) => {
                console.log(e.message);
            });
        }

        
      
   
    return (

        <div class="container-fluid py-5">
            <div class="container pt-5 pb-3">
                <h1 class="display-4 text-uppercase text-center mb-5 bg-warning">Find Your Car</h1>

                
                <div class="container-fluid bg-white pt-3 px-lg-5">
                <div class="row mx-n2 d-flex align-items-center">
            <div class="col-xl-2 col-lg-4 col-md-6 px-2 mb-3">
                {/* <select class="custom-select px-4 mb-3" style={{height: '50px'}}>
                    <option selected>SELECT CITY</option>
                    <option value="1">Location 1</option>
                    <option value="2">Location 2</option>
                    <option value="3">Location 3</option>
                </select> */}



<input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Select City..."
                    onChange={(e)=>{setCity(e.target.value)}}
                    value={city}
                    />


             {carData.length > 0 && carData.map((car) => (
            <datalist id="datalistOptions" key={car._id}>
                <option value={car.location} />
            </datalist>
                 ))}            </div>
            {/* <div class="col-xl-2 col-lg-4 col-md-6 px-2">
                <select class="custom-select px-4 mb-3" style={{height: '50px'}}>
                    <option selected>Drop Location</option>
                    <option value="1">Location 1</option>
                    <option value="2">Location 2</option>
                    <option value="3">Location 3</option>
                </select>
            </div> */}
            <div class="col-xl-2 col-lg-4 col-md-6 px-2">
                <div class="date mb-3" id="date" data-target-input="nearest">
                    <input type="datetime-local" class="form-control datetimepicker-input" placeholder="Pickup Date"
                        data-target="#date" data-toggle="datetimepicker" onChange={(e)=>{setPickup(e.target.value)}} />
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-6 px-2 ">
                <div class="time mb-3" id="time" data-target-input="nearest">
                    <input type="datetime-local" class="form-control datetimepicker-input" placeholder="Pickup Time"
                        data-target="#time" data-toggle="datetimepicker" onChange={(e)=>{setDrop(e.target.value)}} />
                </div>
            </div>
            {/* <div class="col-xl-2 col-lg-4 col-md-6 px-2">
                <select class="custom-select px-4 mb-3" style={{height: '50px'}}>
                    <option selected>Select A Car</option>
                    <option value="1">Car 1</option>
                    <option value="2">Car 1</option>
                    <option value="3">Car 1</option>
                </select>
            </div> */}
            <div class="col-xl-2 col-lg-4 col-md-6 px-2 mb-3">
            <button type="button" className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={handleSearch}>
                      SUBMIT
                    </button>
            </div>
        </div>
    </div>


                {/* <div className='mt-3 mb-5'>
            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Search or Select City..."
                    onChange={handleChange}
                    value={SearchInput}
                    />

             {carData.length > 0 && carData.map((car) => (
            <datalist id="datalistOptions" key={car._id}>
                <option value={car.location} />
            </datalist>
                 ))}
        </div> */}
                <div class="row">

                    
                {carData.length === 0 && <h1 className='text-danger mt-5'>Cars Not Available For this city or date</h1>}

                {carData.length > 0 && carData.map((car) => (
                    <div class="col-lg-4 col-md-6 mb-2" key={car.carModel}>
                        <div class="rent-item mb-4">
                        {/* <img class="img-fluid mb-4" src={`http://localhost:5000/public/safad/${car.images[0]}`} alt="" /> */}
                        <img class="img-fluid mb-4" src={`/safad/${car.images[0]}`} alt="" />

                            <h4 class="text-uppercase mb-4">{car.carModel}</h4>
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa fa-car text-warning mr-1"></i>
                                    {/* <span>2015</span> */}
                                    <span>{car.seater} Seater
                                    </span>
                                </div>

                                <div class="px-2 border-left border-right" >
                                    <i class="fa fa-cogs text-warning mr-1"></i>
                                    <span>{car.transmission}</span>
                                </div>
                                <div class="px-2">
                                    <i class="fas fa-gas-pump text-warning mr-1"></i>
                                    <span>{car.fuel}</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa fa-map-marker text-warning mr-1"></i>
                                    <span>{car.location}</span>
                                </div>

                                <div class="px-2">
                                    <i class="fa fa-map-marker text-warning mr-1"></i>
                                    <span>{car.place}</span>
                                </div>

                            </div>
                            <h6 class="btn btn-warning px-3 m-1">₹{car.perHourCharge}/Hour</h6>
                            <h6 class="btn btn-warning px-3 m-1" >₹{car.perDayCharge}/Day</h6>
                            <h6 class="btn btn-warning px-3 m-1" >₹{car.perMonthCharge}/Month</h6>

                        <h6 class="btn btn-success px-3 m-1" onClick={()=> Navigate('/payment',{state:{id:car._id,bookingCarData:bookingCarData}}) } >Rent Now</h6>
                          
                           
                        </div>
                    </div>
                     ))}
                </div>
            </div>
        </div>
    )
}

export default CarLists