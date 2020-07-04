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
    
    if(localStorage.getItem("username")){
        
            
        return (
                <div>
                
                   <Header title="HOME"/> 
                  
                   {currentLocation == "/home" ? aboutUs : null }
                   <funs.FamousStories title="Story"/> 
                   <funs.FamousStories title="Poem"/> 
                   <funs.FamousStories title="Article"/> 
                </div>
        ); 
       
    
    }
    return <Redirect to="/log0" />;
}

export default Home;