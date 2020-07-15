import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Username } from "../database/funcs";
import { AuthContext } from "../Auth";
import db from "../database/db";


export const Test = function(){
    
    var currentLocation = window.location.pathname;
    const [email,setEmail]=useState("")
    // // f12fd4d5-1e50-45a2-a021-abcbe8ce8af5

    //     Email.send({
    //         SecureToken: "f1acbb1a-831a-408e-ad8c-670914a2de7c",
    //         To : 'taranggarlapally@gmail.com',
    //         From : "theconscienceofficial@gmail.com",
    //         Subject : "This is the subject",
    //         Body : "And this is the body"
    //     }).then(
    //       message => alert(message)
    //     );
   
    function handleChange(event){
        const newemail = event.target.value;
        setEmail(newemail);
    }
    function checkEmail(event){
        event.preventDefault();
       
        console.log(email);
        
       
    }
    

    const ForgotPassword = function(Email){
        
            db.auth().sendPasswordResetEmail(Email)
              .then(function (user) {
                alert('Please check your email...')
              }).catch(function (e) {
                console.log(e)
              })
              return false;
          
    }
    
  

    return (
       
        <div className="login-bg">
    <div className="login-bar">
    <p>{currentLocation}</p>
    <a href="" onClick={()=>ForgotPassword("theconscienceofficial@gmail.com")}>Forgot Password</a>
    <p>{Date.now() + Math.random()}</p>
    <form onSubmit ={checkEmail}>
    <input type="text" className="form-control" name="email" onChange={handleChange} id="email" placeholder="email" value={email}/>    
    <input type="submit" name="submit" value="Check" />
    </form>
    
        <form >
        <img className="signuplogo2" src={process.env.PUBLIC_URL + '/myimage.png'}/>
                <div className="form-group" style={{ width: "80%", margin: "20px" }}>
                    <label for="bio">Say something about yourself {}</label>
                    <input type="text" className="form-control" name="bio" id="bio"  placeholder="Your Bio (Optional)"  />
                </div>
                <div className="form-group" style={{ width: "80%", margin: "20px"  }}>
                
                <label for="title">Which role describles you the most?</label>
                           <select className="form-control" name="title" id="title"   >
                                <option>Creator (Default)</option>
                                <option>Writer</option>
                                <option>Poet</option>
                                <option>Speaker</option>
                                <option>Singer</option>
                                <option>Content Creator</option>
                                <option>Film Maker</option>
                           </select>
                </div>
                <div className="form-group submit" style={{ width: "80%", margin: "20px"  }}>
                    <input type="submit" className="myshadow mybtn btn btn-default" id="signin" value="Save" />
                </div>
            </form>
            </div>
            </div>);
}



// book tab with wood
// <div>
//     <div className = "" style = {{ backgroundColor:"" , justifyContent:"center" , display:"flex"}}>
//     <img className="sm-cover myshadow scaling" style={{position:"relative"}} src = {props.imageAddress} alt = "Cover "></img>
//     </div>
//     <div className= "container-inner myshadow wood" style={{ backgroundColor:"",position: "relative" , padding:"10px", margin:"20px",marginTop: "-10px"}}>
//     <div align="center" className="myshadow wood" style={{width:"140px", height:"5px", backgroundColor:"white"}}></div>
//     <h5 align="center" style={{marginTop:"5px",color: "white"}}>{props.title}</h5>
// </div></div>
