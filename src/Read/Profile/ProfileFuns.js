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
    console.log(allprops.id)
    console.log(props.follows , "Follow Button")
    const [followCount , setFollowCount] = useState({
      "follows": allprops.nfollows,
      "followers": allprops.nfollowers
    }); 
    const [FinalUploadImage , setFinalUpload] = useState(null) ;  
    console.log(followCount)
    const [AnalyticsButton , setAnalytics] = useState(false) ; 
    //Here Comes the Follow Message Buttons 
    const FollowMessage = <div><button className={!FollowButton?"btn btn-primary":"btn btn-default"} style={{width:"45%" , margin:"10px",outline:"none"  }} onClick={handleFollowButton}>{FollowButton?"UnFollow":"Follow"}</button>
    <button className= "btn btn-default" style={{width:"45%",  margin:"10px" , marginRight:"0px"}}>Message</button></div> ;
    
    //Here Comes the Edit Profile Button
    const EditProfile =  <div><button className={ !AnalyticsButton?"btn btn-default": "btn btn-success" } style={{width:"45%" , margin:"10px",outline:"none" ,}}  onClick={handleAnalytics}>Analytics Mode</button>
    <button className= "btn btn-default" style={{width:"45%",  margin:"10px" , marginRight:"0px"}}>Edit Profile</button></div> ;
    function handleUploadImageButton()
    {
      //upload the Image using the Upload file Fuction in storage
      UploadImage("ProfileImages/" , image , allprops.id , "users") ;
      setFinalUpload(image) ;  
      setUploadImageButton("none");
    }
    function handleFollowButton()
    {
       
      let val  ; 
      if(FollowButton)
      {
        //reove the user 
              
            val = - 1 ; 
            db.firestore().collection("follows").doc(localStorage.getItem('username')).update({
                follows: firebase.firestore.FieldValue.arrayRemove(allprops.id)
            });
            db.firestore().collection("followers").doc(allprops.id).update({
              followers: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('username'))
          });

          // db.firestore().collection("users").doc(localStorage.getItem('username')).update(
          //   {
          //     "nfollows": localStorage.getItem("nfollows") + val 
          //   }
          // ); 
          // db.firestore().collection("users").doc(allprops.id).update({
          //   "nfollowers": followCount.followers + val
          // })
      }
      else 
      {
        //add 

                val = 1 ; 
                db.firestore().collection("follows").doc(localStorage.getItem('username')).update({
                  follows: firebase.firestore.FieldValue.arrayUnion(allprops.id)
              });
              db.firestore().collection("followers").doc(allprops.id).update({
                followers: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('username'))
            });

            // db.firestore().collection("users").doc(localStorage.getItem('username')).update(
            //   {
            //     "nfollows": localStorage.getItem("nfollows") + val 
            //   }
            // ); 
            // db.firestore().collection("users").doc(allprops.id).update({
            //   "nfollowers": followCount.followers + val
            // })
        
      }
      setFollowButton(!FollowButton) ; 
      setFollowCount({
        ...followCount, 
        "followers": followCount.followers + val
      })
    }
    function handleImageChange(event)
    {
        let ImageFile =event.target.files[0] ;
        console.log("heyyyyy"); 
        console.log(ImageFile) ;   
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
    function handleFinalUpload()
    {
       
      console.log(FinalUploadImage) ;  
      if(FinalUploadImage !=null)
        {
            
            
            setImage(FinalUploadImage) ;
            const reader = new FileReader() ; 
            reader.addEventListener("load" , function(){
                var CoverPageElement = document.getElementById("previewImage") ; 
               
                CoverPageElement.setAttribute("src" , this.result) ; 
            }); 
            reader.readAsDataURL(FinalUploadImage) ; 
            setUploadImageButton("none"); 
         
        }
        else{

          var CoverPageElement = document.getElementById("previewImage") ; 
          CoverPageElement.setAttribute("src" , props.ProfileImageAddress) ; 
          let ImageFileInput  = document.getElementById("fileInput") ;
          ImageFileInput.value = null ; 
         
          console.log(ImageFileInput); 
          setUploadImageButton("none"); 

        }
        
    }
    function  handleAnalytics(event)
    {
      let UserWorks = document.getElementById("UserWorks") ; 
      let UserAnalytics =   document.getElementById("UserAnalytics") ; 
      if(AnalyticsButton)
        {
          UserWorks.style.display = "block" ; 
          UserAnalytics.style.display= "none" ;
        }
        else 
        {
           UserWorks.style.display = "none" ; 
           UserAnalytics.style.display= "block" ;
        }

        setAnalytics(!AnalyticsButton) ; 
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
        <div><button onClick={handleUploadImageButton} className="btn btn-info" style={{display:UploadImageButton , marginRight:"20px"}}>Upload</button>
        <button onClick={handleFinalUpload} className="btn btn-info" style={{display:UploadImageButton}}>Cancel</button>
        </div>
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
                <p>Website: <a href= "https://youtu.be/XipZ2n8AcAc"  target="_blank">https://youtu.be/XipZ2n8AcAc</a> </p>
                <br></br>
                <audio controls style={{outline:"none"}} loop controlsList="nodownload">
                      <source  src= {process.env.PUBLIC_URL + "mysong.mp3"} type="audio/mp3" ></source>
                  </audio>
            </div>
            
            <div className="col-md-6" >

                <div  className="container-inner" style={{display:"flex",  backgroundColor:""  , justifyContent:"space-evenly"}}>
                    <a style={{textDecoration:"none" , textAlign:"center", margin:"10px" , marginRight:"30px"}}>
                      <h4>Follows</h4><div style={{fontSize:"35px"}}><Caption caption={followCount.follows} /></div>
                    </a>
                    <a style={{textDecoration:"none" , textAlign:"center", margin:"10px" , marginLeft:"30px",backgroundColor:""}}>
                      <h4>Followers</h4><div style={{fontSize:"35px"}}><Caption caption={followCount.followers} /></div>
                    </a>
                </div>
                <div className = "" style={{backgroundColor:""  ,  justifyContent:"flex-end" ,  display:"flexbox" , paddingRight:0}}>
                  {currentUser == allprops.id ?EditProfile:FollowMessage}
                </div>
               

                    

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
    
        return (
        <div className = "container center"  >
             <h1>Here You Can See the Analytics</h1> 
        </div>
        ) ; 
    
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