import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import ChatsComponent from "../ChatsComponent/Chats";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const socket = io.connect("http://localhost:5000");



function Chat() {
    const location=useLocation();
    let name = useSelector((state) => state.Owner.name);
    const [OwnerId, setOwnerId] = useState(null);
    // console.log(location.state.ownerId)
    // setOwnerId('6420e623073459e3b4ae27ac')
  
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

  
    const joinRoom = () => {
        setUsername(name);
        setRoom(1234);
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };
  
    useEffect(() => {
      joinRoom()
    }, [])
    
  
    return (
      <div className="App">
        {!showChat ? (
             joinRoom()
        ) : (
          <ChatsComponent socket={socket} username={username} room={room} />
        )}
      </div>
    );
  }

export default Chat;