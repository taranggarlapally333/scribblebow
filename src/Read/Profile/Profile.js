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
        }, ProfileImageAddress:process.env.PUBLIC_URL+"ScribbleBow.png"}
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.props === nextProps && this.state.UserDetails.id === nextState.UserDetails.id && this.state.stage === nextState.stage) return false ; else return true ; 
    }

    GetUserDetails = (Userid)=>{

        db.firestore().collection('users').doc(this.props.location.state.id).get().then(
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
    render()
    {
        console.log(this.props.location.state) ; 
        this.GetUserDetails(this.props.location.state.id) ;
        this.GetProfileImage(this.props.location.state.id) ; 
        if(this.state.stage == 4 )
            return (
                <div>
                    <NavHeader  title = "Profile"/>
                    <div  className = "container" >
                        <div className= "row"><User.UserDetails 
                            Details  = {this.state.UserDetails}
                            ProfileImageAddress={this.state.ProfileImageAddress}
                        /></div>
                        <hr></hr>
                        <div id ="UserWorks"><User.UserWorks UserId = {this.props.location.state.id} 
                            
                        /></div>
                    
                    </div>
                
                
                </div>
            );
        if(this.state.stage == 0) return(<Loading message="Loading Profile"/>); 
    }
    
}

export default Profile ; 