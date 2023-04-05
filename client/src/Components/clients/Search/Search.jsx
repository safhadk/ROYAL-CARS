import React, { useState,useEffect } from 'react';
import userAxios from "../../../Axios/userAxios.js";

function Search() {
   
    const [carData, setCarData] = useState({});
    const [city,setCity] = useState("")
    const [pickup,setPickup] = useState("")
    const [drop,setDrop] = useState("")

    useEffect(() => {
        userAxios
            .get("/cars")
            .then((response) => {
                setCarData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    let handleSearch=()=>{
        console.log(city)
        //  await userAxios
        // .post("/search",{city,pickup,drop})
        // .then((res) => {
        //     console.log(res)
        // })
        // .catch((e) => {
        //     console.log(e.message);
        // });
    }
   

   
    

    return (
        <div className='mt-3'>
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
                    onChange={(e)=>{
                    setCity(e.target.value)}}
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
                <input 
    type="datetime-local" 
    className="form-control datetimepicker-input" 
    placeHolder="Select Pickup Date and Time"
    data-target="#date" 
    data-toggle="datetimepicker" 
    onChange={(e) => { setPickup(e.target.value) }}
    value={pickup} 
/>

                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-6 px-2 ">
                <div class="time mb-3" id="time" data-target-input="nearest">
                    <input type="datetime-local" class="form-control datetimepicker-input" placeholder="Pickup Time"
                        data-target="#time" data-toggle="datetimepicker"
                        onChange={(e)=>{
                            setDrop(e.target.value)}}
                            value={drop} onClick={handleSearch} />
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
            <button  type="button" className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                      SUBMIT
                    </button>
                   
            </div>
        </div>
    </div>
        </div>
    );
}

export default Search;
