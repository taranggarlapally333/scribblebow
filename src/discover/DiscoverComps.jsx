import React from "react";
import { useHistory } from "react-router";
import db from "../database/db";

export function TopUserTile(){
    const history = useHistory();
    return <div style={{display: "flex",justifyContent: "space-between",borderColor:"grey", borderStyle:"solid",borderWidth:"0.5px",borderTop: "0px",borderLeft: "0px",borderRight: "0px"}}>
    <div style={{height:"30px",width:"30px" ,borderRadius: "50%", margin:"5px", backgroundColor:"grey"}}>
        <img alt="profile pic small" style={{height:"30px",width:"30px",borderRadius: "50%"}} src="https://i0.wp.com/chipandco.com/wp-content/uploads/2020/01/2019-disneylegend-rdj-780x440-1-1.jpg?fit=600%2C338&ssl=1"/>
    </div>
    <a href="" className="tcreator-tile-a" onClick={()=>history.push({
                            pathname:'/Profile' , 
                            state:{id: 'taranggarlapally'}, 
                        })}>
    <p  style={{marginTop:"10px",marginLeft:"5px"}}>hello</p>
    </a>
    <a className="pointer" onClick={()=>{console.log("followed user")}} ><i  style={{marginTop:"10px",marginLeft:"5px",color:"blue"}} class="fa fa-user-plus"></i></a>
    </div>
}




export function TopCreators(){
    return <div><div className="topcreators-title" style={{marginLeft: "-9%", height: "40px",width:"140%", backgroundColor: "#f5ba13"}}>
    <p className="tcreators-head" align="center">CREATORS ON THE RISE</p>
    </div>
    <div style={{marginLeft: "-9%",width:"140%"}}>
    <TopUserTile />
    <TopUserTile />
    <TopUserTile />
    <TopUserTile />
    <TopUserTile />
    <TopUserTile />
    <TopUserTile />
    <TopUserTile />
    </div>
    </div>
}


function RetrieveSearch(myprops){
 
}



export function SearchResults(props){
    if(props.category){
        return <RetrieveSearch category={props.category} searchkey={props.searchkey}/>
    }else{
        return <p>{props.searchkey}</p>
    }


}