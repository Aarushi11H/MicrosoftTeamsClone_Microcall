import React, {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { Avatar, ChatEngine } from 'react-chat-engine';
import {auth} from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {

    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    
     const handleLogout = async () => {
         await auth.signOut();
         history.push('/');
     }

     const getFile = async (url) => {
         const response = await fetch(url);
         const data = await response.blob();

         return new File([data], "userPhoto.jpg", {type : 'image/jpeg'})
     }

     useEffect( () => {
         if(!user){
             history.push('/');

             return;
         }

         axios.get('https://api.chatengine.io/users/me', {
             headers: {
                 "project-id" : "9de4b149-6f17-426a-be85-ba9dd645901d",
                 "user-name" : user.email,
                 "user-secret" : user.uid,
             }
         })
         .then(() => {
             setLoading(false);
         })
         .catch(() => {
             let formdata = new FormData();
             formdata.append('email', user.email);
             formdata.append('username',user.email);
             formdata.append('secret', user.uid);

             getFile(user.photoURL)
              .then((avatar) => {
                  formdata.append('avatar', avatar,avatar.name);

                  axios.post('https://api.chatengine.io/users/',
                  formdata,
                  { headers: {"private-key": "d37c3c6b-de05-47ae-8dc5-22f2086f0c4c" }}
                  )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error) )
              })
         })
     }, [user,history]);

if(!user || loading)  return 'Loading...'
    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    MicroCall
                </div>
                <div onClick={handleLogout} className="newcall-tab">
                    Logout
                </div>
                <div className="newcall-tab">
                <Link to={{ pathname: "https://microcall.herokuapp.com/newcall" }} target="_blank" className="newcall-tab" >
                    New Call
                    </Link>
                </div>
            </div>
            
            <ChatEngine
                height="calc( 100vh - 66px )"
                projectID="9de4b149-6f17-426a-be85-ba9dd645901d" 
                userName={user.email}
                userSecret={user.uid}
             />


        </div>
    );
}

export default Chats;
