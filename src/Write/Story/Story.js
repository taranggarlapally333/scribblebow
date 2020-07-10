import React, {useState, useContext } from "react";
import Header from '../../components/NavHeader' ; 
import * as Atts from './Atts' ;
import db from "../../database/db";
function WriteStory(props)
{

    var [StoryStatus , setStoryStatus] = useState(
        {
            "StoryTitle" : props.location.state.title+" Title" , 
            "StoryFont":"",
            "StoryFontSize":"20" , 
            "StoryContent": "", 
            "PublishSave" : true 
        }
    ) ; 

    
        


   function handleStoryStatus(event)
   {
        var {name,value} = event.target;
        var PubSave = true  ; 
        switch (name)
        {
            case "StoryFontSize" : if(parseInt(value) > 30)  value = "30"  ; 
            case "StoryContent" : if(value.length > 0 ) PubSave = false ; 
        } 
        setStoryStatus(prevValue =>{
            return {
                ...prevValue,
                [name] : value,
                ["PublishSave"] : PubSave 
            };
        });
   }

    var TodayDate  =  new Date().toLocaleString() ; 
    var currLoc = window.location.pathname ;
    var UploadImage = null ;  
    if (currLoc == "/WriteStory"|| currLoc=="/WritePoem")
    {
         UploadImage = <div><h4>Upload Cover Page</h4>
    <input type="file" />
    <div className="" style={{backgroundColor:"" , margin:"10px" , marginTop:"30px"}}>
        <Atts.CoverPage 
            imageAddress = "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg"
        />
    </div></div> ; 
       TodayDate = "Type Your Content Here" ; 
    }

    function handleReset()
    {
        setStoryStatus(prevValue =>{
            return {
                ...prevValue,
                "StoryFont" : "" , 
                "StoryFontSize":"20" ,
                "StoryTitle" : props.location.state.title+" Title" ,  
            };
        });

    }
    function getFontOptions(eachFont)
    {
        return (<option style={{fontFamily:eachFont}} value ={eachFont} >Story Font</option>) ; 
    }
    function handleSubmit()
    {
       //db.firestore().collection('stories').doc(new Data().get)
    } 
    return (
        <div>
            <Header title = {props.location.state.title.toUpperCase()} />
            <form onSubmit = {handleSubmit}>
            <div className= "col-12 col-md-3 myshadow StoryWriteProps" >
                    <div className = "container-inner" style={{display:"flex", justifyContent: "space-evenly"}}> <a class = "btn btn-default" onClick={handleReset}>Reset</a>
                    <a class = "btn btn-warning right"  name = "PublishSave" disabled= {StoryStatus.PublishSave} >Publish</a>
                    <a class = "btn btn-primary right"  name = "PublishSave"  disabled= {StoryStatus.PublishSave} >Save</a></div>
                   
                    <h4>Title</h4>
                    <input className = {Atts.propsClass} type="text" name = "StoryTitle" value={StoryStatus.StoryTitle} 
                        onChange = {handleStoryStatus}
                    />
                    <h4>{props.location.state.title} Font</h4>
                    <select className = {Atts.propsClass} type="text" name = "StoryFont" onChange =  {handleStoryStatus}>
                        {Atts.fontsAvailable.map(getFontOptions)}
                    </select>
                    <h4>{props.location.state.title} FontSize</h4>
                    <input className = {Atts.propsClass} type="text" name = "StoryFontSize" value={StoryStatus.StoryFontSize} 
                        onChange =  {handleStoryStatus}
                    />
                    <h4>Description</h4>
                    <textarea className={Atts.propsClass}  type= "text"  name = "description"
                    style={{height:"100px", resize:"none"}} ></textarea>
                    <h4>Genre</h4>
                    <input className = {Atts.propsClass} type="text" name = "StoryFontSize" value={StoryStatus.StoryFontSize} 
                        onChange =  {handleStoryStatus}
                    />
                    {UploadImage}
                    

            </div>
            <div className= "col-12 col-md-9 " >
                <div className="myshadow"style={{ alignItem: "center" , padding:"100px" , paddingTop:"30px" , overflowX:"auto"}}>
                <div className = "alert alert-success" style={{width:"595px" , textAlign:"center"}} name="StoryTitle">{StoryStatus.StoryTitle}</div>
            
                <textarea  className = "myshadow" name="StoryContent"
                onChange= {handleStoryStatus}
                style= {{resize:"none" , width:"595px", height:"842px", padding:"10px" ,
                fontFamily: StoryStatus.StoryFont, 
                fontSize:StoryStatus.StoryFontSize+"px"}} >
                 {TodayDate + " ,"}
                </textarea>
                </div>
                
            </div>
            </form>
        </div>
    ) ; 
}

export default WriteStory ; 