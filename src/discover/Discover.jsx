import React, { useState } from "react";
import Header from "../components/NavHeader";
import Slide from "@material-ui/core/Slide";
import { TopCreators, SelectButtons } from "./DiscoverComps";






function Tab(myprops){
    return <div className="draft-cont">
    <a style={{textDecoration:"none",color:"black"}} >
    <div className= "container-inner myshadow rounded" style={{ borderRadius: "2px",backgroundColor:"" , padding:"20px", margin:"20px"}}>
    <div className = ""  style = {{width:"auto",backgroundColor:""}}>
    <img  className="draft-image" src = "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg" alt = "Cover " style = {{height:"180px" , padding:"10px"}}></img>
    <div className="draft-title">

    <h5>"Hello"<br />by<br />No one</h5>
    
    </div>
    
    </div>
   
    </div>
    </a>
    </div>
}





export default class Discover extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={swipe:true,swipe2:false,recid:0,dir:"right"};
    }
    


    ShowRecTabs = ()=>{
        const l=[0,2,4,7,8,9,6,8];
        const newl=l.slice(this.state.recid,this.state.recid+4);
        
        return newl.map(Tab)    
    }
    



    ContentArea=(myprops)=>{
        return <div>
        <h4 style={{marginTop:"20px",marginLeft:"40px"}}>{myprops.cmsg}</h4>
        <div style={{display:"flex", alignItems: "center"}}>
        <i className="fa fa-chevron-circle-left" onClick={this.clicked} style={{fontSize:"36px",color:"grey"}}></i>

        <Slide direction={this.state.dir} in={this.state.swipe} {...{timeout: 1000}} mountOnEnter unmountOnExit>
        <div style={{display:"flex", alignItems: "center"}}>
        <this.ShowRecTabs />
        </div>
        </Slide>
        <Slide direction={this.state.dir} in={this.state.swipe2} {...{timeout: 1000}} mountOnEnter unmountOnExit>
        <div style={{display:"flex", alignItems: "center"}}>
        <this.ShowRecTabs />
        </div>
        </Slide>
        

        <i className="fa fa-chevron-circle-right" style={{fontSize:"36px",color:"grey"}}></i>
        </div>
        </div>
    }


    handleSearch=()=> {

    }

    clicked=()=>{
        this.state.dir==="left"?this.setState({dir:"right"}):this.setState({dir:"left"});
        this.setState({swipe:!this.state.swipe});
        setTimeout(()=>this.setState({swipe2:!this.state.swipe2,dir:"right"}),500);
    }
    render(){
        return <div style={{position: "fixed",width: "100%"}}>
        <Header title="Discover" />
        <div className='container-fluid' style={{marginTop:"-20px",marginBottom:"20px"}}>
        <div align="center" className="search-bar">
                    <form className="form-inline search-form"  onSubmit={this.handleSearch}>
                        <div className="form-group search-input-group" >
                        <input className="form-control" style={{width: "100vh"}} type="text" name="search-input" placeholder="Search..." />
                        </div>
                            <button type="submit" name="submit" className="btn btn-warning mybtn search-submit" ><span className="glyphicon glyphicon-search"></span></button>
                        
                    </form>
                </div>
        <SelectButtons />
        </div>
        <div className="container">
            <div className="col-md-10 discover-content myscroller-notrack" style={{height: "80vh",overflowY: "scroll",paddingBottom:"200px", position: "relative"}}>
                <this.ContentArea cmsg="Stories Recommended For You"/>
                <this.ContentArea cmsg="Latest Stories"/>
                <this.ContentArea cmsg="Poems Recommended For You"/>
                <this.ContentArea cmsg="Latest Poems"/>
                <this.ContentArea cmsg="Articles Recommended For You"/>
                <this.ContentArea cmsg="Latest Articles"/>
                <this.ContentArea cmsg="Quotes Recommended For You"/>
                <this.ContentArea cmsg="Latest Quotes"/>
                <this.ContentArea cmsg="Audio Recommended For You"/>
                <this.ContentArea cmsg="Latest Audio"/>
                
            </div>
            <div className="col-md-2 trending-creators">
            <TopCreators />
            </div>
        </div>


    </div>
    }
    
}

// function Tab(myprops){
//     return <div className="draft-cont">
//     <a style={{textDecoration:"none",color:"black"}} >
//     <div className= "container-inner myshadow rounded" style={{ borderRadius: "2px",backgroundColor:"" , padding:"20px", margin:"20px"}}>
//     <div className = ""  style = {{width:200,backgroundColor:""}}>
//     <img  className="draft-image" src = "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg" alt = "Cover " style = {{height:277 , padding:"10px"}}></img>
//     <div className="draft-title">

//     <h5>"Hello"</h5>
//     </div>
    
//     </div>
   
//     </div>
//     </a>
//     </div>
// }





// export default function Discover() {
//     const [swipe,setSwipe]=useState(true);
//     const [recid,setRecid]=useState(0);   
//     const [dir,setDir]=useState("left");



//     function ShowRecTabs(){
//         const l=[0,2,4,7,8,9];
//         const newl=l.slice(recid,recid+3);
        
//         return newl.map(Tab)    
//     }
    


//     function handleSearch() {

//     }

//     function clicked(){
//         dir==="left"?setDir("right"):setDir("left");
//         setSwipe(!swipe);
//     }
//     return <div style={{position: "fixed",width: "100%"}}>
//         <Header title="Discover" />
//         <div className='container-fluid'>

//         </div>
//         <div className="container">
//             <div className="col-md-10 discover-content myscroller " style={{height: "80vh",overflowY: "scroll",position: "relative"}}>
//                 <div align="center" className="search-bar">
//                     <form className="form-inline search-form"  onSubmit={handleSearch}>
//                         <div className="form-group search-input-group" >
//                         <input className="form-control" style={{width: "100vh"}} type="text" name="search-input" placeholder="Search..." />
//                         </div>
//                             <button type="submit" name="submit" className="btn btn-warning mybtn search-submit" ><span className="glyphicon glyphicon-search"></span></button>
                        
//                     </form>

              
//                 </div>
//                 <input className="btn" onClick={clicked} value="Swipe"/>
//                 <div style={{display:"flex", alignItems: "center"}}>
//                 <i className="fa fa-chevron-circle-left" style={{fontSize:"36px",color:"grey"}}></i>

//                 <Slide direction={dir} in={swipe} {...{timeout: 1000}} mountOnEnter unmountOnExit>
//                 <div style={{display:"flex", alignItems: "center"}}>
//                 <ShowRecTabs />
//                 </div>
//                 </Slide>

//                 <i className="fa fa-chevron-circle-right" style={{fontSize:"36px",color:"grey"}}></i>
//                 </div>
//                 <h2 style={{ height: "700px" }}>fvc</h2> 
//                 <h2 style={{ height: "700px" }}>fvc</h2>
//             </div>
//             <div className="col-md-2 trending-creators">
//             creator's on the rise
//             </div>
//         </div>


//     </div>
// }