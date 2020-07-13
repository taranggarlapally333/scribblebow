import React from "react";

export function TopUserTile(){
    return <div style={{display: "flex",justifyContent: "space-between",borderColor:"grey", borderStyle:"solid",borderWidth:"0.5px",borderTop: "0px",borderLeft: "0px",borderRight: "0px"}}>
    <div style={{height:"30px",width:"30px" ,borderRadius: "50%", margin:"5px", backgroundColor:"grey"}}></div>
    <a href="" className="tcreator-tile-a">
    <p  style={{marginTop:"10px",marginLeft:"5px"}}>hello</p>
    </a>
    <i  style={{marginTop:"10px",marginLeft:"5px"}} class="fa fa-user-plus"></i>
    </div>
}


export function SelectButtons(){
    console.log("the buttons");
    return <div className = " container myscroller" style={{display:"flex",overflowX:"auto",justifyContent:""}} >
    <a className = "btn create-btn" style={{backgroundColor: "#E61D42",marginBottom: "10px", fontWeight: "bold"}} onClick={()=>{}}>Story</a>
    <a className = "btn create-btn" style={{backgroundColor: "#FF7F00",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{}}>Poem</a>
    <a className = "btn create-btn" style={{backgroundColor: "#FFED07",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{}}>Quote</a>
    <a className = "btn create-btn" style={{backgroundColor: "#74E03E",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{}}>Blog/Article</a>
    <a className = "btn create-btn" style={{backgroundColor: "#0000FF",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{}}>Fan-Fiction</a>
    <a className = "btn create-btn" style={{backgroundColor: "#2E2B5F",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{}}>Audio</a>
    <a className = "btn create-btn" style={{backgroundColor: "#8B00FF",marginBottom: "10px",fontWeight: "bold"}} onClick={()=>{}}>Script</a>
    </div>;
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