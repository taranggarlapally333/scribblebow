import React, { useState } from 'react' ; 
import {CoverPage} from '../Story/Details' ;
import * as Atts from '../../Write/Story/Atts'; 
import * as Canvas from 'react-canvas-js' ; 
// Charts 
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
//end Charts 
export const UserDetails  = function ()
{   
    
    var allprops = {
        ...Atts.tempUser 
    }; 

    return(
        <div  >
            <div > <div className= "col-md-3">
                <div id  ="" className = "myshadow" style = {{width:160,maxWidth:160,height:277,justifyContent:"center", backgroundImage:"url('https://firebasestorage.googleapis.com/v0/b/scribblebow.appspot.com/o/CoverPages%2F1594116035361?alt=media&token=3813d4cf-c3d7-4373-89b5-f6139e15948f')" , backgroundPosition:"center" , backgroundSize:"cover", backgroundRepeat:"no-repeat"}}></div>
            </div></div>
            <div className= "col-12 col-md-9 myshadow Details">
            <p style={{fontSize:"40px"}}>{allprops.fname+" "+allprops.lname}</p>
            <h3><span className= {Atts.getHashClassName(allprops.title.length)}>{allprops.title}</span></h3>
            <hr></hr>
            <p>Bio: {allprops.bio}</p>
            <p>Gender: {allprops.gender}</p>
            <p>Achievements:</p>
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

export const UserWorks = function()
{
    
    const [title , setTitle] = useState("Story");
    function handleWork(event)
    {
        var title = event.target.name  ; 
        setTitle(title) ; 
    }
    function getcategoryButtons(eachButton)
    {
       return (<div>{eachButton}</div>) ; 
    }
    
    return(
        <div>
            <div className = "container-inner buttonGroup" style={{display:"flex",justifyContent:"space-evenly" , color:"white" }} >
            
            <button className = "btn btn-danger"  href="WriteStory" name = "Story" onClick={handleWork}>Story</button>
            <button className = "btn btn-warning"  name = "Poem" onClick={handleWork}>Poem</button>
            <button style={{backgroundColor:"#f5ba13"}}className = "btn btn-default" name = "Article" onClick={handleWork}>Article</button>
            <button style= {{backgroundColor:"lightgreen"}} className = "btn btn-default" name="Audio" onClick={handleWork}>Audio</button>
            <button className = "btn btn-info" style={{minWidth:"100px"}} name="FanFiciton"onClick={handleWork}>Fan-Fiction</button>
            <button  style= {{backgroundColor:"indigo"}}  className = "btn " name = "Quote" onClick={handleWork}>Quote</button>
            <button  style= {{backgroundColor:"violet"}}  className = "btn " name="Scripts" onClick={handleWork}>Scripts</button></div>
            <hr></hr>
            <div className="container-inner" style={{height:"600px", borderColor:"black"}}>
                <div className="row container" style={{display:"flex",justifyContent:"center"}}>
                    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
                    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
                    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
    
                </div>
                <div className="row container" style={{display:"flex",justifyContent:"center"}}>
                    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
                    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
                    <div className="myborder" style={{textAlign:"center",height:"300px" , width:"320px", margin:"5px", float:"left"}}>{title}1</div>
    
                </div>
                
            </div>
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
