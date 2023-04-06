import React,{ useState } from 'react';
import ownerAxios from "../../../Axios/ownerAxios.js";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


function AddCars() {

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {

  setImages([...images, e.target.files[0]]);
};

  const navigate = useNavigate();
  const [carModel, setCarModel] = useState("")
  const [location, setLocation] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [perHourCharge, setPerHourCharge] = useState("")
  const [perDayCharge, setPerDayCharge] = useState("")
  const [perMonthCharge, setPerMonthCharge] = useState("")
  const [place, setPlace] = useState("")
  const [seater, setSeater] = useState("")
  const [transmission, setTransmission] = useState("")
  const [fuel, setFuel] = useState("")

  const token = useSelector((state) => state.Owner.Token);
  if (!token) {
    console.log("no token")
    navigate("/owner");
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

const handleAddCar = async (e) => {
  e.preventDefault();
  console.log(images);
  const formData = new FormData();
  console.log("formdata" + formData)
  images.forEach((image, index) => {
    formData.append('image', image);
  });
  formData.append('carModel', String(carModel));
  formData.append('location', String(location));
  formData.append('registrationNumber', String(registrationNumber));
  formData.append('perHourCharge', String(perHourCharge));
  formData.append('perDayCharge', String(perDayCharge));
  formData.append('perMonthCharge', String(perMonthCharge));
  formData.append('place', String(place));
  formData.append('seater', String(seater));
  formData.append('transmission', String(transmission));
  formData.append('fuel', String(fuel));

  console.log(formData)

    const addCar = await ownerAxios.post("/addCar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log(res.data)
          Toast.fire({
            icon: "success",
            title: "Car Added",
          }).then(() => {
            navigate("/owner/cars");
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Somthing went wrong",
          }).then(() => {
            console.log("error safad")
            navigate("/owner");
          });
        }
      });
  };


  return (
    <>
      <button className="btn-sm btn-dark ml-3 mt-4 mb-3" onClick={() => {navigate("/owner/cars"); }}>
        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Go Back
      </button>
      <div className="container-fluid" style={{ backgroundColor: "#2B2E4A" }}>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card p-4 m-5">
              <form onSubmit={handleAddCar}>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="carModel" name="carModel" placeholder='Car Model' onChange={(e) => {
                      setCarModel(e.target.value);
                    }} />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <select className="form-control" id="location" name="location" placeholder='Location:' onChange={(e) => {
                      setLocation(e.target.value);
                    }}>
                      <option value="">City</option>
                      <option value="Kochi">Kochi</option>
                      <option value="Kozhikode">Kozhikode</option>
                      <option value="Trivandrum">Trivandrum</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Bengaluru">Bengaluru</option>
                      
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="place" name="place" placeholder='Enter place:' onChange={(e) => {
                      setPlace(e.target.value);
                    }} />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12">
                    <select className="form-control" id="seater" name="seater" placeholder='No of Seater:' onChange={(e) => {
                      setSeater(e.target.value);
                    }}>
                      <option value="">Seater :</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>

                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12">
                    <select className="form-control" id="transmission" name="transmission" placeholder='Transmission:' onChange={(e) => {
                      setTransmission(e.target.value);
                    }}>
                      <option value="">Transmission :</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12">
                    <select className="form-control" id="fuel" name="fuel" placeholder='Fuel:' onChange={(e) => {
                      setFuel(e.target.value);
                    }}>
                      <option value="">Fuel :</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </div>
                </div>


                <div className="form-group row">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="registrationNumber" name="registrationNumber" placeholder='Registration Number:' onChange={(e) => {
                      setRegistrationNumber(e.target.value);
                    }} />
                  </div>
                </div>

               

                <div className="form-group row">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="perHourCharge" name="perHourCharge" placeholder='Per Hour Charge:' onChange={(e) => {
                      setPerHourCharge(e.target.value);
                    }} />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="perDayCharge" name="perDayCharge" placeholder='Per Day Charge:' onChange={(e) => {
                      setPerDayCharge(e.target.value);
                    }} />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="perMonthCharge" name="perMonthCharge" placeholder='Per Month Charge:' onChange={(e) => {
                      setPerMonthCharge(e.target.value);
                    }} />
                  </div>
                </div>
              
                <div className="form-group row">
        <div className="col-sm-8">
          <input
            type="file"
            className="form-control"
            id="0"
            name="image"
            placeholder="Image:"
            onChange={handleImageChange}
          />
          {/* {images[0] && (
            <img
              src={URL.createObjectURL(images[0])}
              alt="Preview"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )} */}
        </div>
      </div>

      <div className="form-group row">
  <div className="col-sm-8">
    <input
      type="file"
      className="form-control"
      id="1"
      name="image"
      placeholder="Image:"
      onChange={handleImageChange}
    />
  </div>
</div>

<div className="form-group row">
  <div className="col-sm-8">
    <input
      type="file"
      className="form-control"
      id="2"
      name="image"
      placeholder="Image:"
      onChange={handleImageChange}
    />
  </div>
</div>

<div className="form-group row">
  <div className="col-sm-8">
    <input
      type="file"
      className="form-control"
      id="3"
      name="image"
      placeholder="Image:"
      onChange={handleImageChange}
    />
  </div>
</div>




                <div className="form-group row">
                  <div className="col-sm-8 offset-sm-4">
                    <button type="submit" className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                      Add Car
                    </button>


                  </div>
                </div>
              </form>
              <div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>


  );
}

export default AddCars;
