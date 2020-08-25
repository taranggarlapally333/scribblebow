import React from 'react' ; 
import * as User from './ProfileFuns' ; 
import NavHeader from '../../components/NavHeader';
import db from '../../database/db' ; 
import Loading, { LoadingPage } from '../../components/Loading';


function Profile(props)
{
    
    let UserId ; 
    UserId =  new URLSearchParams(props.location.search).get("UserId") ;
    if (UserId == null) UserId = localStorage.getItem('username') ; 
    return <ProfilePage setPlayAudio={props.setPlayAudio} id = {UserId} key  =  {UserId} /> ; 
}

class ProfilePage  extends React.Component
{
    
    
    constructor(props){
        super(props) ; 
        this.state= {stage:0 , UserDetails:{
            id:"", 
            title:""
        }, ProfileImageAddress:process.env.PUBLIC_URL+"ScribbleBow.png", 
        Userfollows:{ id:"" , array:[]} , Usersfollowers:{id:" " , array:[]} ,DoesUserFollow:false , IsUserFollowed:false}

        console.log(this.state); 
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        
        console.log(this.state.Userfollows.length === nextState.Userfollows.length
            && this.state.Usersfollowers.length === nextState.Usersfollowers.length , "adfasdfdsa")
        if(this.props.id === nextProps.id && 
            this.state.UserDetails.id === nextState.UserDetails.id 
            && this.state.ProfileImageAddress === nextState.ProfileImageAddress
            && this.state.Userfollows.id === nextState.Userfollows.id
            && this.state.Usersfollowers.id === nextState.Usersfollowers.id
            && this.state.IsUserFollowed === this.state.IsUserFollowed
            && this.state.DoesUserFollow === this.state.DoesUserFollow
            && this.state.stage === nextState.stage) return false ; else return true ; 
    }

    GetUserDetails = (Userid)=>{

        db.firestore().collection('users').doc(Userid).get().then(
            (querySnanpshot)=>{

                let tempUser = { ...querySnanpshot.data() , 
                "id": querySnanpshot.id }
                this.setState({UserDetails: tempUser}) ; 
            }
        ).catch(error => console.log(error)) ; 
    }
 
    GetFollows = function(UserId)
    {
        var follows  = [] ; 
        db.firestore().collection("follows")
        .doc(UserId)
        .get()
        .then(querysnapshot =>{
                 let tempfollows = querysnapshot.data().follows  ; 
                 let val = false  ; 
                
                 if(tempfollows.length == 0 )
                    this.setState({Userfollows: { id: UserId, array:tempfollows} , DoesUserFollow: val })
                else 
                {
                    tempfollows.forEach( (eachFollows , i )=>{
                        if (eachFollows === localStorage.getItem('username')) val = true  ; 
                       db.firestore().collection("users").doc(eachFollows).get().then(snapshot=>{
                               follows.push([eachFollows , snapshot.data().profileimg?snapshot.data().profileimg : ""]);
                               console.log("length increased") ; 
                               console.log(follows.length) ; 
                               if(follows.length === tempfollows.length)
                               this.setState({Userfollows: { id: UserId, array:follows} , DoesUserFollow: val } ); 
                       })
                    })
                }
                
               
                
                
        }).catch(error =>{
            console.log(error) ;
            
        })
    }
    GetFollowers = function(UserId)
    {
        
        db.firestore().collection("followers")
        .doc(UserId)
        .get()
        .then(querysnapshot =>{
                let tempfollowers = querysnapshot.data().followers  ;
                let followers=[] ; 
                let val = false ; 

                if (tempfollowers.length === 0)
                {
                    this.setState({Usersfollowers :{ id: UserId, array:tempfollowers} , IsUserFollowed: val , stage:4})
                }
                else 
                {
                    tempfollowers.forEach(eachFollower =>{
                        if (eachFollower === localStorage.getItem('username')) val = true ; 
                        db.firestore().collection("users").doc(eachFollower).get().then( snapshot=>{
                            followers.push([eachFollower , snapshot.data().profileimg])
    
                            if(tempfollowers.length === followers.length)
                                this.setState({Usersfollowers :{ id: UserId, array:followers} , IsUserFollowed: val , stage:4} );  
                        })
                    })
                }
                

                
                
        }).catch(error =>{
            console.log(error) ;console.log("NO COmmetns"); this.setState({stage:4})
        })
    }
    render()
    {
        let UserId = this.props.id  ; 
       

       
        this.GetUserDetails(UserId) ;
        this.GetFollowers(UserId); 
        this.GetFollows(UserId); 
        if(this.state.stage == 4 )
            return (
                <div>
                    <NavHeader  title = "Profile"/>
                    <div  className = "container" >
                        <div className= "row"><User.UserDetails 
                            UserId = {UserId}
                            Details  = {this.state.UserDetails}
                            ProfileImageAddress={this.state.UserDetails.profileimg !="" && this.state.UserDetails.profileimg !=null ?this.state.UserDetails.profileimg : this.state.ProfileImageAddress}
                            DoesUserFollow = {this.state.DoesUserFollow}
                            IsUserFollowed = {this.state.IsUserFollowed}
                            follows = {this.state.Userfollows.array}
                            followers={this.state.Usersfollowers.array}
                        /></div>
                        <hr></hr>
                        <div id ="UserWorks"><User.UserWorks setPlayAudio={this.props.setPlayAudio} UserId = {UserId} /></div>
                        <div id="UserAnalytics" style={{display:"none"}}><User.Analytics /></div>
                    
                    </div>
                
                
                </div>
            );
        if(this.state.stage == 0) return(<LoadingPage message="Loading Profile"/>); 
    }
    
}

