import React ,{useEffect,useState }from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from '../../../Axios/adminAxios';
import Moment from 'react-moment'



function User() {
    const navigate = useNavigate();
    let token = useSelector((state) => state.Admin.Token);
    const [user,setUser]=useState({})
    const [block,setBlock]=useState(false) 

    if (!token) {
        navigate("/admin");
    }

    useEffect(() => {
      axios.get("/users", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
              console.log(res.data,"response")
              setUser(res.data)
            })
            .catch((error) => {
                console.log(error.messsage);
            });
    }, [block]);

    const userBlock=async(id)=>{
      console.log(id,"id")
        await axios.patch(`/block`,{id:id}, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => {
        console.log(res,"re in user block")
        console.log(res.data,"response")
        setBlock(!block)
      })
      .catch((error) => {
          console.log(error.messsage);
      });
    }

    const userUnblock=async(id)=>{
      console.log(id,"id")
      console.log(token)
        await axios.patch(`/unblock/`,{id:id}, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => {
        console.log(res,"re in user unblock")
        console.log(res.data,"response")
        setBlock(!block)
      })
      .catch((error) => {
          console.log(error.messsage);
      });
    }

  return (
    <div id="main-wrapper">
    <div class="container-fluid">
      <div class="row align-items-center grid-margin">
        <div class="col-12">
          <div class="card card-white">
            <div class="card-body row align-items-center">
              <div class="col-12 col-md-5 mb-4 mb-md-0">
                <h4 class="mb-0">Users</h4>
              </div>
              <div class="col-12 col-md-7">
                <div class="row">
                  <div class="col-md-8 mb-3 mb-md-0">
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="exampleInputEmail1" placeholder="Search by name" />
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
  
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="card card-white">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class="bg-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Users</th>
                      <th scope="col">Contacts</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      {/* <th scope="col">Total Amount</th> */}
                      <th scope="col">Joining Date</th>
                      <th scope="col">Approval</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.length > 0 && user.map((user,index)=>(
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="me-4">
                            <img src="/safad/profile-02.png" class="rounded-circle" alt="..." />
                          </div>
                          <div>
                            <h6>{user.name}</h6>
                            {/* <span>ID: #SK2540</span> */}
                          </div>
                        </div>
                      </td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                     {user.block===true ?  <td><span class="text-danger">Blocked</span></td> :<td><span class="text-success">Active</span></td>}
                    
                      {/* <td>$2563</td> */}
                      <td><Moment format="dddd,DD-MM-YYYY hh:mm:a">{user.createdAt}</Moment></td>
                      <td>
                     {user.verified===true && <button type="button" class="btn btn-sm  text-white" style={{backgroundColor:'green'}}>Approved</button>}
                     {user.verified===false && <button type="button" class="btn btn-sm  text-white" style={{backgroundColor:'#2b2e4a'}}>Requested</button>}
                     {user.verified !==false && user.verified !==true   && <button type="button" class="btn btn-sm  text-black" style={{backgroundColor:'orange',width:'85px'}}>pending</button>}
                     
                                </td>
                      <td>
                      
  
                                    {/* <a href="#" class="me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                        <i class="far fa-edit text-primary"></i>
                                    </a>
                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                        <i class="far fa-trash-alt text-danger"></i>
                                    </a> */}

{user.block===true ?<button className="btn btn-sm text-white bg-danger me-4" type="submit" style={{borderRadius:'100px'}} onClick={()=>userUnblock(user._id)} >
                        UnBlock
                    </button>: <button className="btn btn-sm text-white bg-success me-4" style={{width:'70px',borderRadius:'100px'}} type="button" onClick={()=>userBlock(user._id)} >
                        Block
                    </button>}

                    <button className="btn btn-sm text-white bg-dark me-4" style={{width:'85px',borderRadius:'100px'}} type="submit" onClick={()=>navigate('/admin/user-details', { state: { id: user._id } })} >
                        View
                    </button>
                                </td>
                                
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>

</div>                </div>
            </div>
        </div>
    </div>
 
</div>
  )
}

export default User