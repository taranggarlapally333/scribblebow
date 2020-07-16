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
    GetProfileImage = (ProfileImageId)=>{
        console.log("Started Retrieving the Profile Image"); 
          const images = db.storage().ref().child('ProfileImages');
            const image = images.child(ProfileImageId);
            image.getDownloadURL().then((url) => { 
              
                 setTimeout(() => {
                    this.setState({ProfileImageAddress:url, stage:4}) ;
                 }, 1000); 
                console.log("setting the Profile Image")
              
            }, (error)=>{ setTimeout(() => {
                this.setState({stage:4})
            }, 1000); });
    }
    GetFollows = function(UserId)
    {
        
        db.firestore().collection("follows")
        .doc(UserId)
        .get()
        .then(querysnapshot =>{
                 let follows = querysnapshot.data().follows  ; 
                 let val = follows.find(e => e === localStorage.getItem('username')); 
                this.setState({Userfollows: { id: UserId, array:follows} , DoesUserFollow: val!=null} ); 
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
                let followers = querysnapshot.data().followers  ;
                console.log("followers in main page") ; 
                console.log(followers) ;  
                let val = followers.find(e => e === localStorage.getItem('username')); 
                this.setState({Usersfollowers :{ id: UserId, array:followers} , IsUserFollowed: val!=null} ); 
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
        this.GetProfileImage(UserId) ; 
        if(this.state.stage == 4 )
            return (
                <div>
                    <NavHeader  title = "Profile"/>
                    <div  className = "container" >
                        <div className= "row"><User.UserDetails 
                            Details  = {this.state.UserDetails}
                            ProfileImageAddress={this.state.ProfileImageAddress}
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