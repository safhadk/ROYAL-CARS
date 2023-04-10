import React ,{ useState,useEffect }from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ownerAxios from "../../../Axios/ownerAxios.js";

function CarLists() {
    const navigate = useNavigate();
    const [carData, setCarData] = useState({});
    const [verification,setVerification] = useState(false)
    let token = useSelector((state) => state.Owner.Token);

    if (!token) {
        navigate("/");
    }
    useEffect(() => {
      ownerAxios.get("/cars", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCarData(response.data.data);
                setVerification(response.data.verification)
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
                   {verification===true ? navigate("/owner/add-car"):navigate("/owner/profile")}
                }} >
                    Add New Car
                </button>
               
                <div class="row">
                {carData.length > 0 && carData.map((car) => (
                    <div class="col-lg-4 col-md-6 mb-2" key={car.carModel}>
                        <div class="rent-item mb-4">
                        <img class="img-fluid mb-4" src={`/safad/${car.images[0]}`} alt="" />

                            <h4 class="text-uppercase mb-4">{car.carModel}</h4>
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa fa-car text-warning mr-1"></i>
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

                     {carData.length===0 && <h1 class="text-danger"> No cars Added Add Your First Car</h1>}
                </div>
            </div>
        </div>
    )
}

export default CarLists