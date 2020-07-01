import React,{useCallback} from 'react';
import {withRouter} from "react-router";
import db from "../database/db";


function Signup({history}) {

    const handleSignup = useCallback(
        async event =>{
            event.preventDefault();
            const {email, password} =event.target.elements;
            try{
                await db
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
                history.push("/");
            }catch (error){
                alert(error);
            }
            },[history]  
    );


    return (<div className="login-bg">
        <div className="login-bar">

            <div className="col-md-6" style={{ paddingLeft: "4%" }}> 
            <img className="signuplogo" src={process.env.PUBLIC_URL + '/myimage.png'}/>
            <form onSubmit={handleSignup}>
            <div className="form-group" style={{ width: "80%", marginTop: "40%" }} >
                <input type="text" className="form-control" id="email" placeholder="Enter Your Email" />
            </div>
                <div className="form-group" style={{ width: "80%" }}>
                    <input type="password" className="form-control" id="password" placeholder="Enter Your Password" />
                </div><div className="form-group submit" style={{ width: "80%" }}>
                    <input type="submit" className="myshadow mybtn btn btn-default" id="signin" value="Signup" />
                </div></form></div>
            <div className="col-md-6 social-login" > 
            <div className="sl-top">
                
            </div>
            <div className="sl-bottom float-bottom">
            <button type="submit" className="mybtn sl btn btn-lg btn-default myshadow" id="google"><i class="fa fa-google" style={{fontSize:"18px",color:"red"}}></i> Signup with Google</button>
            <button type="submit" className="mybtn sl btn btn-lg myshadow" style={{backgroundColor: "#4267B2",color: "white"}} id="facebook"><i class="fa fa-facebook" style={{fontSize:"18px",color:"white"}}></i> Signup with Facebook</button>
            <hr className="hr"/><p className="f">Do you already have an account?</p>
            <button type="submit" className="mybtn sl btn btn-lg btn-default myshadow"  onClick={()=> history.push('/login')}>Login instead</button>
            </div>
            </div>
        </div>
    </div>);
}

export default Signup;