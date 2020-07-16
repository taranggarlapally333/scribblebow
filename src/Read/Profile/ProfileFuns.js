import React, { useState } from 'react' ; 
import {CoverPage} from '../Story/Details' ;
import * as Atts from '../../Write/Story/Atts'; 
import * as Canvas from 'react-canvas-js' ; 
// Charts 
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import CategoryAll from './ProfileClasses';
import { UploadImage } from '../../Storage/UploadFile';
import db from '../../database/db';
import * as firebase from 'firebase';
import { Caption } from '../../components/Loading';
//end Charts 
export const UserDetails  = function (props)
{   
    
    var allprops = {
        ...props.Details 
    }; 

    var currentUser = localStorage.getItem('username') ; 
    const [image , setImage] = useState(null) ; 
    var [UploadImageButton ,setUploadImageButton ] = useState("none"); 
    const [FollowButton , setFollowButton] = useState(props.IsUserFollowed); 
    const [followCount , setFollowCount] = useState({
      "follows": props.follows.length,
      "followers": props.followers.length
    }); 
    //Here Comes the Follow Message Buttons 
    const FollowMessage = <div><button className={!FollowButton?"btn btn-primary":"btn btn-default"} style={{width:"45%" , margin:"10px",outline:"none"  }} onClick={handleFollowButton}>{FollowButton?"UnFollow":"Follow"}</button>
    <button className= "btn btn-default" style={{width:"45%",  margin:"10px" , marginRight:"0px"}}>Message</button></div> ;
    
    //Here Comes the Edit Profile Button
    const EditProfile =  <button className= "btn btn-default" style={{ margin:"10px", position:"end"}}>Edit Profile</button>; 
    function handleUploadImageButton()
    {
      //upload the Image using the Upload file Fuction in storage 
      UploadImage("ProfileImages/" , image , allprops.id) ; 
      setUploadImageButton("none");
    }
    function handleFollowButton()
    {
      
      if(FollowButton)
      {
        //reove the user 
              db.firestore().collection("follows").doc(localStorage.getItem('username')).update({
                follows: firebase.firestore.FieldValue.arrayRemove(allprops.id)
            });
            db.firestore().collection("followers").doc(allprops.id).update({
              followers: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('username'))
          });
      }
      else 
      {
        //add 
                db.firestore().collection("follows").doc(localStorage.getItem('username')).update({
                  follows: firebase.firestore.FieldValue.arrayUnion(allprops.id)
              });
              db.firestore().collection("followers").doc(allprops.id).update({
                followers: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('username'))
            });
        
      }
      setFollowButton(!FollowButton) ; 
    }
    function handleImageChange(event)
    {
        let ImageFile =event.target.files[0] ;  
        if(event.target.files[0])
        {
            
            console.log(ImageFile.size[0]) ; 
            setImage(ImageFile) ;
            const reader = new FileReader() ; 
            reader.addEventListener("load" , function(){
                var CoverPageElement = document.getElementById("previewImage") ; 
               
                CoverPageElement.setAttribute("src" , this.result) ; 
            }); 
            reader.readAsDataURL(ImageFile) ; 
            setUploadImageButton(""); 
         
        }
        
    }
    function  handleAnalytics(event)
    {
        console.log(event.target.name); 
    }

 
    var ProfileImage =  <div className= "col-md-3">
    <div className = "myshadow" style = {{width:160,maxWidth:160,height:277, justifyContent:"center"}}>
    <img  
    
    id = "previewImage" src ={props.ProfileImageAddress} alt = "Cover " style = {{maxWidth:160,height:277, maxHeight:"277"}}></img>
    </div>
 </div>

    var ChangeableProfileImage  = <div>
    <input type="file" 
    name = "StoryCoverPage" 
    onChange={handleImageChange}
    id = "fileInput" style={{display:"none"}}></input>
    <div className= "col-md-3">
        <div className = "myshadow ProfileImage " style = {{width:160,maxWidth:160,height:277, justifyContent:"center" , marginBottom:"10px"}}
        onClick={()=>{
            document.getElementById("fileInput").click() ; 
        }} >
        <img  
        className="overlay"
        id = "previewImage" src ={props.ProfileImageAddress} alt = "Cover " style = {{maxWidth:160,height:277, maxHeight:"277"}}></img>
        </div>
        <div><button onClick={handleUploadImageButton} className="btn btn-info" style={{display:UploadImageButton}}>Upload</button></div>
    </div>
