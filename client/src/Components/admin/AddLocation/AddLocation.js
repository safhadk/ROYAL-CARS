import React, { useEffect, useState } from 'react';
import axios from '../../../Axios/adminAxios.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../Helper/Toast.js';

function AddLocation() {

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...images, e.target.files[0]]);
  };

  const navigate = useNavigate();
  
  const [location, setLocation] = useState("")
  
  const token = useSelector((state) => state.Admin.Token);
  if (!token) {
    console.log("no token")
    navigate("/admin");
  }

  useEffect(() => {
 console.log("work") 
  }, [])
  
  const handleAddLocation = async (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('image', image);
    });
   
    formData.append('location', String(location));

    console.log(formData,"dataaa")
try {
  const addLocation = await axios.post("/location", formData, {
    headers: {
       Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
  })
    .then((res) => {
      if (res.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: "Location Added",
        }).then(() => {
          navigate("/admin/locations");
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Somthing went wrong",
        }).then(() => {
          navigate("/admin");
        });
      }
    });


} catch (error) {
  console.log(error,"error in add location")
}
   
  };

  return (
    <>
     
      <h1 class="display-4 text-uppercase text-center mb-5 bg-warning">Add Location</h1>
      <button className="btn-sm btn-dark ml-3 mt-4 mb-3" onClick={() => { navigate("/admin/locations"); }}>
        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Go Back
      </button>
      <div className="container-fluid" style={{ backgroundColor: "#2B2E4A" }}>
        
        <div className="row justify-content-center">
   
          <div className="col-lg-6 col-md-8">
       
            <div className="card p-4 m-5">
            
              <form onSubmit={handleAddLocation}>
                
                <div className="form-group row">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="location" name="location" placeholder='Enter City Name:' onChange={(e) => {
                      setLocation(e.target.value);
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
                  </div>
                </div>

              
                <div className="form-group row">
                  <div className="col-sm-8 offset-sm-4">
                    <button type="submit" className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                      Add Location
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

export default AddLocation;
