import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
//import  InsertEmoticonIcon  from "@material-ui/icons/InsertEmoticon";
import SendIcon from '@material-ui/icons/Send';
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chats.css";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import "./Emojis.css";
import Emojis from "./Emojis";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName]= useState("");
    const [messages, setMessage] = useState([]);
    const [{ user }]= useStateValue();
   

    useEffect(() => {
      if(roomId) {
         db.collection("rooms").doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)
         ));

         db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot) => setMessage(snapshot.docs.map((doc) => doc.data()))
         );
      }
    }, [roomId])
    
    useEffect(() => {
     setSeed(Math.floor(Math.random() * 5000));   
    }, [roomId]);
   
    const sendMessage =(e) => {
      e.preventDefault();
      console.log("you types >>>>",input);

      db.collection("rooms").doc(roomId).collection("messages").add({
         message: input,
         name: user.displayName,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setInput("");
    };

    return (
    <div className ="chat">
          <div className ="chat_header">
              <Avatar  src={`http://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
           
              <div id="chat_headerInfo">
                <h3>{roomName}</h3>
                <p>
                    Last seen{""}
                   {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                   }
                   
                   </p>
              </div>
              
              <div id="chat_headerRight">
                 <IconButton>
                   <SearchOutlined />
                </IconButton>
                <IconButton>
                   <AttachFile />
                </IconButton>
                <IconButton>
                   <MoreVert />
                </IconButton>
             </div>                  
          </div>
         <div id="chat_body">
            {messages.map((message) =>(
                <p className={`chat_message
                ${message.name === user.displayName && "chat_reciever"}`}>
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                   {new Date(message.timestamp?.toDate()).toUTCString()
                   }
                 </span>
                </p>

            ))}

           
         </div>

         <div className="chat_footer">
            <IconButton >
               <Emojis />
            </IconButton>
            
               
            <form>
               <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
               <button onClick={sendMessage}
               type="submit">
               send a message
               </button>
            </form>
            <IconButton>
            <SendIcon  onClick={sendMessage}
               type="submit"/>
            </IconButton>
            
         </div>

   </div>
    );
}

export default Chat;

