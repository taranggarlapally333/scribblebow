import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router";
import db from "../database/db";

export default function Unverif(){
    if(localStorage.getItem("emailverif")=="true"){
        return <Redirect to="/"/>
    }else{
        db.auth().signOut().then(function() {
           localStorage.clear();
          }).catch(function(error) {
            // An error happened.
          });
    }

    return (<div>
    <Header title="Verify your Account"/> 
    <div className="login-bg">
<div className="login-bar">
<img className="signuplogo2" src={process.env.PUBLIC_URL + '/myimage.png'}/>

    <p style={{margin: "40px"}}>Please verify your account to continue to ScribbleBow.<br /></p>
        </div>
        </div>
        </div>);
}