import React, {useState, useContext } from "react";
import Header from '../../components/NavHeader' ; 
import * as Atts from './Atts' ;
import db from "../../database/db";
import {AuthContext} from '../../Auth';



function WriteStory(props)
{

    var [StoryStatus , setStoryStatus] = useState(
        {
            "StoryTitle" : props.title+" Title" , 
            "StoryFont":"",
            "StoryFontSize":"20" , 
            "StoryContent": "", 
            "StoryGenre": "" ,
            "StoryHastags":" ", 
            "part":0,
            "PublishSave" : true 
        }
    ) ; 

   function handleStoryStatus(event)
   {
        var {name,value} = event.target;
        var PubSave = true  ; 
        var tempGenre = StoryStatus.StoryGenre; 
        console.log(name, value); 
        switch (name)
        {
            case "StoryFontSize" : if(parseInt(value) > 30)  value = "30"  ; break ; 
            case "StoryContent" : if(value.length > 0 ) PubSave = false ; break ;  
        } 
        console.log(value); 
        setStoryStatus(prevValue =>{
            return {
                ...prevValue,
                [name] : value,
                ["PublishSave"] : PubSave 
            };
        });
   }
    function getGenres(eachGenre)
    {
        return (<option value={eachGenre} 
>{eachGenre}</option>); 

    }


    var TodayDate  =  new Date().toLocaleString() ; 
    var currLoc = window.location.pathname ;
    var UploadImage = null ;  
    var PubSaveButton  = false ; 

    const {currentUser} = useContext(AuthContext);

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
                "StoryFont" : "", 
                "StoryFontSize":"20" ,
                "StoryTitle" : props.title+" Title" ,  
            };
        });

    }
    function getFontOptions(eachFont)
    {
        return (<option style={{fontFamily:eachFont}} value ={eachFont} >Story Font</option>) ; 
    }
    function handleSubButton(event)
    {
        var element  = event.target.name  ; 
        if(element == "Publish") PubSaveButton = true  ; else PubSaveButton = false  ; 
    }
    function handleSubmit(event)
    {
        
        event.preventDefault() ;
        console.log(PubSaveButton) ;  
        var myStoryData = {
            "creator": "" , 
            "title": StoryStatus.StoryTitle, 
            "content": StoryStatus.StoryContent, 
            "font":StoryStatus.StoryFont ,
            "genre": StoryStatus.StoryGenre , 
            "hastags": StoryStatus.StoryHastags, 
            "nlikes": 0 , 
            "ncomments":0  , 
            "publish": PubSaveButton

        } ; 
        console.log(myStoryData)

            db.firestore().collection(Atts.documentName[props.title]).doc(Date.now().toString()).set(myStoryData) ; 
           alert("adding Done Fo check the Firebase DataBase") ; 
           
       
    } 
    if(currentUser)
    {
        return (
            <div>
                <Header title = {props.title.toUpperCase()} Username = {currentUser.email.split("@")[0]} />
                <form onSubmit = {handleSubmit}>
                <div className= "col-12 col-md-3 myshadow StoryWriteProps" >
                        <div className = "container-inner" style={{display:"flex", justifyContent: "space-evenly"}}> <a class = "btn btn-default">Reset</a>
                        <button class = "btn btn-warning right" type="submit" value ="Publish" name = "Publish" disabled= {StoryStatus.PublishSave} onClick = {handleSubButton}>Publish</button>
                        <button class = "btn btn-primary right"  type = "submit" name = "Save"  disabled= {StoryStatus.PublishSave} onClick = {handleSubButton}>Save</button></div>
                       
                        <h4>Title</h4>
                        <input className = {Atts.propsClass} type="text" name = "StoryTitle" value={StoryStatus.StoryTitle} 
                            onChange = {handleStoryStatus}
                        />
                        <h4>{props.title} Font</h4>
                        <select className = {Atts.propsClass} type="text" name = "StoryFont" onChange =  {handleStoryStatus}>
                            {Atts.fontsAvailable.map(getFontOptions)}
                        </select>
                        <h4>{props.title} FontSize</h4>
                        <input className = {Atts.propsClass} type="text" name = "StoryFontSize" value={StoryStatus.StoryFontSize} 
                            onChange =  {handleStoryStatus}
                        />
                        <h4>Description</h4>
                        <textarea className={Atts.propsClass}  type= "text"  name = "description"
                        style={{height:"100px", resize:"none"}} ></textarea>
                        <h4>Genre</h4>
                        <select className = {Atts.propsClass} type="text" name = "StoryGenre" onChange =  {handleStoryStatus}>
                            {Atts.GenreAvailable.map(getGenres)}
                        </select>
                        <h4>HashTags</h4>
                        <input className={Atts.propsClass} type="text" name="StoryHashtags" onChange={handleStoryStatus}></input>
                        <h4>Part</h4><input className={Atts.propsClass} style={{width:"80px" }} type="number" onChange={handleStoryStatus} name="part"></input>
                        
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
    else {
        return <div className= "container"   style={{width:"500px"}}>
             <img src="https://i.stack.imgur.com/hzk6C.gif"></img>
        </div>
    }
    
}

export default WriteStory ; 