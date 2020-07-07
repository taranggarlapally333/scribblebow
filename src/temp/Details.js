import React ,{useState}from 'react' ; 
import * as icons from 'react-icons/md';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import {Caption} from '../components/Loading' ; 
import * as Atts from '../Write/Story/Atts'

function StoryDetails(props)
{
    var Details = "col-12 col-md-9  Details " ; 
    var shadow = "myshadow" ; 
    var currLoc = window.location.pathname;
  
    const [isExpanded , setExpanded] = useState(false) ; 
    const [CommentButton , setCommentButton] = useState("All Comments");

    function expand() {
        setExpanded(!isExpanded);}

    function handleSubmit(event)
    {
        event.preventDefault(); 
        setExpanded(!isExpanded);
    }
    function handleStoryAllComment(event)
    {   
        var StoryContentElement =  document.getElementById("StoryContent") ;
        StoryContentElement.innerHTML = null ;
        if(CommentButton== "All Comments")
        {
            let h1 = document.createElement("h1") ; h1.innerHTML ="All Comments" ; 
            StoryContentElement.appendChild(h1); 
            var AllComments = Atts.tempComments; 
            AllComments.forEach((eachComment)=>{
                    let div = document.createElement("div") ; 
                    let h4 = document.createElement("h4") ; h4.innerHTML = eachComment.user ; 
                    let p= document.createElement("p") ;  p.innerHTML = eachComment.comment ; 
                    div.appendChild(h4) ; div.appendChild(p) ; 
                    div.className = "Comment rounded container myshadow";
                                    
                    
                    StoryContentElement.appendChild(div) ;
            }); 
            setCommentButton("Back to Read Story"); 
        }
        else{
            let p = document.createElement("p") ; 
            p.innerHTML = Atts.tempStoryContent ; 
            StoryContentElement.appendChild(p); 
            setCommentButton("All Comments")
        }
        
    }
    var firstprice = <h1 style={{color:"gold", }}><span className="glyphicon glyphicon-queen "></span></h1> ; 
    var LikeCommentAdd = <div id = "likeComment"className = "row container " style = {{width : 205 , backgroundColor:""}}>
    <div className= "box" style = {{color: "#E61D42"}}>
    <icons.MdFavorite size="30"/><Caption caption="204"/></div>
    <div className= "box "  style = {{color: "blue"}}  onClick={expand}  > 
    <icons.MdComment  size="30" /><Caption caption="15"/></div>
    <div className= "box"> 
    <icons.MdAdd  size="30"/><Caption caption="shelf"/>
    </div>
</div>  ; 


    return (
        <div>
            <div className = {currLoc !="/home" ? Details+shadow : Details} >
                {currLoc =="/home" ? firstprice : null}
            <p style = {{fontSize:40}}>{props.title}</p>
                <div className= "row container">
                   
                    <a href ="/ReadStory?genre=comedy" ><span className="badge bg-white border box">ROMANCE</span></a>
                    <a href ="/ReadStory?genre=comedy" ><span className="badge bg-white border box">ACTION</span></a>
                </div> 
                <hr />
                <p>Description: This is the Description Part</p>
                <p>Rating :1200</p>
                <p>Hashtags: </p>
                <div className = "row container">
                    <a  href={"/Discover?tag="}><span className =  {"label label-danger"+" box"}>#Story</span></a>
                    <a  href={"/Discover?tag="}><span className =  {"label label-warning"+" box"}>#Story</span></a>
                    <a  href={"/Discover?tag="}><span className =  {"label label-primary"+" box"}>#Story</span></a>
                </div>
                {currLoc!="/home"|"/" ?LikeCommentAdd:null}
                <div className="container-inner" >
                <form onSubmit={handleSubmit}>
                    {isExpanded && (
                        <textarea
                            name="title"
                            rows="5"
                            cols="30"
                            className="myshadow rounded"
                            style={{resize:"none",border: "none" , outline: "none",padding:"10px"}}
                            placeholder="Type Your Comment Here"
                        />
                    )}
                    <Zoom in={isExpanded}>
                        <button  class="btn btn-primary btn-circle btn-md mybutton" >
                        <icons.MdSend size="20" amplitude="10" />
                        </button>
                    </Zoom>
                    <Zoom in={isExpanded}>
                     <a class="btn btn-default" style={{margin:"10px"}} 
                     name="StoryAllComment"
                     onClick={handleStoryAllComment}>{CommentButton}</a>
                    </Zoom>
                    
                </form>
            </div>
            </div>
           
        </div>
    ); 
}
function StoryContent(props)
{
    return (
        <div className = "StoryContent container" id = "StoryContent"  >
            <p>Hat Boshdeke</p>
        </div>
    ) ; 
}
function CoverPage(props)
{
    return (
        
            <div className= "col-md-3">
                <div className = "myshadow" style = {{width:160,maxWidth:160,height:277,justifyContent:"center"}}>
                <img src = {props.imageAddress} alt = "Cover " style = {{maxWidth:160,height:277, maxHeight:"277"}}></img>
                </div>
            </div>
        ); 
}

export default StoryDetails; 
export {StoryContent , StoryDetails , CoverPage}; 