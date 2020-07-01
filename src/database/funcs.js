import React, {useState, useContext } from "react";
import { AuthContext } from "../Auth";
import db from "./db";



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

export const Username = function(){
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
    db.firestore()
    .collection('users')
    .doc(localStorage.getItem('username'))
    .get()
    .then(doc => {
    setData(doc.data());
    }).catch(error =>
        alert(error));
    return udata;
}

