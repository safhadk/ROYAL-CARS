import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './ChatsComponent.css'
import { useSelector } from "react-redux";
import axios from "../../../Axios/userAxios";
import Moment from 'react-moment';
import EmojiPicker from 'emoji-picker-react';

function ChatsComponent({ socket, username, room, ownerId }) {
  console.log(ownerId,"tt")
  console.log("entered to compoenne")
  const [user, setuser] = useState(ownerId)
  const [clients, setClients] = useState(null)
  const [lastMessage, setLastMessage] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [users, setUsers] = useState({})
  let token = useSelector((state) => state.Client.Token);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log("not empty")
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const month = months[now.getMonth()];
      const date = now.getDate();
      const year = now.getFullYear();

      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`,
        date: ` ${date} ${month} ${year}`,
        ownerId: user
      };


      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);

      const { data } = await axios.post("/message", messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })


      console.log(data, "in db ")

      setCurrentMessage("");

    }
  };

  const getMessages=async()=>{
    const {data}= await axios.get(`/message?ownerId=${user}`, {headers:{
     Authorization: `Bearer ${token}`,
   }})
   console.log(data.messages, "data after getting message form db")
   setMessageList(data.messages)
     }

  const getAllUsers = async () => {
    const { data } = await axios.get(`/message`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(data, "set")
    setUsers(data)
  }

  const getMessagesofUser = async (id) => {
    setuser(id)
    console.log(id, "own id")
    const { data } = await axios.get(`/message?ownerId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(data.messages, "data after getting message form db")
    setMessageList(data.messages)
  }



  useEffect(() => {

      getAllUsers()
    
    console.log("in useeff")

      getMessages()
    
      
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = () => {
    setShowEmojiPicker(true);
  };

  const [emoji,setEmoji]=useState(null)

  const handleEmojiClose = (event) => {
     setEmoji(event.emoji)
     setCurrentMessage(currentMessage + event.emoji)
     setShowEmojiPicker(false);
  };

  const popupStyle = {
    position: 'absolute',
    top: '10%',
    right: '0',
  };

  return (
    <section style={{ backgroundColor: '#CDC4F9' }}>
      <div class="container py-5">

        <div class="row">
          <div class="col-md-12">

            <div class="card" id="chat3" style={{ borderRadius: '15px' }}>
              <div class="card-body">

                <div class="row">
                  <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">

                    <div class="p-3">

                      <div class="input-group rounded mb-3">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                          aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                          <i class="fas fa-search"></i>
                        </span>
                      </div>
                      <ScrollToBottom className="message-container">
                        <div data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }}>
                          <ul class="list-unstyled mb-0">
                            {console.log(users, "koko")}
                            {users.length > 0 && users.map((user) => (
                              <li class="p-2 border-bottom" onClick={() => getMessagesofUser(user.owner._id)}>
                                <a class="d-flex justify-content-between">
                                  <div class="d-flex flex-row">
                                    <div>
                                      <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="avatar" class="d-flex align-self-center me-3" width="60" />
                                      <span class="badge bg-success badge-dot"></span>
                                    </div>
                                    <div class="pt-1">
                                      <p class="fw-bold mb-0">{user.owner?.name}</p>
                                      <p class="small text-muted">{users[users.length - 1].messages[users[users.length - 1].messages.length - 1]?.message}</p>
                                    </div>
                                  </div>
                                  <div class="pt-1">
                                    <p class="small text-muted mb-1"><Moment fromNow>{user?.updatedAt}</Moment></p>
                                    <span class="badge bg-danger rounded-pill float-end">3</span>
                                  </div>
                                </a>
                              </li>
                            ))}

                            <li class="p-2 border-bottom">
                              <a  class="d-flex justify-content-between">
                                <div class="d-flex flex-row">
                                  <div>
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                      alt="avatar" class="d-flex align-self-center me-3" width="60" />
                                    <span class="badge bg-warning badge-dot"></span>
                                  </div>
                                  <div class="pt-1">
                                    <p class="fw-bold mb-0">Alexa Chung</p>
                                    <p class="small text-muted">Lorem ipsum dolor sit.</p>
                                  </div>
                                </div>
                                <div class="pt-1">
                                  <p class="small text-muted mb-1">5 mins ago</p>
                                  <span class="badge bg-danger rounded-pill float-end">2</span>
                                </div>
                              </a>
                            </li>
                            <li class="p-2 border-bottom">
                              <a  class="d-flex justify-content-between">
                                <div class="d-flex flex-row">
                                  <div>
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                      alt="avatar" class="d-flex align-self-center me-3" width="60" />
                                    <span class="badge bg-success badge-dot"></span>
                                  </div>
                                  <div class="pt-1">
                                    <p class="fw-bold mb-0">Danny McChain</p>
                                    <p class="small text-muted">Lorem ipsum dolor sit.</p>
                                  </div>
                                </div>
                                <div class="pt-1">
                                  <p class="small text-muted mb-1">Yesterday</p>
                                </div>
                              </a>
                            </li>
                            <li class="p-2 border-bottom">
                              <a  class="d-flex justify-content-between">
                                <div class="d-flex flex-row">
                                  <div>
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                      alt="avatar" class="d-flex align-self-center me-3" width="60" />
                                    <span class="badge bg-danger badge-dot"></span>
                                  </div>
                                  <div class="pt-1">
                                    <p class="fw-bold mb-0">Ashley Olsen</p>
                                    <p class="small text-muted">Lorem ipsum dolor sit.</p>
                                  </div>
                                </div>
                                <div class="pt-1">
                                  <p class="small text-muted mb-1">Yesterday</p>
                                </div>
                              </a>
                            </li>
                            <li class="p-2 border-bottom">
                              <a  class="d-flex justify-content-between">
                                <div class="d-flex flex-row">
                                  <div>
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                      alt="avatar" class="d-flex align-self-center me-3" width="60" />
                                    <span class="badge bg-warning badge-dot"></span>
                                  </div>
                                  <div class="pt-1">
                                    <p class="fw-bold mb-0">Kate Moss</p>
                                    <p class="small text-muted">Lorem ipsum dolor sit.</p>
                                  </div>
                                </div>
                                <div class="pt-1">
                                  <p class="small text-muted mb-1">Yesterday</p>
                                </div>
                              </a>
                            </li>
                            <li class="p-2">
                              <a  class="d-flex justify-content-between">
                                <div class="d-flex flex-row">
                                  <div>
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                      alt="avatar" class="d-flex align-self-center me-3" width="60" />
                                    <span class="badge bg-success badge-dot"></span>
                                  </div>
                                  <div class="pt-1">
                                    <p class="fw-bold mb-0">Ben Smith</p>
                                    <p class="small text-muted">Lorem ipsum dolor sit.</p>
                                  </div>
                                </div>
                                <div class="pt-1">
                                  <p class="small text-muted mb-1">Yesterday</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </ScrollToBottom>

                    </div>

                  </div>
                  
                  <div class="col-md-6 col-lg-7 col-xl-8">
                  
                    <ScrollToBottom className="message-container">
                   
                      <div class="pt-3 pe-3" data-mdb-perfect-scrollbar="true"
                        style={{ position: 'relative', height: '400px' }}>

                        {messageList.length > 0 && messageList
                          .sort((a, b) => a.time - b.time)
                          .map((messageContent) => (
                            messageContent.author === username ? (
                              <div class="d-flex flex-row justify-content-end">
                                <div>
                                  <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{messageContent?.message}</p>
                                  <p class="small me-3 mb-3 rounded-3 text-muted" style={{ float: 'end' }}>{messageContent?.time} | {messageContent?.date}</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                  alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                              </div>
                            ) : (
                              // Otherwise, display on the left
                              <div class="d-flex flex-row justify-content-start">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                  alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                <div>
                                  <p class="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>{messageContent?.message}</p>
                                  <p class="small ms-3 mb-3 rounded-3 text-muted" style={{ float: 'end' }}>{messageContent?.time} | {messageContent?.date}</p>
                                </div>
                              </div>
                            )
                          ))}

                    

                       

                      </div>

                    </ScrollToBottom>
                    {console.log(user,"before check")}
              {user !=="sample id" &&
                    <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 3" style={{ width: '4px', height: '100%' }} />
                      <input type="text" value={currentMessage} onChange={(event) => {
                        setCurrentMessage(event.target.value);
                      }} class="form-control form-control-lg" id="exampleFormControlInput2" onKeyPress={(event) => {
                        event.key === "Enter" &&  sendMessage();
                      }}
                        placeholder="Type message" />
                      <a class="ms-1 text-muted" ><i class="fas fa-paperclip"></i></a>
                      <a class="ms-3 text-muted" ><i class="fas fa-smile" onClick={handleEmojiClick}></i></a>
                      {showEmojiPicker && (
        <div style={popupStyle}>
        <EmojiPicker onEmojiClick={handleEmojiClose} />
      </div>
      )}
                     {currentMessage && <a class="ms-3" ><i class="fas fa-paper-plane" onClick={sendMessage}></i></a>}
                    </div>
}

                  </div>
                  

                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

  );
}

export default ChatsComponent;