import React, { useState,useEffect } from 'react'
import axios from '../../../Axios/adminAxios.js';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../Helper/Toast.js';
import { useLocation } from 'react-router-dom';

function OwnerDetails() {
  const navigate=useNavigate();
  let token = useSelector((state) => state.Admin.Token);
  const [owner,setOwner]=useState({})
  const[verify,setVerify]=useState(false)
  const location=useLocation()
  console.log(owner,"owner 25")

  if (!token) {
    navigate("/admin");
}
  useEffect(() => {
      axios.get(`/ownerDetails?id=${location.state.id}`,
      {headers:{
        Authorization: `Bearer ${token}`,
      }})
      .then((res) => {
        console.log(res.data,"data")
        setOwner(res.data)
    })
    .catch((error) => {
        console.log(error.message);
    });
  }, [verify])

  const verification=async(id)=>{
    console.log(id,"id")
    await axios.patch(`/verify`,{id}, {
      headers: {
      Authorization: `Bearer ${token}`,
      },
  })
  .then((res) => {
    console.log(res.data,"response")
    setVerify(true)
  })
  .catch((error) => {
      console.log(error.messsage);
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
          <div class="card mb-4" style={{height:"470px"}}>
            <div class="card-body text-center" style={{display:'flex',flexDirection:'column',alignItems:'center',}}>
            <img src="/safad/team-4.jpg" alt="avatar"
                class="rounded-circle " style={{width: '100px',height:'100px'}}/>
              
              <h5 class="my-3">{owner[0]?.name}</h5>
              <p class="text-muted mb-2">City : {owner[0]?.city}</p>
              <p class="text-muted mb-2">Place : {owner[0]?.place}</p>
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
               
                 
                  { owner[0]?.verified===true ? 
                 <button className="btn  text-white me-4" type="button" style={{backgroundColor:'green'}} >
                       Verified
                  </button> 
                   :
                   <button className="btn  text-white me-4" type="button" style={{backgroundColor:'#F77D0A'}} onClick={()=>verification(owner[0]._id)} >
                       Start Verification
                  </button>}
         

                  

                  

              </div>
              <img src="/safad/car-rent-5.png" alt="" style={{height:'250px'}}/>
            </div>
          </div>
          
          </div>

          

          <div class="col-md-5 border-right mt-4">
            
        <div class="">

            
          
                <div class="row ">
               
                    <div class="col-md-6"> <p class="text-white ">name</p><input type="text" class="form-control" placeholder=" name"  value={owner[0]?.name} readOnly/></div>
                    <div class="col-md-6 "> <p class="text-white ">email</p><input type="text" class="form-control"  placeholder="email" value={owner[0]?.email} readOnly/></div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6"><p class="text-white ">phone</p><input type="text" class="form-control" placeholder="phone" value={owner[0]?.phone}  readOnly/></div>
                    <div class="col-md-6 "><p class="text-white ">email</p><input type="text" class="form-control"  placeholder="Place" value={owner[0]?.place} readOnly  /></div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><p class="text-white ">pincode</p><input type="text" class="form-control" placeholder="pincode" value={owner[0]?.pincode} readOnly /></div>
                    <div class="col-md-6"><p class="text-white ">city</p><input type="text" class="form-control"  placeholder="city" value={owner[0]?.city} readOnly/></div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><p class="text-white ">district</p><input type="text" class="form-control" placeholder="district" value={owner[0]?.district} readOnly  /></div>
                    <div class="col-md-6 "><p class="text-white ">state</p><input type="text" class="form-control"  placeholder="State" value={owner[0]?.state} readOnly/></div>
                </div>
                <div class="row mt-2">
                <div class="col-md-6"><p class="text-white ">country</p><input type="text" class="form-control"  placeholder="Country" value={owner[0]?.country} readOnly/></div>
                    <div class="col-md-6 "><p class="text-white ">aadhar number</p><input type="text" id="s" name="s" class="form-control" placeholder="Aadhar Number"value={owner[0]?.aadhar}readOnly/></div>   
                </div>

                <div class="row mt-2">
                {/* { owner.verified===true ?   */}
                {/* <button className="btn  text-white me-4" type="button" style={{backgroundColor:'green'}} >
                       Verified
                  </button>  */}
              {/* : */}
                  {/* <button className="btn  text-white me-4" type="button" style={{backgroundColor:'#F77D0A'}} >
                       Verification Pending
                  </button> */}
               {/* } */}
                </div>

                <div class="row mt-2">
                <img src={`/safad/${owner[0]?.images[0]}`} alt="" style={{width:'260px',marginBottom:'10px',borderRadius:'20px'}}/>
                <img src={`/safad/${owner[0]?.images[1]}`} alt="" style={{width:'250px',marginBottom:'10px',borderRadius:'20px'}} />
                </div>
              
             
              
            </div>
            
     
            
          
        </div>
 
        </div>
     
            

       

      </div>

    
  </section>


 





  )
}

export default OwnerDetails