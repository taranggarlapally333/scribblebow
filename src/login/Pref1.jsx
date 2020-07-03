import React, { useContext } from "react";
import db from "../database/db";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";
import { UserUid } from '../database/funcs';
import Pref0 from "./Pref0";
import Header from "../components/Header";

function Pref1(props){
    const {currentUser} =useContext(AuthContext);




    if(currentUser){
       return <Pref0 newuser={props.newuser} />;
    }
    return (<div>
        <Header title="SIGNUP"/> 
        <div className="login-bg">
    <div className="login-bar2">
    <div className="col-md-6">
    <img  className= "loading" src={process.env.PUBLIC_URL + '/loading-nobg.gif'}/>
    </div>
    <div className="col-md-6">
    <img className="signuplogo2" src={process.env.PUBLIC_URL + '/myimage.png'}/>
    <p className="loading-text font0">Setting up your Account, do not close this tab.</p>
    </div> 
    </div>
    </div>
    </div>);

}

export default Pref1;