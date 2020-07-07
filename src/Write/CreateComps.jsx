import React, { useState, memo } from "react";
import db from "../database/db";
import { Redirect } from "react-router";


    
    
    




function CategoryDrafts(props){

    const [r,setR]=useState(0);
    const [id,setId] = useState("");
    const [exist,setExist]=useState(0);
    const [tabs,setTabs] = useState([]);

    function Tabs(props)
{
    
    return (<div className="col-sm-3">
    <a onClick={()=>{setId(props[1]);console.log("changed")}}>
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
    
export default memo(CategoryDrafts);