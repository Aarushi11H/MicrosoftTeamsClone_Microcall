import React from 'react';
import {GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "firebase/app";

import { auth } from '../firebase';
import firebase from 'firebase/app';


const Login = () => {
    return(
         <div id="login-page">
             <div className="nav-bar">
             <div className="logo-tab">
                    MicroCall
                </div>
                <div className="home-tab">
                <Link to={{ pathname: "https://microcall.herokuapp.com" }} target="_blank"  >
                    Home
                    </Link>
                </div>
             <div id="login-card">
                 <h2>Login</h2>

                 <div className="login-button google" 
                      onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
                     <GoogleOutlined /> Sign In with Google
                 </div>
                 <br />
                 <br />
                 <div className="login-button facebook"
                      onClick={() => auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())}>
                 <FacebookOutlined /> Sign In with Facebook
                 </div>
             </div>
             </div>
         </div>
    );
}

export default Login;
