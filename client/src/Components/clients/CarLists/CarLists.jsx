import React, { useState, useEffect } from 'react'
import userAxios from "../../../Axios/userAxios.js";

function CarLists() {

    const [carData, setCarData] = useState({});
    const [show,setShow]=useState([])
    const [SearchInput, setSearchInput] = useState("")

    useEffect(() => {
        userAxios
            .get("/cars")
            .then((response) => {
                setCarData(response.data.data);
                setShow(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChange = (event) => {
          setSearchInput(event.target.value)
        
       if(event.target.value){
        let filteredCar=show.filter((car)=>car.location.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1  )
        setCarData(filteredCar)
       }else{
        setCarData(show)
       }
    }

   
    return (

        <div class="container-fluid py-5">
            <div class="container pt-5 pb-3">
                <h1 class="display-4 text-uppercase text-center mb-5 bg-warning">Find Your Car</h1>
                <div className='mt-3 mb-5'>
            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Search or Selec City..."
                    onChange={handleChange}
                    value={SearchInput}
                    />

             {carData.length > 0 && carData.map((car) => (
            <datalist id="datalistOptions" key={car.location}>
                <option value={car.location} />
                {/* <option value="Kozhikode" />
                <option value="Chennai" />
                <option value="Bengaluru" />
                <option value="Trivandrum" /> */}
            </datalist>
                 ))}
        </div>
                <div class="row">

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

                                <div class="px-2 border-left border-right">
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
                            <a class="btn btn-warning px-3" href="">₹{car.perDayCharge}/day</a>
                        </div>
                    </div>
                     ))}
                </div>
            </div>
        </div>
    )
}

export default CarLists