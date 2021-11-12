import React from 'react';
import { Button } from '@material-ui/core';
import "./Login.css";
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import Background from './Background';



function Login() {
    const [{},dispatch] = useStateValue();


    const signIn =() =>{
        auth.signInWithPopup(provider).then(result => {
            dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        });
        }).catch(error => alert(error.message));
    };

   
    return (
        <div className="login">
          
           <Background />
          <div id="login_container">
              <img src="https://user-images.githubusercontent.com/85731867/121888465-a7605080-cd35-11eb-8b24-4fc657235304.png"
              alt=""
              />
              <div classname="login_text">
                  <h1>Sign in to Mechat</h1>
              </div>
              <Button onClick={signIn}>
                 Sign In With Google
               </Button>

          </div>
         
        </div>
    );
}

export default Login;
