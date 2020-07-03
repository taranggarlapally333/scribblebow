import React, {useState, useContext } from "react";
import { AuthContext } from "../Auth";
import db from "./db";
import {futureObject} from "react-futures";



const User = function(){
    const {currentUser} =useContext(AuthContext);
    return currentUser;
}


export const UserEmail = function(){
    return User().email;
}

export const UserUid = function(){
    return User().uid;
}

export const Username =  function() {
    const [uname,setUname] = useState("");
     db.firestore()
    .collection('myauth')
    .doc(UserUid())
    .get()
    .then(doc => {
    setUname(doc.data().username);
    }).catch(error =>
        alert(error));
    return uname;
}


export const Userdata= function(){
   const [udata,setData] = useState({});
    const snapshot = db.firestore()
        .collection('users')
        .where("uid","==",UserUid())
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
                 setData(doc.data());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        return udata;
        
    
}

