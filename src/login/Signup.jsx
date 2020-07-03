import React,{useCallback, useState, useContext} from 'react';
import {withRouter, Redirect, useHistory} from "react-router";
import db from "../database/db";
import { UserUid } from '../database/funcs';
import { AuthContext } from '../Auth';
import Pref0 from './Pref0';
import Header from '../components/Header';


function Signup(props) {
    
    const [newuser,setUser] = useState({
        fname: "",
        lname: "",
        gender: "",
        title: "Creator (Default)",
        email: "",
        testpass: "",
        password: "",
        uid: "",
        bio: "I am a Creator (Default)",
    });
    const [stage,setStage] = useState(0);
    const [pcheck,setPcheck] = useState(0);
    const history = useHistory();
 

    function handleChange(event){  
        const {name,value} = event.target;

        setUser(prevValue =>{
            return {
                ...prevValue,
                [name] : value
            };
        });
    }

    const handleNext = function(event){
        event.preventDefault();
        setStage(stage+1);
    }


    const createUser = async function(){
        try{
            await db
            .auth()
            .createUserWithEmailAndPassword(newuser.email, newuser.password);
        }catch (error){
            alert(error);
        }   
    }

   


    const handleNext2 = function(event){
        setPcheck(0);
        event.preventDefault();
        if(newuser.testpass===newuser.password){
            if(newuser.password.length>=8){
                createUser();
                setStage(4);
            }else{
                setPcheck(2);
            }
            
        }else{
            setPcheck(1);
        }
    }




    


    // const handleSignup = useCallback(


    //     async event =>{
    //         event.preventDefault();
    //         const {email, password} =event.target.elements;
    //         try{
    //             await db
    //             .auth()
    //             .createUserWithEmailAndPassword(email.value, password.value);
    //             history.push("/");
    //         }catch (error){
    //             alert(error);
    //         }
    //         },[history]  
    // );

    var signapp;

    if(stage===0){
        signapp =  (
            <form onSubmit={handleNext}>
                <div className="form-group" style={{ width: "80%", marginTop: "40%" }} >
                    <label for="fname">First Name</label>
                    <input type="text" className="form-control" name="fname" id="fname" onChange={handleChange} placeholder="Enter Your First Name"  value={newuser.fname} required/>
                </div>
                <div className="form-group" style={{ width: "80%" }}>
                    <label for="lname">Last Name</label>
                    <input type="text" className="form-control" name="lname" id="lname" onChange={handleChange} placeholder="Enter Your Last Name"  value={newuser.lname} required/>
                </div>
                <div className="form-group" style={{ width: "80%" }}>
                    <label for="email">Your Email</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={handleChange} placeholder="Enter Your Email ID"  value={newuser.email} required/>
                </div>
                <div class="form-group">
                    <label for="gender">Choose You Gender</label>
                    <select className="form-control" name="gender" id="gender" onChange={handleChange}  value={newuser.gender}>
                        <option>Prefer not to say</option>
                        <option>male</option>
                        <option>female</option>
                    </select>
                </div>
                <div className="form-group submit" style={{ width: "80%" }}>
                    <input type="submit" className="myshadow mybtn btn btn-default" id="signin" value="Next" />
                </div></form>);
    }



    else if(stage===1)
    {
        signapp = (
            <form onSubmit={handleNext2}>
                <div className="form-group" style={{ width: "80%", marginTop: "40%" }}>
                    <label for="testpass">Create a password</label>
                    <input type="password" className="form-control" name="testpass" id="testpass" onChange={handleChange} placeholder="Enter a password"  value={newuser.testpass} required/>
                </div>
                <div className="form-group" style={{ width: "80%" }}>
                    <label for="password">Verify your password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={handleChange} placeholder="Re-enter the password"  value={newuser.password} required/>
                </div>
                {(pcheck===1)?<p className="font0" style={{color: "red"}}>Passwords don't match</p>: null}
                {(pcheck===2)?<p className="font0" style={{color: "red"}}>Passwords should be atleast 8 characters long</p>: null}
                <div className="form-group submit" style={{ width: "80%" }}>
                    <input type="submit" className="myshadow mybtn btn btn-default" id="signin" value="Next" />
                </div>
            </form>
        );
    }

   













    
    if(stage===4){
        return <Pref0 newuser={newuser} />
    }else{
    return <div>
    <Header title="SIGNUP"/> 
    <div className="login-bg">
    <div className="login-bar">
        <div className="col-md-6" style={{ paddingLeft: "4%" }}> 
        <img className="signuplogo" src={process.env.PUBLIC_URL + '/myimage.png'}/>
        {signapp}
        </div>
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
    </div>
        </div>;
    
}
}

export default Signup;