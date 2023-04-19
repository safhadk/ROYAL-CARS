import React, { useState, useEffect } from 'react'
import userAxios from "../../../Axios/userAxios.js";
import { useNavigate } from 'react-router-dom';

function CarLists() {

    const Navigate = useNavigate()
    const [carData, setCarData] = useState({});
    const [city, setCity] = useState("")
    const [pickup, setPickup] = useState("")
    const [drop, setDrop] = useState("")
    const [bookingCarData, setbookingCarData] = useState({})
    let length = Object.keys(bookingCarData).length

    useEffect( () => {
         userAxios.get("/cars").then((response) => {
            setCarData(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleSearch = async () => {
       const {data}= await userAxios.post("/search", { city, pickup, drop })
        setCarData(data.data);
        setbookingCarData(data.bookingCarData)
    }

    return (

        <div class="container-fluid py-5">
            <div class="container pt-5 pb-3">
                <h1 class="display-4 text-uppercase text-center mb-5 bg-warning">Find Your Car</h1>

                <div class="container-fluid bg-white pt-3 px-lg-5">
                    <div class="row mx-n2 d-flex align-items-center">
                        <div class="col-xl-2 col-lg-4 col-md-6 px-2 mb-3">

                            <input class="form-control" list="cityOptions" id="exampleDataList" placeholder="Select City..."
                                onChange={(e) => { setCity(e.target.value) }}
                                value={city}
                            />

                            <datalist id="cityOptions">
                                {carData.length > 0 && carData.map((car) => (
                                    <option value={car.location} key={car._id} />
                                ))}
                            </datalist>
                        </div>

                        <div class="col-xl-2 col-lg-4 col-md-6 px-2">
                            <div class="date mb-3" id="date" data-target-input="nearest">
                                <input type="datetime-local" class="form-control datetimepicker-input" placeholder="Pickup Date"
                                    data-target="#date" data-toggle="datetimepicker" onChange={(e) => { setPickup(e.target.value) }} />
                            </div>
                        </div>
                        <div class="col-xl-2 col-lg-4 col-md-6 px-2 ">
                            <div class="time mb-3" id="time" data-target-input="nearest">
                                <input type="datetime-local" class="form-control datetimepicker-input" placeholder="Pickup Time"
                                    data-target="#time" data-toggle="datetimepicker" onChange={(e) => { setDrop(e.target.value) }} />
                            </div>
                        </div>

                        <div class="col-xl-2 col-lg-4 col-md-6 px-2 mb-3">
                            <button type="button" className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={handleSearch}>
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row">

                    {carData.length === 0 &&
                        <h1 className='text-danger mt-5'>We're sorry, but we could not find any cars available for your selected dates or location. Please try a different search.</h1>
                    }

                    {carData.length > 0 && carData.map((car) => (
                        <div class="col-lg-4 col-md-6 mb-2" key={car.carModel}>
                            <div class="rent-item mb-4">
                                <img class="img-fluid mb-4" src={`/safad/${car.images[0]}`} alt="" />
                                <h4 class="text-uppercase mb-3">{car.carModel}</h4>
                                {car.status === "Available" ? <h6 className=' text-success mb-1'>{car.status}</h6> : <h6 className=' text-danger mb-1'>{car.status}</h6>}
                                <div class="d-flex justify-content-center mb-4">
                                    <div class="px-2">
                                        <i class="fa fa-car text-warning mr-1"></i>
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

                                {length > 0 && car.status === "Available" && (<h6 class="btn btn-success px-3 m-1" onClick={() => Navigate('/payment', { state: { id: car._id, bookingCarData: bookingCarData } })} >Rent Now</h6>)}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CarLists