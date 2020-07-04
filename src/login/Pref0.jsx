import React, { useContext, useState } from "react";
import db from "../database/db";
import { AuthContext } from "../Auth";
import { Redirect, useHistory } from "react-router";
import { UserUid, Username } from '../database/funcs';
import Pref1 from "./Pref1";
import Signup from "./Signup";
import Header from "../components/Header";
import Loading from "../components/Loading";

function Pref0(props){
    const {currentUser} =useContext(AuthContext);
    const [twait,setTWait] = useState(0);
    const [p,setP] = useState(0);
    const history = useHistory();
    const [newuser,setUser] = useState({
        bio: "I am a Creator (Default)",
        title: "Creator (Default)"
    })


    const AddUser = function(){
        
        const custom_id = props.newuser.email.split("@")[0];
        
        db.firestore().collection("users").doc(custom_id).set({
            bio: props.newuser.bio,
            email: props.newuser.email,
            fname: props.newuser.fname,
            gender: props.newuser.gender,
            lname: props.newuser.lname,
            title: props.newuser.title,
            uid: currentUser.uid
        })
    }

    const AddUser2 = function(){
        
        const uname = props.newuser.email.split("@")[0];
        
        db.firestore().collection("myauth").doc(currentUser.uid).set({
            username: uname
        })
    }

    const CreateFollows = function(){
        const custom_id = props.newuser.email.split("@")[0];
        db.firestore().collection("follows").doc(custom_id).set({
            follows: []
        })
    }

    const CreateFollowers = function(){
        const custom_id = props.newuser.email.split("@")[0];
        db.firestore().collection("followers").doc(custom_id).set({
            followers: []
        })
    }

    function handleChange(event){  
        const {name,value} = event.target;

        setUser(prevValue =>{
            return {
                ...prevValue,
                [name] : value
            };
        });
    }

    const handleNext=function(event){
        event.preventDefault();
        const {bio, title} =event.target.elements;
        const custom_id = props.newuser.email.split("@")[0];
        db.firestore().collection("users").doc(custom_id).update({
            bio: newuser.bio,
            title: newuser.title
        });
        history.push("/");
        
    }

    if(currentUser){

        AddUser();
        AddUser2();    
        CreateFollows();
        CreateFollowers();
        const name = props.newuser.email.split("@")[0];
        const uid=currentUser.uid;
        localStorage.setItem("username", name);
        localStorage.setItem("uid", uid );

        setTimeout(function(){ setTWait(2); }, 3000);

        if(twait === 0){
            return <Loading message={"Setting up your Account, do not close this tab."} />;
        }else{
            return (<div>
                <Header title="SIGNUP"/> 
                <div className="login-bg">
            <div className="login-bar">
            
                <form onSubmit={handleNext}>
                <img className="signuplogo2" src={process.env.PUBLIC_URL + '/myimage.png'}/>
                        <div className="form-group" style={{ width: "80%", margin: "20px" }}>
                            <label for="bio">Say something about yourself</label>
                            <input type="text" className="form-control" name="bio" id="bio" onChange={handleChange} placeholder="Your Bio (Optional)"  value={newuser.bio}/>
                        </div>
                        <div className="form-group" style={{ width: "80%" , margin: "20px"}}>
                            
                        <label for="title">Which role describles you the most?</label>
                                   <select className="form-control" name="title" id="title" onChange={handleChange}  value={newuser.title} >
                                        <option>Creator (Default)</option>
                                        <option>Writer</option>
                                        <option>Poet</option>
                                        <option>Speaker</option>
                                        <option>Singer</option>
                                        <option>Content Creator</option>
                                        <option>Film Maker</option>
                                   </select>
                        </div>
                        <div className="form-group submit" style={{ width: "80%" , margin: "20px"}}>
                            <input type="submit" className="myshadow mybtn btn btn-default" id="signin" value="Save" />
                        </div>
                    </form>
                    </div>
                    </div>
                    </div>);
        }
    
    }else{
        return <Pref1 newuser={props.newuser} />;
    }


}

export default Pref0;