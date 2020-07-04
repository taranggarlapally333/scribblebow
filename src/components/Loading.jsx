import React from "react";
import Header from "./Header";

function Loading(props){
    return <div>
    <Header title="Please Wait..."/>
    <div className="login-bg">
    <div className="login-bar2">
    <div className="col-md-6">
    <img  className= "loading" src={process.env.PUBLIC_URL + '/loading-nobg.gif'}/>
    </div>
    <div className="col-md-6">
    <img className="signuplogo2" src={process.env.PUBLIC_URL + '/myimage.png'}/>
    <p className="loading-text font0" id="loading-text">{props.message}</p>
    </div> 
    </div>
    </div>
    </div>
}

export default Loading;