import React from 'react' ; 
import * as StoryDetails from '../Read/Story/Details' ;
import * as icons from 'react-icons/md';
import  * as mdb from "mdbreact";

function Aboutus()
{
    return(
        <div className = "container myshadow">
        <div className = "row">
            <div class = "col-md-3"style={{width:"30%",height:"100%", fontSize:"25px" , padding:"20px"}}>
                Here You can Create and Discover 
                <ul>
                    <li>Story</li>
                    <li>Poems</li>
                    <li>Audio</li>
                    <li>Blogs</li>
                    <li>Artiles</li>
                    <li>Quotes</li>
                </ul>
            </div>
            <div className= "col-md-8" style={{height:"100%",color:"", padding:"20px"}} >
                <h3>Here the Famous Quote of the Month</h3>
                <div className= "container-inner famous" style ={{textAlign:"center" ,color:"white" , height:"300px"}}> 
                <h1><p>Create And Let Others Discover Your Achievements</p></h1>
                </div>
                
            </div>
            
            </div>
            
        </div>);
       
        
} 
function Tabs(props)
{
    return (<div className= "container-inner myshadow rounded" style={{ backgroundColor:"" , padding:"20px", margin:"20px"}}>
    <div class = "" style = {{width:200 , backgroundColor:""}}>
    <img src = {props.imageAddress} alt = "Cover " style = {{height:277 , padding:"10px"}}></img>
    </div>
    <h5>{props.title}</h5>
</div>) ; 
}
function  FamousStories(props)
{
    var titleClassName ="" ; 
    switch (props.title) {
        case "Story" : titleClassName = "" ; break ; 
        case "Poem" : titleClassName = "alert alert-warning" ; break ; 
        case "Article": titleClassName="alert alert-info" ; break ; 
    }
    return (
            <div className="container">
                <h1 className={titleClassName} style={{backgroundColor:""}}>{props.title.toUpperCase()}</h1>
                <hr></hr>
                <div className = "row container myshadow rounded" style={{marginBottom:"20px"}}>
                        <div class = "col-md-3"style={{width:"30%",height:"100%", fontSize:"25px" , padding:"20px"}}>
                        <StoryDetails.CoverPage 
                imageAddress = "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg" 
                />
                        </div>
                        <div className= "col-md-8" style={{height:"100%",color:"", padding:"20px"}} >
                            <StoryDetails.StoryDetails  
                                title= "THE UNTOLD STORY"
                            />
                        </div>
                </div>
                <h3>Trending</h3>
                <div className = "row container" style={{backgroundColor:"" ,display:"flex" ,overflowX:"auto", justifyContent: "flex-start"}}>
                    <Tabs 
                        imageAddress= "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg"
                        title="The Untold Story"
                    />
                    <Tabs 
                        imageAddress= "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg"
                        title="The Untold Story"
                    />
                     <Tabs 
                        imageAddress= "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg"
                        title="The Untold Story"
                    />
                     <Tabs 
                        imageAddress= "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg"
                        title="The Untold Story"
                    />
    
                    
                </div>
            </div>
        ); 
}

export default Aboutus ; 
export {Aboutus , FamousStories} ; 