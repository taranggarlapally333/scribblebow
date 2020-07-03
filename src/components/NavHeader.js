import React from 'react' ; 
import Navbar from './navbar' ; 
import {UserEmail, UserUid, Username, Userdata} from "../database/funcs";
function Header(props)
{
    return (
        <div>
            <header className= "row myheader">
                <h1>{props.title}</h1>
            </header>
            <Navbar  Username = "Your Username" />
        </div>
       
        
    ); 
}
export default Header ; 