import React from 'react' ; 
import Navbar from './navbar' ; 
import {UserEmail, UserUid, Username, Userdata} from "../database/funcs";
import UserDetails from '../login/UserAtts'; 
function Header(props)
{
    
    return (
        <div>
            <header className= "row myheader">
                <h1>{props.title}</h1>
            </header>
            <Navbar  Username = {UserDetails.Username}/>
        </div>
    ); 
}
export default Header ; 