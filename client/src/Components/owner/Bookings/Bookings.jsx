import React from 'react'
import { useEffect,useState } from 'react';
import Axios from '../../../Axios/ownerAxios.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Bookings() {
  const navigate=useNavigate();

  let token = useSelector((state) => state.Owner.Token);
  const [bookings,setBookings]=useState({})
  const [verify,setVerify]=useState(false)

  if (!token) {
    console.log("no token")
    navigate("/owner");
  }

  useEffect( () => {
    Axios.get('/bookings',
    {headers:{
      Authorization: `Bearer ${token}`,
    }}).then((res) => {
      setBookings(res.data)
      console.log(res.data,"response here")
 
   }).catch((error) => {
       console.log(error.message);
   });
}, [verify]);

const verification=async(id,status)=>{
  console.log(id,"id")

  await Axios.patch(`/changeStatus`,{id,status}, {
    headers: {
    Authorization: `Bearer ${token}`,
    },
})
.then((res) => {
  console.log(res.data,"response")
  setVerify(!verify)
})
.catch((error) => {
    console.log(error.messsage);
});
}

  return (

    <div id="main-wrapper">
           
                    <div class="row align-items-center grid-margin">
                        <div class="col-12">
                            <div class="card card-white">
                                <div class="card-body row align-items-center">
                                    <div class="col-12 col-md-5 mb-4 mb-md-0">
                                        <h4 class="mb-0">Bookings</h4>
                                    </div>

                                    <div class="col-12 col-md-7">

                                        <div class="row">

                                            <div class="col-md-8 mb-3 mb-md-0">
                                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="exampleInputEmail1" placeholder="search by name"/>
                                            </div>

                                            <div class="col-md-4">
                                                <select class="form-control form-select">
                                                    <option>Booking Amount</option>
                                                    <option>Highest To Lowest</option>
                                                    <option>Lowest To Highest</option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="container-fluid">
  <div class="row">
    <div class="col-12 grid-margin">
      <div class="card card-white">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead class="bg-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Car</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">My Amount</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Pickup</th>
                  <th scope="col">Drop</th>
                  <th scope="col">Status</th>
                  <th scope="col">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 && bookings.map((booking,index)=>(
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="me-4">
                        <img src={`/safad/${booking.car.images[0]}`} class="rounded-circle" alt="..." style={{height:'50px',width:'50px'}}/>
                      </div>
                      <div>
                        <h6>{booking.car.carModel}</h6>
                        <span>ID : #{booking.bookingId}</span>
                      </div>
                    </div>
                  </td>
                  <td>{booking.orderDate}</td>
                  <td>₹{booking.ownerAmount}</td>
                  <td>₹{booking.TotalAmount}</td>
                  <td>{booking.pickup}</td>
                  <td>{booking.drop}</td>
                  <td>
 {booking.status==="Completed" ? <button type="button" class="btn btn-sm  text-white" style={{backgroundColor:'green'}}>{booking.status}</button>:<button type="button" class="btn btn-sm  text-white" style={{backgroundColor:'#2b2e4a'}}>{booking.status}</button>}
  
</td>

                  <td>
                   {booking.status==="pickup pending" && <button class="btn btn-sm text-white me-4" type="button" style={{backgroundColor:'#F77D0A'}} onClick={()=>verification(booking._id,"Drop Pending")}>
                      Picked
                    </button>}

                    {booking.status==="Drop Pending" && <button class="btn btn-sm text-white me-4" type="button" style={{backgroundColor:'#F77D0A'}} onClick={()=>verification(booking._id,"Dropped")}>
                      Dropped
                    </button>}

                    {booking.status==="Dropped" && <button class="btn btn-sm text-white me-4" type="button" style={{backgroundColor:'green'}} onClick={()=>verification(booking._id,"Completed")}>
                      Paid
                    </button>}

                    {booking.status==="Completed" && <button class="btn btn-sm text-white me-4" type="button" style={{backgroundColor:'green'}} >
                      Completed
                    </button>}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  
                </div>


  //   <div class="container mt-5">
  //   <div class="row">

  //       <div class="col-md-4">
  //         <div class="card mb-4">
  //           <img class="card-img-top" src="/safad/car-rent-1.png" alt="Car Image"/>
  //           <div class="card-body">
  //             <h5 class="card-title">Mercedez benz</h5>
  //             <p class="card-text">Automatic</p>
  //             <ul class="list-unstyled">
  //               <li><strong>Date:</strong> 12-05-2023</li>
  //               <li><strong>Time:</strong> 12:00 am</li>
  //               <li><strong>Location:</strong> Bengaluru</li>
  //             </ul>
  //             <a href="#" class="btn btn-warning">View Details</a>
  //           </div>
  //         </div>
  //       </div>

  //       <div class="col-md-4">
  //         <div class="card mb-4">
  //           <img class="card-img-top" src="/safad/car-rent-2.png" alt="Car Image"/>
  //           <div class="card-body">
  //             <h5 class="card-title">Mercedez benz</h5>
  //             <p class="card-text">Automatic</p>
  //             <ul class="list-unstyled">
  //               <li><strong>Date:</strong> 12-05-2023</li>
  //               <li><strong>Time:</strong> 12:00 am</li>
  //               <li><strong>Location:</strong> Bengaluru</li>
  //             </ul>
  //             <a href="#" class="btn btn-warning">View Details</a>
  //           </div>
  //         </div>
  //       </div>


  //       <div class="col-md-4">
  //         <div class="card mb-4">
  //           <img class="card-img-top" src="/safad/car-rent-3.png" alt="Car Image"/>
  //           <div class="card-body">
  //             <h5 class="card-title">Mercedez benz</h5>
  //             <p class="card-text">Automatic</p>
  //             <ul class="list-unstyled">
  //               <li><strong>Date:</strong> 12-05-2023</li>
  //               <li><strong>Time:</strong> 12:00 am</li>
              
  //               <li><strong>Location:</strong> Bengaluru</li>
  //             </ul>
  //             <a href="#" class="btn btn-warning">View Details</a>
  //           </div>
  //         </div>
  //       </div>

  //   </div>
  // </div>
  

                
  )
}

export default Bookings