import React, { useContext } from "react";
import db from "../database/db";
import {UserEmail, UserUid, Username, Userdata} from "../database/funcs";
import { Redirect } from "react-router";
import { AuthContext } from "../Auth";
import Gravatar from 'react-gravatar'
import Header from '../components/NavHeader' ; 
import Navbar from '../components/navbar' ; 
import * as funs from "./homeFuns";

function Home(){
    const {currentUser} = useContext(AuthContext);
    var aboutUs = <funs.default/> ; 
    var currentLocation = window.location.pathname;
    var logged=0;
    if(localStorage.getItem("username")){
        logged=1;
    }
    return (
        <div>
        
           <Header title="HOME" logged={logged}/> 
          
           {currentLocation == "/home" ? aboutUs : null }
           <funs.FamousStories title="Story"/> 
           <funs.FamousStories title="Poem"/> 
           <funs.FamousStories title="Article"/> 
        </div>
); 
}

export default Home;