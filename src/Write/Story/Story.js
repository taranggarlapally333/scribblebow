import React, {useState, useContext } from "react";
import Header from '../../components/NavHeader' ; 
import * as Atts from './Atts' ;
function WriteStory(props)
{
    var [StoryTitle , setStoryTitle] = useState( props.title+" Title") ; 
    var [StoryFont , setStoryFont] = useState("") ; 
    var [StoryFontSize, setFontSize] = useState("20px") ; 
    var [StoryContent , setStoryContent] = useState("") ; 
    var [PublishSave , setPublishSave] = useState(true) ; 
    var TodayDate =TodayDate =  new Date().toLocaleString(); 
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
       TodayDate = null ; 
    }
    

    function handleReset()
    {
        setStoryTitle("StoryTitle") ; 
        setStoryFont("") ; 
        setFontSize("20"); 
    }
    function handleStoryContent(event)
    {
        var storyContent = event.target.value ; 
        setStoryContent(storyContent);
        setPublishSave(storyContent.length == 0 ); 
        
    }
    function getFontOptions(eachFont)
    {
        return (<option style={{fontFamily:eachFont}} value ={eachFont} >Story Font</option>) ; 
    }

    function handleTitleChange(event)
    {
        var title = event.target.value;
        setStoryTitle(title) ; 
    }
    function handleStoryFont(event)
    {
        var font = event.target.value ; 
        setStoryFont(font) ; 
    }
    function handleStoryFontSize(event)
    {
        var fontSize = event.target.value  ; 
        if (parseInt(fontSize) > 30) fontSize = "30" ; 
        setFontSize(fontSize) ; 
    }
    
    function handleSubmit()
    {
        // here add the data to data base 
        // Username fun ---> 
        // if (cuur)  else prof0 (data) <---some time 
        // 
    } 
    return (
        <div>
            <Header title = {props.title.toUpperCase()} />
            <form>
            <div className= "col-12 col-md-3 myshadow StoryWriteProps" >
                    <div className = "container-inner" style={{display:"flex", justifyContent: "space-evenly"}}> <a class = "btn btn-default" onClick={handleReset}>Reset</a>
                    <a class = "btn btn-warning right"  disabled= {PublishSave} >Publish</a>
                    <a class = "btn btn-primary right"  disabled= {PublishSave} >Save</a></div>
                   
                    <h4>Title</h4>
                    <input className = {Atts.propsClass} type="text" value={StoryTitle} 
                        onChange = {handleTitleChange}
                    />
                    <h4>{props.title} Font</h4>
                    <select className = {Atts.propsClass} type="text" onChange = {handleStoryFont}>
                        {Atts.fontsAvailable.map(getFontOptions)}
                    </select>
                    <h4>{props.title} FontSize</h4>
                    <input className = {Atts.propsClass} type="text" value={StoryFontSize} 
                        onChange = {handleStoryFontSize}
                    />
                    {UploadImage}
                    

            </div>
            <div className= "col-12 col-md-9 " >
                <div className="myshadow"style={{ alignItem: "center" , padding:"100px" , paddingTop:"30px" , overflowX:"auto"}}>
                <div className = "alert alert-success" style={{width:"595px" , textAlign:"center"}} >{StoryTitle}</div>
            
                <textarea  className = "myshadow" name="StoryContent"
                onChange={handleStoryContent}
                style= {{resize:"none" , width:"595px", height:"842px", padding:"10px" ,
                fontFamily: StoryFont, 
                fontSize:StoryFontSize+"px"}} >
                 {TodayDate + " ,"}
                </textarea>
                </div>
                
            </div>
            </form>
        </div>
    ) ; 
}

export default WriteStory ; 