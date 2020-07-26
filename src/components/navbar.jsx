import React, { useState } from 'react';
import db from '../database/db' ;
import { Redirect, useHistory } from "react-router";
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditSettings from "../Write/Profile/EditSettings";

function Navbar(props)
{

    const [open,setOpen] = useState(false);
    var currentLocation = window.location.pathname;
    var history = useHistory() ; 

    function handleClose(){
        setOpen(false);
      
    }

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
                            state:{id: localStorage.getItem('username') ,  key:localStorage.getItem('username')}, 
                           
                        })
                    }}>Profile</a></li>
                    <li><a onClick={()=> {setOpen(true)}}>Settings</a></li>
                    <li><a href="/Report">Report</a></li>
                    <li><a href = "/" type= "button" onClick={()=> {localStorage.clear();db.auth().signOut()}}>Logout</a></li>
                </ul>
          </li>
       </ul>
   </div>
   <Dialog fullScreen open={open}   scroll={"body"}>
         <div className="myshadow2" style={{height:"150px",color:"white",backgroundColor:"#f5ba13"}} >
          <Toolbar>
           
            <Typography variant="h4" style={{ flex: 1}}>
              SETTINGS
            </Typography>
            <Button size="large" style={{fontFamily:"'Josefin Sans', sans-serif", fontSize:"20px"}} autoFocus color="inherit" onClick={handleClose}>
              CLOSE
            </Button>
          </Toolbar>
        </div>
       
        
        <EditSettings />
        </Dialog>
   </div>
   </nav>) ; 
}
export default Navbar ; 