</div>;

    return(
        <div  >
            {currentUser == allprops.id ? ChangeableProfileImage : ProfileImage}
            <div className= "col-12 col-md-9 myshadow Details">
            <p style={{fontSize:"40px"}}>{allprops.fname+" "+allprops.lname}</p>
            <h3><span className="label label-default" style={{backgroundColor: Atts.getHashClassName(allprops.title.length)}}>{allprops.title}</span></h3>
            <hr></hr>
            <div className= "col-md-6" style={{ wordWrap:"pre-wrap"}} >
                <p>Bio: {allprops.bio}</p>
                <p>Gender: {allprops.gender ? allprops.gender: "No Gender Idiot" }</p>
                <p>Achievements: No Fcukin Achievements adsfadsfa sdfsadfa dsfdsafasdfasdfadsfas</p>
            </div>
            
            <div className="col-md-6" >

                <div  className="container-inner" style={{display:"flex",  backgroundColor:""  , width:"350px" , justifyContent:"space-evenly"}}>
                    <a style={{textDecoration:"none" , textAlign:"center", margin:"10px"}}>
                      <h4>Follows</h4><div style={{fontSize:"35px"}}><Caption caption={followCount.follows} /></div>
                    </a>
                    <a style={{textDecoration:"none" , textAlign:"center", margin:"10px"}}>
                      <h4>Followers</h4><div style={{fontSize:"35px"}}><Caption caption={followCount.followers} /></div>
                    </a>
                </div>
                <div className = "" style={{backgroundColor:""  ,  justifyContent:"flex-end" ,  display:"flexbox" , paddingRight:0}}>
                  {currentUser == allprops.id ?null:FollowMessage}
                </div>

            </div>
           
            <div className="container-inner" style={{ display:"flex",justifyContent:"flex-end", padding:"10px"}}>
            { currentUser === allprops.id  ?<button className="btn btn-default" onClick={handleAnalytics}
            style={{ margin:"10px" }} name="Analytics Mode">Analytics Mode</button>:null}
            { currentUser === allprops.id  ?EditProfile:null}
            </div>
            </div>
        </div>
    ) ; 
}

export const UserWorks = function(props)
{
    
    const [title , setTitle] = useState("Story");
    function handleWork(event)
    {
        var title = event.target.name  ; 
        setTitle(title) ; 
    }
    function getcategoryButtons(eachButton , index)
    {
       var mystyle= {
        backgroundColor:Atts.categoryColors[eachButton] , 
        minWidth: eachButton==="Fanfiction" ? "80px" : "auto"
       } 
      
      return ( <button key={index} className = "btn " style={mystyle} name = {eachButton} onClick={handleWork}>{eachButton ==="Article"?"Blog/Article" :eachButton}</button>) ; 
    }
    return(
        <div>
            <div className = "container-inner buttonGroup" style={{display:"flex",justifyContent:"space-evenly" , color:"white" }} >
            {Atts.categoryAvailable.map(getcategoryButtons)}</div>
            <hr></hr>
            <CategoryAll category={title} key={title} UserId  = {props.UserId} />
        </div>
    ); 
}
export const Analytics = function()
{
    
    ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
    
    const chartConfigs = {
      type: 'column2d',
      width: 600,
      height: 400,
      dataFormat: 'json',
      dataSource:  {
        chart: {
          caption: "Countries With Most Oil Reserves [2017-18]",
          subcaption: "In MMbbl = One Million barrels",
          xaxisname: "Country",
          yaxisname: "Reserves (MMbbl)",
          numbersuffix: "K",
          theme: "fusion"
        },
        data: [
          {
            label: "Venezuela",
            value: "290"
          },
          {
            label: "Saudi",
            value: "260"
          },
          {
            label: "Canada",
            value: "180"
          },
          {
            label: "Iran",
            value: "140"
          },
          {
            label: "Russia",
            value: "115"
          },
          {
            label: "UAE",
            value: "100"
          },
          {
            label: "US",
            value: "30"
          },
          {
            label: "China",
            value: "30"
          }
        ]
      },
    };
    
        return <ReactFC {...chartConfigs} />
    
}



// mycode my UserWorks 
{/* <div className="container-inner" style={{height:"600px", borderColor:"black"}}>
<div className="row container" style={{display:"flex",justifyContent:"center",}}>
    <div className="myborder" style={{textAlign:"center",height:"300px" , minWidth:"320px", margin:"5px", float:"left"}}>{title}1</div>
    <div className="myborder" style={{textAlign:"center",height:"300px" , minWidth:"320px", margin:"5px", float:"left"}}>{title}1</div>
    <div className="myborder" style={{textAlign:"center",height:"300px" , minWidth:"320px", margin:"5px", float:"left"}}>{title}1</div>

</div>
<div className="row container" style={{display:"flex",justifyContent:"center"}}>
    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>

</div>

</div> */}