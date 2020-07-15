import React ,{useState}from 'react' ; 
import * as icons from 'react-icons/md';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import {Caption} from '../../components/Loading' ; 
import * as Atts from '../../Write/Story/Atts'; 
import { Redirect, useHistory } from "react-router";
import db from '../../database/db';
import * as firebase from 'firebase';
import { GetStoryDetails } from '../../database/StoryFuns';

function StoryDetails(props)
{
    var Details = "col-12 col-md-9  Details " ; 
    var shadow = "myshadow" ; 
    var currLoc = window.location.pathname;
    const myStoryDetails = {
        ...props.Details , 
    }
    const history = useHistory();
    const [isExpanded , setExpanded] = useState(false) ; 
    const [CommentButton , setCommentButton] = useState("All Comments");
    var [LikeCommentCount , setLikeCommentCount] = useState(
        {
            "likes": myStoryDetails.nlikes , 
            "comments": myStoryDetails.ncomments,
        }
    );

    const [myShelf , setMyShelf] = useState(false) ;

    const [LikeState ,setLikeState] = useState(props.Liked) ; 
    console.log(LikeCommentCount); 
    let storeComment = null ; 
    if(props.Comments !=null) storeComment = props.Comments.comments ;  
    const [AllStoryComments , setAllComments] = useState(storeComment) ;
    console.log("Storuy commets0"); 
    console.log(AllStoryComments); 
    var Hashtags = myStoryDetails.hastags ; 
    function expand() {
        setExpanded(!isExpanded);}
    function handleLikeButton()
    {
        
        let val = 1 ; 
        if(LikeState) val = -1 ;  
        
        db.firestore().collection(Atts.documentName[props.title])
        .doc(myStoryDetails.myid)
        .update({
            "nlikes":  LikeCommentCount.likes+ val 
        }) ;
        
        if(LikeState)
        {
            db.firestore().collection("likes").doc(myStoryDetails.myid).update({
                usernames: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('username'))
            });
            
        }
        else {
            
            db.firestore().collection("likes").doc(myStoryDetails.myid).update({
                usernames: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('username'))
            });
        }
        setLikeState(!LikeState) ;
        setLikeCommentCount({
            ...LikeCommentCount,
            "likes": LikeCommentCount.likes+ val 
        }); 
        
    }
    function handleSubmit(event)
    {
        event.preventDefault(); 
        console.log("THe event triggerd "); 
        let theComment = event.target.StoryComment.value ; 
        let thePushComment = {"user": localStorage.getItem('username'), "comment" : theComment} ;
        console.log(thePushComment);
             
        if(AllStoryComments != null)
        {
            db.firestore().collection("comments").doc(myStoryDetails.myid).update({
                comments: firebase.firestore.FieldValue.arrayUnion(thePushComment)
            });
            
            setAllComments([...AllStoryComments , thePushComment]) ;
        }
        else 
        {
            db.firestore().collection("comments").doc(myStoryDetails.myid).set({
                comments: firebase.firestore.FieldValue.arrayUnion(thePushComment)
            });
            setAllComments([thePushComment]) ;
        }
        db.firestore().collection(Atts.documentName[props.title]).doc(myStoryDetails.myid).update(
            {
                "ncomments": myStoryDetails.ncomments+1 
            }
        );
        setLikeCommentCount({
            ...LikeCommentCount,
            "comments": LikeCommentCount.comments+ 1 
        }); 
        if(CommentButton == "Back to Read "+ props.title)
            handleStoryAllComment(); 
        setExpanded(!isExpanded);
    }
    function handleStoryAllComment()
    {   
        var StoryContentElement =  document.getElementById("StoryContent") ;
        StoryContentElement.innerHTML = null ;
        if(CommentButton== "All Comments")
        {
            let h1 = document.createElement("h1") ; h1.innerHTML ="All Comments" ; 
            StoryContentElement.appendChild(h1); 
            let AllComments = AllStoryComments ;  
            if(AllComments != null)
            {
                AllComments.forEach((eachComment)=>{
                    let div = document.createElement("div") ; 
                    let h4 = document.createElement("h4") ; h4.innerHTML = eachComment.user ; 
                    let p= document.createElement("p") ;  p.innerHTML = eachComment.comment ; 
                    h4.className  =  "FitToContent "+ Atts.getHashClassName(eachComment.user.length) ; 
                    p.className = "FitToContent"; 
                    div.appendChild(h4) ; div.appendChild(p) ; 
                    div.className = "Comment  FitToContent";
                                    
                    
                    StoryContentElement.appendChild(div) ;
            }); 
            }
            else{
                let h3 = document.createElement("h3") ; 
                h3.innerHTML = "No Comments" ; 
                StoryContentElement.appendChild(h3) ;
            }
            
            setCommentButton("Back to Read "+ props.title ); 
        }
        else{

        
            StoryContentElement.innerHTML =  myStoryDetails.content ; 
            setCommentButton("All Comments")
        }
        
    }
    var firstprice = <h1 style={{color:"gold", }}><i class='fas fa-crown'></i></h1> ; 
    var LikeCommentAdd = <div id = "likeComment"className = "row container " style = {{width : 205 , backgroundColor:"" }}>
    <div className= "box" style = {{color: LikeState?"#E61D42":null}} onClick={handleLikeButton} >
    <icons.MdFavorite size="30" /><Caption caption={LikeCommentCount.likes}/></div>
    <div className= "box "  style = {{color: "blue"}}  onClick={expand}  > 
    <icons.MdComment  size="30" /><Caption caption={LikeCommentCount.comments}/></div>
    <div className= "box" style={{color: myShelf ?"green":null}} onClick={()=>{setMyShelf(!myShelf)}}> 
    {!myShelf?<icons.MdAdd  size="30"/>:<icons.MdCheck size="30"/>}<Caption caption={!myShelf?"Shelf":"Added"}/>
    </div>
