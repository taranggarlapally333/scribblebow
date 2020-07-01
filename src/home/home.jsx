import React, { useContext } from "react";
import db from "../database/db";
import {UserEmail, UserUid, Username, Userdata} from "../database/funcs";
import { Redirect } from "react-router";
import { AuthContext } from "../Auth";
import Gravatar from 'react-gravatar'

function Home(){
    const {currentUser} = useContext(AuthContext);

    if(currentUser){
        return <div>
        <p>{UserEmail()}</p>
        <p>{UserUid()}</p>
        <p>{Username()}</p>
        {/* <p>{Userdata().fname + " " + Userdata().lname }</p> */}
        <Gravatar email={UserEmail()} size={200}/><h2>Home Page</h2><button onClick={()=> db.auth().signOut()}>Logout</button></div>;
    
    }
    return <Redirect to="/login" />;
}

export default Home;