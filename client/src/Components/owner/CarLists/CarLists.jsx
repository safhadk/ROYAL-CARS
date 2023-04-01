import React ,{ useState,useEffect }from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ownerAxios from "../../../Axios/ownerAxios.js";

function CarLists() {
    const navigate = useNavigate();
    const [carData, setCarData] = useState({});
    let token = useSelector((state) => state.Owner.Token);

    if (!token) {
        navigate("/");
    }
    useEffect(() => {
    
        
        ownerAxios
            .get("/cars", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCarData(response.data.data);
                // console.log(response.data.data[0])
                // console.log('datas' + response.data.data)
                console.log('modelname:' + carData[0].carModel)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

   
    return (

        <div class="container-fluid py-5">
            <div class="container pt-5 pb-3">

                <h1 class="display-4 text-uppercase text-center mb-5 bg-warning">Find Your Car</h1>
                <button className="btn text-white me-4 mb-3" style={{ backgroundColor: '#F77D0A' }} onClick={() => {
                    navigate("/owner/add-car");
                }} >
                    Add New Car
                </button>
               
             

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






                    {/* <div class="col-lg-4 col-md-6 mb-2">
                        <div class="rent-item mb-4">
                            <img class="img-fluid mb-4" src="\images\car-rent-2.png" alt="" />
                            <h4 class="text-uppercase mb-4">Mercedes Benz R3</h4>
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa fa-car text-warning mr-1"></i>
                                    <span>2015</span>
                                </div>
                                <div class="px-2 border-left border-right">
                                    <i class="fa fa-cogs text-warning mr-1"></i>
                                    <span>AUTO</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa fa-road text-warning mr-1"></i>
                                    <span>25K</span>
                                </div>
                            </div>
                            <a class="btn btn-warning px-3" href="">$99.00/Day</a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                        <div class="rent-item mb-4">
                            <img class="img-fluid mb-4" src="\images\car-rent-3.png" alt="" />
                            <h4 class="text-uppercase mb-4">Mercedes Benz R3</h4>
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa fa-car text-warning mr-1"></i>
                                    <span>2015</span>
                                </div>
                                <div class="px-2 border-left border-right">
                                    <i class="fa fa-cogs text-warning mr-1"></i>
                                    <span>AUTO</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa fa-road text-warning mr-1"></i>
                                    <span>25K</span>
                                </div>
                            </div>
                            <a class="btn btn-warning px-3" href="">$99.00/Day</a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                        <div class="rent-item mb-4">
                            <img class="img-fluid mb-4" src="\images\car-rent-4.png" alt="" />
                            <h4 class="text-uppercase mb-4">Mercedes Benz R3</h4>
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa fa-car text-warning mr-1"></i>
                                    <span>2015</span>
                                </div>
                                <div class="px-2 border-left border-right">
                                    <i class="fa fa-cogs text-warning mr-1"></i>
                                    <span>AUTO</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa fa-road text-warning mr-1"></i>
                                    <span>25K</span>
                                </div>
                            </div>
                            <a class="btn btn-warning px-3" href="">$99.00/Day</a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                        <div class="rent-item mb-4">
                            <img class="img-fluid mb-4" src="\images\car-rent-5.png" alt="" />
                            <h4 class="text-uppercase mb-4">Mercedes Benz R3</h4>
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa fa-car text-warning mr-1"></i>
                                    <span>2015</span>
                                </div>
                                <div class="px-2 border-left border-right">
                                    <i class="fa fa-cogs text-warning mr-1"></i>
                                    <span>AUTO</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa fa-road text-warning mr-1"></i>
                                    <span>25K</span>
                                </div>
                            </div>
                            <a class="btn btn-warning px-3" href="">$99.00/Day</a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                        <div class="rent-item mb-4">
                            <img class="img-fluid mb-4" src="\images\car-rent-6.png" alt="" />
                            <h4 class="text-uppercase mb-4">Mercedes Benz R3</h4>
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa fa-car text-warning mr-1"></i>
                                    <span>2015</span>
                                </div>
                                <div class="px-2 border-left border-right">
                                    <i class="fa fa-cogs text-warning mr-1"></i>
                                    <span>AUTO</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa fa-road text-warning mr-1"></i>
                                    <span>25K</span>
                                </div>
                            </div>
                            <a class="btn btn-warning px-3" href="">$99.00/Day</a>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>

    )
}

export default CarLists