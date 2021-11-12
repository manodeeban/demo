import React,{ useState, useEffect} from "react";
import { Avatar, IconButton } from "@material-ui/core";
//import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import GroupAdd from "@material-ui/icons/GroupAdd";

import { SearchOutlined } from "@material-ui/icons";
import Sidebarchat from "./Sidebarchat";
import "./Sidebar.css";
//import { auth } from './firebase';
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import Dropdown from "./Dropdown";
import "./Dropdown.css";


function Sidebar() {
  const [rooms, setRooms]= useState([]);
  const[{ user }]= useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc =>
        ({
        id: doc.id,
        data: doc.data(),
      })
      ))
    )); 

    return () =>{
      unsubscribe();
    }

  }, [])

  const createChat = () => {
    const person = prompt("please enter name for chat room");   

    if (person) {
      db.collection("rooms").add({
        name: person,
      });
    }
    };

    

    return (
        <div className="Sidebar">
         <div className="Sidebar_header">
             <Avatar src={user?.photoURL} />   
             <div className="Sidebar_headerRight">
                
                 <IconButton onClick={createChat}
                 className="add new chat">
                   <GroupAdd />
                 </IconButton>
                 <IconButton >
                  <Dropdown />
                 </IconButton>
                  
             </div>
             </div>
         <div className="Sidebar_search">
            <div className="Sidebar_searchContainer">
            <SearchOutlined />
            <input placeholder="search or start a new chat" type="text" />
           </div>   
         </div>
         <div className="Sidebar_chats">
          <Sidebarchat addNewChat />
          {rooms.map(room => (
          <Sidebarchat  key={room.id} id={room.id} name={room.data.name} />
          ))}

          
         </div> 
        </div>
    );
    
    
    
}


export default Sidebar;