</div>  ; 
    var EditStory =<div className="container-inner" style={{ display:"flex",justifyContent:"flex-end", padding:"10px"}}><button className="btn btn-default" onClick={()=>{

        history.push({pathname:'/WriteStory', 
                        state: { id: myStoryDetails.myid , title:props.title , new:false }, 
                        key:{id: myStoryDetails.myid , title: props.title , new:false}
                        }); 
}}>Edit {props.title}</button></div>  ; 

   if (currLoc !="/ReadStory" || localStorage.getItem('username') != myStoryDetails.creator) EditStory = null ; 
   if (currLoc !="/ReadStory"){ LikeCommentAdd =shadow= null ; } 
   if (myStoryDetails.published == false) LikeCommentAdd = null ; 
   var Hashtags = myStoryDetails.hashtags+"" ; 
   var myHashtags = [...Hashtags.split("#")] ; 
   console.log(myHashtags); 

    return (
        <div >
            <div className={Details} >
            <div className = {shadow} style={{padding:"15px"}} >
                {currLoc =="/home" ? firstprice : null}
                <p style = {{fontSize:40}}>{myStoryDetails.title}</p>
                <div className= "row container">
                    <a href ="/ReadStory?genre=comedy" ><span className="badge bg-white border box">{myStoryDetails.genre}</span></a>
                </div> 
                <hr />
                <p>Description:{myStoryDetails.description}</p>
                <p>Hashtags: </p>
                <div className = "row container">
                    {myHashtags.map((eachHashtag )=>{
                        return(
                            <a  href={"/Discover?tag="+eachHashtag} style={{fontSize:20, padding:"10px"}}><span className ={Atts.getHashClassName(eachHashtag.length)+" box"}>{eachHashtag}</span></a>
                        ); 
                    })}
                </div>
                {LikeCommentAdd}
                {EditStory}

            </div>
            <div className="container" style={{marginTop:"20px", }}>
                <form onSubmit={handleSubmit}>
                    {isExpanded && (
                        <textarea
                            name="StoryComment"
                            rows="1"
                            cols="60"
                            className="myshadow rounded"
                            style={{resize:"none" , border: "none" , outline: "none",padding:"10px" }}
                            placeholder="Type Your Comment Here"
                        />
                    )}
                    <Zoom in={isExpanded}>
                        <button className="btn btn-primary col" style={{margin:"10px", marginTop:"-20px"}} >
                        {/* <icons.MdSend size="20" /> */}
                        Comment
                        </button>
                    </Zoom>
                    <Zoom in={isExpanded}>
                     <a className="btn btn-default col" style={{margin:"10px", marginTop:"-20px"}} 
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
        <div className = "StoryContent container"   >
            <p style={{ whiteSpace:"pre-wrap"}} id = "StoryContent" >{props.Details.content}</p>
        </div>
    ) ; 
}
function CoverPage(props)
{
    return (
        
            <div className= "col-md-3" style={{backgroundColor:""}}>
                <div className = "myshadow" style = {{width:160,maxWidth:160,height:277,justifyContent:"center"}}>
                <img  src = {props.imageAddress} alt = "Cover " style = {{maxWidth:160,height:277, maxHeight:"277"}}></img>
                </div>
            </div>
        ); 
}

export default StoryDetails; 
export {StoryContent , StoryDetails , CoverPage}; 