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
    return <ProfilePage id = {UserId} key  =  {UserId} /> ; 
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
        
        db.firestore().collection("follows")
        .doc(UserId)
        .get()
        .then(querysnapshot =>{
                 let tempfollows = querysnapshot.data().follows  ; 
                 let val = false  ; 
                 var follows  = [];
                 tempfollows.forEach( eachFollows=>{
                     if (eachFollows === localStorage.getItem('username')) val = true  ; 
                    db.firestore().collection("users").doc(eachFollows).get().then(snapshot=>{
                            follows.push([eachFollows , snapshot.data().profileimg?snapshot.data().profileimg : ""])
                    })
                 })
                console.log("all follows") ;
                console.log(follows); 
                console.log("follows[0]") ;
                console.log(follows[0]) ; 
                this.setState({Userfollows: { id: UserId, array:follows} , DoesUserFollow: val , stage:4} ); 
                
        }).catch(error =>{
            console.log(error) ;console.log("NO COmmetns"); 
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
                tempfollowers.forEach(eachFollower =>{
                    if (eachFollower === localStorage.getItem('username')) val = true ; 
                    db.firestore().collection("users").doc(eachFollower).get().then( snapshot=>{
                        followers.push([eachFollower , snapshot.data().profileimg])
                    })
                })

                
                this.setState({Usersfollowers :{ id: UserId, array:followers} , IsUserFollowed: val} ); 
        }).catch(error =>{
            console.log(error) ;console.log("NO COmmetns"); 
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
                            ProfileImageAddress={this.state.UserDetails.profileimg !="" ?this.state.UserDetails.profileimg : this.state.ProfileImageAddress}
                            DoesUserFollow = {this.state.DoesUserFollow}
                            IsUserFollowed = {this.state.IsUserFollowed}
                            follows = {this.state.Userfollows.array}
                            followers={this.state.Usersfollowers.array}
                        /></div>
                        <hr></hr>
                        <div id ="UserWorks"><User.UserWorks UserId = {UserId} /></div>
                        <div id="UserAnalytics" style={{display:"none"}}><User.Analytics /></div>
                    
                    </div>
                
                
                </div>
            );
        if(this.state.stage == 0) return(<LoadingPage message="Loading Profile"/>); 
    }
    
}

export default Profile ; 