export default Profile ; 


// export const UserWorks = function(props)
// {
    
//     const [title , setTitle] = useState("Story");
//     function handleWork(event)
//     {
//         var title = event.target.name  ; 
//         setTitle(title) ; 
//     }
//     function getcategoryButtons(eachButton , index)
//     {
//        var mystyle= {
//         backgroundColor:Atts.categoryColors[eachButton] , 
//         minWidth: eachButton==="Fanfiction" ? "80px" : "auto"
//        } 
      
//       return ( <button key={index} className = "btn " style={mystyle} name = {eachButton} onClick={handleWork}>{eachButton ==="Article"?"Blog/Article" :eachButton}</button>) ; 
//     }
//     return(
//         <div>
//             <div className = "container-inner buttonGroup" style={{display:"flex",justifyContent:"space-evenly" , color:"white" }} >
//             {Atts.categoryAvailable.map(getcategoryButtons)}</div>
//             <hr></hr>
//             <CategoryAll category={title} key={title} UserId  = {props.UserId} />
//         </div>
//     ); 
// }
// class Follows extends React.Component
// {
//     constructor(props)
//     {
//       super(props)
//       this.state = { follows:{ id:""  , array:[]} , stage: 0 , visitUser:""}
      
//     }
//     shouldComponentUpdate(nextProps , nextState)
//     {
//        if(this.props == nextProps && 
//          this.state.follows.id  === nextState.follows.id 
//          && this.state.stage === nextState.stage) return false ; 
//          else return true ; 
//     }
//     GetFollows = function(UserId)
//     {
//         var follows  = [] ; 
//         db.firestore().collection("follows")
//         .doc(UserId)
//         .get()
//         .then(querysnapshot =>{
//                  let tempfollows = querysnapshot.data().follows  ; 
//                  let val = false  ; 
                
//                  if(tempfollows.length == 0 )
//                     this.setState({stage:4})
//                 else 
//                 {
//                     tempfollows.forEach( (eachFollows , i )=>{
//                         if (eachFollows === localStorage.getItem('username')) val = true  ; 
//                        db.firestore().collection("users").doc(eachFollows).get().then(snapshot=>{
//                                follows.push([eachFollows , snapshot.data().profileimg?snapshot.data().profileimg : ""]);
//                                console.log("length increased") ; 
//                                console.log(follows.length) ; 
//                                if(follows.length === tempfollows.length)
//                                this.setState({follows: { id: UserId, array:follows} ,stage:4} ); 
//                        })
//                     })
//                 }
                
               
                
                
//         }).catch(error =>{
//             console.log(error) ;
//             this.setState({stage:4})
//         })
//     }
//     render()
//     {
//        this.GetFollows(this.props.id) ; 
       
//        if(this.stage == 4 )
//        {
//             return (<div id = "followsList" className="tab-pane fade in active" >
                                                
//                       {this.state.follows.array.map(eachUser =>{
//                         console.log(eachUser)
//                     return (<div className="ProfileFollowsList">
//                       <p><a className= "handy" type="button"  onClick={()=>{ 
//                   this.setState({visitUser:eachUser[0] , stage:5})
//               }}  style={{ textDecoration:"none"}} data-dismiss="modal" >
//               <img  src={eachUser[1]=="" ?process.env.PUBLIC_URL + "ScribbleBow.png": eachUser[1]}
//               style={{ borderRadius:"50%" , width:"50px" , height:"50px" , border:"1px solid lightgray" , marginRight:"10px"}}
//               ></img> 
//               {eachUser[0]}
//               </a></p>
//                     </div>)
//                   })}
//                   {this.state.follows.array.length==0 ? "No Follows Yet":null}
//             </div>)
//        }
//        else if (this.state.stage === 5 )
//        {
//           return(<Redirect to={
//             {
//               pathname:'/Profile' , 
//             search:'?UserId='+ this.state.visitUser,
//             state:{id:this.state.visitUser , key:this.state.visitUser}, 
//             } 
//         } />) ; 
          

//        }
//        else 
//        {
//          return(<img src={process.env.PUBLIC_URL +"ripple-nobg.gif"}></img>)
//        }
//     }
// }