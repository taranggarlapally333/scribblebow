import React from 'react' ; 
import * as User from './ProfileFuns' ; 
import NavHeader from '../../components/NavHeader';
import db from '../../database/db' ; 
import Loading from '../../components/Loading';

class Profile  extends React.Component
{
    
    
    constructor(props){
        super(props) ; 
        this.state= {stage:0 , UserDetails:{
            id:"", 
            title:""
        }, ProfileImageAddress:process.env.PUBLIC_URL+"ScribbleBow.png", 
        Userfollows:[] , Usersfollowers:[] ,DoesUserFollow:false , IsUserFollowed:false}
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.props === nextProps && 
            this.state.UserDetails.id === nextState.UserDetails.id 
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
              
                this.setState({ProfileImageAddress:url, stage:4}) ;
                console.log("setting the Profile Image")
              
            }, (error)=>{ this.setState({stage:4})});
    }
    GetFollows = function(UserId)
    {
        
        db.firestore().collection("follows")
        .doc(UserId)
        .get()
        .then(querysnapshot =>{
                 let follows = querysnapshot.data().follows  ; 
                 let val = follows.find(e => e === localStorage.getItem('username')); 
                this.setState({UserFollows: querysnapshot.data().follows , DoesUserFollow: val!=null} ); 
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
                let val = followers.find(e => e === localStorage.getItem('username')); 
                this.setState({UsersFollowers : querysnapshot.data().followers , IsUserFollowed: val!=null} ); 
        }).catch(error =>{
            console.log(error) ;console.log("NO COmmetns"); 
        })
    }
    render()
    {
        let UserId ; 
        UserId =  new URLSearchParams(this.props.location.search).get("UserId") ;
        if (UserId == null) UserId = localStorage.getItem('username') ; 
       
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
                            follows = {this.state.Userfollows}
                            followers={this.state.Usersfollowers}
                        /></div>
                        <hr></hr>
                        <div id ="UserWorks"><User.UserWorks UserId = {UserId} 
                            
                        /></div>
                    
                    </div>
                
                
                </div>
            );
        if(this.state.stage == 0) return(<Loading message="Loading Profile"/>); 
    }
    
}

export default Profile ; 