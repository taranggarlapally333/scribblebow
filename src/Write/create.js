import React, { useState } from 'react' ; 
import Header from '../components/NavHeader';

import { icons } from 'react-icons/lib';
import db from '../database/db';
import WriteStory from './Story/Story';
import { Redirect } from 'react-router';



function Create()
{
    const [category,setCategory]=useState("works");
    const [ripple,setRipple] = useState();
 

    const categoryWrite={
        "stories":"/WriteStory",
        "poems":"/WritePoem",
        "quotes":"/WriteQuote",
        "articles":"/WriteArticle",
        "fanfiction":"/WriteFanfiction",
        "audio":"/WriteAudio",
        "script":"/WriteScript"
    };

    const categoryWriteProp={
        "stories":"Story",
        "poems":"Poem",
        "quotes":"Quote",
        "articles":"Article",
        "fanfiction":"Fanfiction",
        "audio":"Audio",
        "script":"Script"
    };

        

    



    function CategoryDrafts(props){

        const [r,setR]=useState(0);
        const [id,setId] = useState("");
        const [exist,setExist]=useState(0);
        const [tabs,setTabs] = useState([]);
    
        function Tabs(props)
    {
        
        return (<div className="col-sm-3">
        <a href="#" onClick={()=>{setId(props[1]);console.log("changed")}}>
        <div className= "container-inner myshadow rounded" style={{ backgroundColor:"" , padding:"20px", margin:"20px"}}>
        <div className = "" style = {{width:200 , backgroundColor:""}}>
        <img src = {props[0].coverid===""?"https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg":props[0].coverid} alt = "Cover " style = {{height:277 , padding:"10px"}}></img>
        </div>
        <h5>{props[0].title}</h5>
        </div>
        </a>
        </div>) ; 
    }
    
    
        
        if(props.category!=="works"){
            
            console.log("Hello");
            db.firestore()
            .collection(props.category)
            .where("creator","==",localStorage.getItem("username"))
            .where("published","==",false)
            .get()
            .then(querySnapshot => {
                
                setTabs([]);
                var ntabs = [];
                
                querySnapshot.forEach(function(doc) {
                    const d = [doc.data(),doc.id];
                    ntabs.push(d);
                });
                if(ntabs.length===0){
                    setR(2);
                }
                setTabs(ntabs);
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }
        if(id===""){
            return <div class="container">
        {tabs.length===0?
        <div className="container" align="center">
        {r===2?<p>You have no unpublished {props.category}</p>:null}
        </div>
        :tabs.map(Tabs)}
        </div>
        }
        else{
            return <Redirect to={{
                 pathname: "/WriteStory",
                 state: {
                    title: props.category,
                     id: id
                 }
            }
            } />
        }
    }




 
    
function SelectButtons(){
    return <div className = "container myscroller" style={{display:"flex",overflowX:"auto",justifyContent:"space-evenly"}} >
    <a className = "btn create-btn" style={{backgroundColor: "#E61D42",fontWeight: "bold"}} onClick={()=>{setCategory("stories")}}>Story</a>
    <a className = "btn create-btn" style={{backgroundColor: "#FF7F00",fontWeight: "bold"}} onClick={()=>{setCategory("poems")}}>Poem</a>
    <a className = "btn create-btn" style={{backgroundColor: "#FFED07",fontWeight: "bold"}} onClick={()=>{setCategory("quotes")}}>Quote</a>
    <a className = "btn create-btn" style={{backgroundColor: "#74E03E",fontWeight: "bold"}} onClick={()=>{setCategory("articles")}}>Blog/Article</a>
    <a className = "btn create-btn" style={{backgroundColor: "#0000FF",fontWeight: "bold"}} onClick={()=>{setCategory("fanfiction")}}>Fan-Fiction</a>
    <a className = "btn create-btn" style={{backgroundColor: "#2E2B5F",fontWeight: "bold"}} onClick={()=>{setCategory("audio")}}>Audio</a>
    <a className = "btn create-btn" style={{backgroundColor: "#8B00FF",fontWeight: "bold"}} onClick={()=>{setCategory("script")}}>Script</a>
    </div>;
}


        return (
            <div>
                <Header title = "Create" />
                <div className="container">
                <h4 className="font0" align="center" style={{marginTop: "-20px"}}>Choose what to create...</h4>
                </div>
    
                <SelectButtons />
                <div className="container">
                <p style={{fontSize:"30px",marginTop: "20px",marginBottom:"-20px",marginLeft: "5%",color: "#C5D9C3",float:"left"}}>Drafts</p>
                <a href={categoryWrite[category]}><i class="material-icons" style={{fontSize:"36px",marginTop: "20px",marginBottom:"-20px",marginRight: "5%",color: "#C5D9C3",float:"right"}}>add_circle</i></a>
                </div>
                <div className="container">
                <hr style={{width:"90%",borderTop: "2px solid #C5D9C3"}}/>
                <p style={{marginLeft: "5%"}}>Continue Writing</p>
                </div>
                <CategoryDrafts category={category} />
                
                
                
                
            </div>
        )
    
    
    
}
export default Create  ; 