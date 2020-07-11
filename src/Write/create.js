import React, { useState } from 'react' ; 
import Header from '../components/NavHeader';
import CategoryDrafts from "./CreateComps";
import { icons } from 'react-icons/lib';
import db from '../database/db';
import WriteStory from './Story/Story';
import { Redirect , useHistory} from 'react-router';



function Create()
{
    
    const [ stage , setStage] = useState(0) ; 
    const [category,setCategory]=useState("works");
    const [ripple,setRipple] = useState();
    var history = useHistory() ; 

    const categoryPathName={
        "stories":"/WriteStory",
        "poems":"/WritePoem",
        "quotes":"/WriteQuote",
        "articles":"/WriteArticle",
        "fanfiction":"/WriteFanfiction",
        "audio":"/WriteAudio",
        "script":"/WriteScript"
    };
    
function SelectButtons(){
    console.log("the buttons");
    return <div className = " container myscroller" style={{display:"flex",overflowX:"auto",justifyContent:"space-evenly"}} >
    <a className = "btn create-btn" style={{backgroundColor: "#E61D42",marginBottom: "10px", fontWeight: "bold"}} onClick={()=>{setCategory("Story")}}>Story</a>
    <a className = "btn create-btn" style={{backgroundColor: "#FF7F00",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{setCategory("Poem")}}>Poem</a>
    <a className = "btn create-btn" style={{backgroundColor: "#FFED07",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{setCategory("Quote")}}>Quote</a>
    <a className = "btn create-btn" style={{backgroundColor: "#74E03E",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{setCategory("Article")}}>Blog/Article</a>
    <a className = "btn create-btn" style={{backgroundColor: "#0000FF",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{setCategory("Fanfiction")}}>Fan-Fiction</a>
    <a className = "btn create-btn" style={{backgroundColor: "#2E2B5F",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{setCategory("Audio")}}>Audio</a>
    <a className = "btn create-btn" style={{backgroundColor: "#8B00FF",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{setCategory("Script")}}>Script</a>
    </div>;
}

         {/* <div className = "container" style={{display:"flex",justifyContent:"space-evenly"}} ><a className = "btn btn-danger"  onClick={()=>{setStage(4)}}>Story</a> */}
           
        
        return (
            <div>
                <Header title = "Create" />
                <div className="container">
                <h4 className="font0" align="center" style={{marginTop: "-20px"}}>Choose what to create...</h4>
                </div>
    
                <SelectButtons />
                <div className="container">
                <p style={{fontSize:"30px",marginTop: "20px",marginBottom:"-20px",marginLeft: "5%",color: "#C5D9C3",float:"left"}}>Drafts</p>
                <a onClick={()=>{
                      console.log("mydsaadsfa"); 
                      history.push({pathname:categoryPathName[category], 
                                    state: { id: "" , title:category , new:true }, 
                                    key:{id: "" , title:category, new:true}
                                    }); 
                }} ><i class="material-icons" style={{fontSize:"36px",marginTop: "20px",marginBottom:"-20px",marginRight: "5%",color: "#C5D9C3",float:"right"}}>add_circle</i></a>
                </div>
                <div className="container">
                <hr style={{width:"90%",borderTop: "2px solid #C5D9C3"}}/>
                <p style={{marginLeft: "5%"}}>Continue Writing</p>
                </div>
                <CategoryDrafts category={category} key={category}/>
                
            </div>
        ); 
    

    
}
export default Create  ; 