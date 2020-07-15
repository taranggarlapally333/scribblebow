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
//end Charts 
export const UserDetails  = function (props)
{   
    
    var allprops = {
        ...props.Details 
    }; 

    var currentUser = localStorage.getItem('username') ; 
    const [image , setImage] = useState(null) ; 
    var [UploadImageButton ,setUploadImageButton ] = useState("none"); 
    function handleUploadImageButton()
    {
      //upload the Image using the Upload file Fuction in storage 
      UploadImage("ProfileImages/" , image , allprops.id) ; 
      setUploadImageButton("none");
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
            <h3><span className= {Atts.getHashClassName(allprops.title.length)}>{allprops.title}</span></h3>
            <hr></hr>
            <p>Bio: {allprops.bio}</p>
            <p>Gender: {allprops.gender ? allprops.gender: "No Gender Idiot" }</p>
            <p>Achievements: No Fcukin Achievements</p>
            <div className="container-inner" style={{ display:"flex",justifyContent:"flex-end", padding:"10px"}}><button className="btn btn-default" onClick={
                ()=>
              {
                  var UserrWorks  = document.getElementById("UserWorks") ;
                    
                  
              }
            }>Analytics</button></div>
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
      
      return ( <button key={index} className = "btn " style={mystyle}  href="WriteStory" name = {eachButton} onClick={handleWork}>{eachButton ==="Article"?"Blog/Article" :eachButton}</button>) ; 
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