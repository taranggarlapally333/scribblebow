import React, { useState } from 'react';
import db from '../database/db' ;
import { Redirect, useHistory } from "react-router";
function Navbar(props)
{

    var currentLocation = window.location.pathname;
    var history = useHistory() ; 
    var forhome = <ul className="nav navbar-nav ">
    <li><a className="nav-btn" href= "/Create">CREATE</a></li>
    <li><a className="nav-btn" href = "/discover">DISCOVER</a></li>
    {/* {ckd===0?<li><a className="nav-btn"  onClick={searchClicked} > <i className="fa fa-search"></i></a></li>:null}
    {ckd===0?null:<li><div className="search-bar"  style={{marginTop:"10px"}}>
                <i className="fa fa-search"></i>
                <input type="text" className="search-input" placeholder="Search" />
            </div></li>} */}
        
</ul> ; 

    

    return (<nav className="navbar mynav fixed-top navbar-expand-md" id="navbar" style={{}}>

    <div className="container-fluid ">

       <a className="navbar-brand nav-btn" href ="/home" >HOME</a>
      
                
               

    <button className="navbar-toggle navbar-toggle-right" type="button" data-toggle="collapse" data-target="#Cnav" aria-controls="Cnav" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fa fa-navicon" ></i>
       </button>
       
       <div className="collapse navbar-collapse" id="Cnav">
    
        {forhome}
      
     <ul className="nav navbar-nav navbar-right">
              <li><a className="nav-btn" href="/my-shelf">MY SHELF</a></li>
              <li><a className="nav-btn" href=""><i className="fa fa-bell" aria-hidden="true"></i></a></li>

            <li><a href="#" className="dropdown-toggle" type="button" data-toggle="dropdown"><span className="glyphicon glyphicon-user"></span><span className="caret"></span></a>
                  <ul className="dropdown-menu">
                  <li ><a style={{fontWeight:"bold"}}>{props.Username}</a></li>
                  <hr></hr>
                    <li><a onClick={()=>{
                        history.push({
                            pathname:'/Profile' , 
                            search:"?UserId="+localStorage.getItem('username'),
                            state:{id: localStorage.getItem('username')}, 
                        })
                    }}>Profile</a></li>
                    <li><a href="/">My list</a></li>
                    <li><a href="">Settings</a></li>
                    <li><a href="">Report</a></li>
                    <li><a href = "/" type= "button" onClick={()=> {localStorage.removeItem("username");db.auth().signOut()}}>Logout</a></li>
                </ul>
          </li>
       </ul>
   </div>
   </div>
   </nav>) ; 
}
export default Navbar ; 
