import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chats from "./Chats";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import Login from "./Login";
import { useStateValue } from "./StateProvider";



function App() {
  const[{user}]= useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) :(
    <div className="app__body">

    <Router>
     <Sidebar />
       <Switch>

         <Route path="/rooms/:roomId">
           <Chats />
         </Route>
          <Route path ="/">
           <Chats />
          </Route>
       </Switch>
    </Router>
      </div>  
      )}
     
      
    </div>
    
  );
}

export default App;
