import React, { useState,useEffect } from 'react'
import Axios from '../../../Axios/ownerAxios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../Helper/Toast.js';

function Profile() {
  const navigate=useNavigate();
  let token = useSelector((state) => state.Owner.Token);
  const [owner,setOwner] =useState({})
  const [place,setPlace]=useState("")
  const [pincode,setPincode]=useState("")
  const [city,setCity]=useState("")
  const [district,setDistrict]=useState("")
  const [state,setState]=useState("")
  const [country,setCountry]=useState("")
  const [aadhar,setAadhar]=useState("")


  if (!token) {
    navigate("/owner");
}
  useEffect(() => {
      Axios.get('/profile',
      {headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }})
      .then((res) => {
      console.log(res.data,"data")

        setOwner(res.data.owner)
        console.log(res.data.owner,"owner in response")
    })
    .catch((error) => {
        console.log(error.message);
    });
  }, [])

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {

    setImages([...images, e.target.files[0]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('image', image);
    });
    formData.append('place', String(place));
    formData.append('pincode', String(pincode));
    formData.append('city', String(city));
    formData.append('district', String(district));
    formData.append('state', String(state));
    formData.append('country', String(country));
    formData.append('aadhar', String(aadhar));


    const updateProfile = await Axios.post("/profile", formData, {
      headers: {
         Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    })
      .then((res) => {
        if (res.data.status === "success") {
            Toast.fire({
            icon: "success",
            title: "Profile updated ",
          }).then(() => {
            navigate("/owner");
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Somthing went wrong",
          }).then(() => {
            navigate("/owner");
          });
        }
      });
  
  }
  return (

    <section style={{backgroundColor: '#eee'}}>
    <div class="container py-5">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item"><a href="#">User</a></li>
              <li class="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>
        </div>
      </div>
  
      <div class="row" style={{display:'flex',justifyContent:'center',background: '#2b2e4a',}}>
        <div class="col-lg-4 mt-5">
          <div class="card mb-4">
            <div class="card-body text-center" style={{display:'flex',flexDirection:'column',alignItems:'center',}}>
              <img src="/safad/team-4.jpg" alt="avatar"
                class="rounded-circle " style={{width: '100px',height:'100px'}}/>
              
              <h5 class="my-4">{owner.name}</h5>
              <p class="text-muted mb-2">City : {owner.city}</p>
              <p class="text-muted mb-2">Place : {owner.place}</p>
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
              <div class="d-flex justify-content-center mb-2">
               
                  {/* {owner.verified===false && <button className="btn  text-white me-4" type="button" style={{backgroundColor:'#F77D0A'}} >
                       Verification Pending
                  </button>}
                 */}
                  { owner.verified===true ?  <button className="btn  text-white me-4" type="button" style={{backgroundColor:'green'}} >
                       Verified
                  </button> :<button className="btn  text-white me-4" type="button" style={{backgroundColor:'#F77D0A'}} >
                       Verification Pending
                  </button> }

                  

                  

              </div>
            </div>
          </div>
          </div>

          <div class="col-md-5 border-right mt-5">
            
            { owner.verified===true ||owner.verified ===false  ? <div class="">
          
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder=" name"  value={owner.name} readOnly/></div>
                    <div class="col-md-6 mt-2"><input type="text" class="form-control"  placeholder="email" value={owner.email} readOnly/></div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="phone" value={owner.phone}  readOnly/></div>
                    <div class="col-md-6 mt-2"><input type="text" class="form-control"  placeholder="Place" value={owner.place} readOnly  /></div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="pincode" value={owner.pincode} readOnly /></div>
                    <div class="col-md-6 mt-2"><input type="text" class="form-control"  placeholder="city" value={owner.city} readOnly/></div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="district" value={owner.district} readOnly  /></div>
                    <div class="col-md-6 mt-2"><input type="text" class="form-control"  placeholder="State" value={owner.state} readOnly/></div>
                </div>
                <div class="row mt-2">
                <div class="col-md-6"><input type="text" class="form-control"  placeholder="Country" value={owner.country} readOnly/></div>
                    <div class="col-md-6 mt-2"><input type="text" id="s" name="s" class="form-control" placeholder="Aadhar Number"value={owner.aadhar} readOnly/></div>   
                </div>
               
                {/* <div class="row mt-2">
                <div class="col-md-12 text-danger"><h1>Upload Front And Back Image of Aadhar Card</h1></div>
                </div> */}

                {/* <div class="row mt-2">
                <div class="col-md-6"><input class="form-control" type="file"/></div>
                <div class="col-md-6 mt-2"><input class="form-control" type="file"/></div>
                   
                </div> */}
                {/* <div class="mt-5 text-center"> */}
                  {/* <button class="btn btn-primary profile-button" type="button">Save Profile</button> */}
                  {/* <button className="btn text-white me-4 mb-3" type="button" style={{backgroundColor:'#F77D0A'}}>
                      Verify
                  </button>
                  </div> */}
                  
          
            </div>
            
            :
            
            <div class="">
              <form method="post" onSubmit={handleSubmit}>
          
          <div class="row mt-2">
                    <div class="col-md-6"><input type="text" id="name" name="name" class="form-control" placeholder=" name"  value={owner.name} readOnly/></div>
                    <div class="col-md-6 mt-2"><input type="text" id="email" name="email" class="form-control"  placeholder="email" value={owner.email} readOnly/></div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" id="phone" name="phone" class="form-control" placeholder="phone" value={owner.phone}  readOnly/></div>
                    <div class="col-md-6 mt-2"><input type="text" id="place" name="place" class="form-control"  placeholder="place" value={place} onChange={(e) => {
                      setPlace(e.target.value);
                    }}  /></div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" id="pincode" name="pincode" class="form-control" placeholder="pincode" value={pincode} onChange={(e) => {
                      setPincode(e.target.value);
                    }}  /></div>
                    <div class="col-md-6 mt-2"><input type="text" id="city" name="city" class="form-control"  placeholder="city" value={city} onChange={(e) => {
                      setCity(e.target.value);
                    }}/></div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" id="district" name="district" class="form-control" placeholder="district" value={district} onChange={(e) => {
                      setDistrict(e.target.value);
                    }}  /></div>
                    <div class="col-md-6 mt-2"><input type="text" id="state" name="state" class="form-control"  placeholder="state" value={state} onChange={(e) => {
                      setState(e.target.value);
                    }}/></div>
                </div>
                <div class="row mt-2">
                <div class="col-md-6"><input type="text" class="form-control" id="country" name="country"  placeholder="Country" value={country} onChange={(e) => {
                      setCountry(e.target.value);
                    }}/></div>
                    <div class="col-md-6 mt-2"><input type="text" id="aadhar" name="aadhar" class="form-control" placeholder="Aadhar Number" value={aadhar} onChange={(e) => {
                      setAadhar(e.target.value);
                    }} /></div>   
                </div>
               
                <div class="row mt-2">
                <div class="col-md-12 text-danger"><h1>Upload Front And Back Image of Aadhar Card</h1></div>
                </div>

                <div class="row mt-2">
                <div class="col-md-6"><input  type="file"
                      className="form-control"
                      id="1"
                      name="image"
                      placeholder="Image:"
                      onChange={handleImageChange}/></div>
                <div class="col-md-6 mt-2"><input   type="file"
                      className="form-control"
                      id="2"
                      name="image"
                      placeholder="Image:"
                      onChange={handleImageChange}/></div>
                   
                </div>
                <div class="mt-5 text-center">
                  {/* <button class="btn btn-primary profile-button" type="button">Save Profile</button> */}
                  <button className="btn text-white me-4 mb-3" type="submit" style={{backgroundColor:'#F77D0A'}}>
                      Verify
                  </button>
                  </div>
                  </form>
                  
          
            </div>}
        </div>
 
        </div>
     
            

       

      </div>

    
  </section>


 





  )
}

export default Profile