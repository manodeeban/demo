import React,{ useState } from "react";
import "./Dropdown.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";


function Dropdown(){
    const[isActive, setIsActive] = useState(false);
    return(
        <div className="dropdown">
           <div className="dropdown-btn" onClick={(e)=> setIsActive(!isActive)}><MoreVertIcon /></div>
            {isActive && (
            <div className="dropdown-content">
                <div className="dropdown-item"> Settings</div>
                <div className="dropdown-item">Logout</div>
            </div>
            )}
        </div>

    );
}

export default Dropdown;