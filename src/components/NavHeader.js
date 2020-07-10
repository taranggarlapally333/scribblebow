import React, { useState } from 'react' ; 
import Navbar from './navbar' ; 
import {UserEmail, UserUid, Username, Userdata} from "../database/funcs";
import db from '../database/db';
import { useHistory } from 'react-router';


function Header(props)
{
   
    const history =useHistory();
    return (
        <div className="nocopy">
            <div className= "header row myheader">
            {props.logged===0?<img className="header-logo" onClick = {()=>history.push("/")} src={process.env.PUBLIC_URL + '/myimage.png'} />:<h1>{props.title}</h1>}
                
                {props.logged===0?<a className="lgsg" href="/Log0">LOGIN/SIGNUP</a>:null}
                
              
            </div>
            {props.logged===0?null:<Navbar  Username = {localStorage.getItem("username")}/>}
           
            
        </div>
    
        
    ); 
}
export default Header ; 