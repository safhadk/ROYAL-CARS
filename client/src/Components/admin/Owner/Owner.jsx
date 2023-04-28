
import React ,{useEffect,useState }from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from '../../../Axios/adminAxios';
import Moment from 'react-moment'


function Owner() {

    const navigate = useNavigate();
    let token = useSelector((state) => state.Admin.Token);
    const [owner,setOwner]=useState({})
    const [block,setBlock]=useState(false)
    
    if (!token) {
        navigate("/admin");
    }
    useEffect(() => {
      axios.get("/owners", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
              console.log(res.data,"response")
              setOwner(res.data)
            })
            .catch((error) => {
                console.log(error.messsage);
            });
    }, [block]);


    const ownerBlock=async(id)=>{
      console.log(id,"id")
        await axios.patch(`/ownerBlock`,{id:id}, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => {
        console.log(res.data,"response")
        setBlock(!block)
      })
      .catch((error) => {
          console.log(error.messsage);
      });

    }

    const ownerUnblock=async(id)=>{
      console.log(id,"id")
        await axios.patch(`/ownerUnblock`,{id:id}, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => {
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
                <h4 class="mb-0">Owners</h4>
              </div>
              <div class="col-12 col-md-7">
                <div class="row">
                  <div class="col-md-8 mb-3 mb-md-0">
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="exampleInputEmail1" placeholder="Search by name" />
                  </div>
                  <div class="col-md-4">
                    <select class="form-control form-select">
                      <option>Total Cars</option>
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
                      <th scope="col">Owners</th>
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
                    {owner.length > 0 && owner.map((owner,index)=>(
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="me-4">
                            <img src="/safad/profile-02.png" class="rounded-circle" alt="..." />
                          </div>
                          <div>
                            <h6>{owner.name}</h6>
                            {/* <span>ID: #SK2540</span> */}
                          </div>
                        </div>
                      </td>
                      <td>{owner.phone}</td>
                      <td>{owner.email}</td>
                     {owner.block===true ?  <td><span class="text-danger">Blocked</span></td> :<td><span class="text-success">Active</span></td>}
                    
                      {/* <td>$2563</td> */}
                      <td><Moment format="dddd,DD-MM-YYYY hh:mm:a">{owner.createdAt}</Moment></td>
                      <td>
                      {owner.verified===true && <button type="button" class="btn btn-sm  text-white" style={{backgroundColor:'green'}}>Approved</button>}
                     {owner.verified===false && <button type="button" class="btn btn-sm  text-white" style={{backgroundColor:'#2b2e4a'}}>Requested</button>}
                     {owner.verified !==false && owner.verified !==true   && <button type="button" class="btn btn-sm  text-black" style={{backgroundColor:'orange',width:'85px'}}>pending</button>}
                                </td>
                      <td>
                      
  
                                    {/* <a href="#" class="me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                        <i class="far fa-edit text-primary"></i>
                                    </a>
                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                        <i class="far fa-trash-alt text-danger"></i>
                                    </a> */}

{owner.block===true ?<button className="btn btn-sm text-white bg-danger me-4" type="submit" style={{borderRadius:'100px'}} onClick={()=>ownerUnblock(owner._id)}>
                        UnBlock
                    </button>: <button className="btn btn-sm text-white bg-success me-4" style={{width:'70px',borderRadius:'100px'}} type="submit" onClick={()=>ownerBlock(owner._id)} >
                        Block
                    </button>}

                    <button className="btn btn-sm text-white bg-dark me-4" style={{width:'85px',borderRadius:'100px'}} type="submit" onClick={()=>navigate('/admin/owner-details', { state: { id: owner._id } })} >
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

export default Owner