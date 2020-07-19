import React, { useState } from 'react' ; 
import Header from '../../components/NavHeader' ; 
import * as p from './Details' ; 
import * as Files from '../../Storage/UploadFile' ; 
import * as Story from '../../database/StoryFuns';
import * as Atts from "../../Write/Story/Atts";  
import Loading from '../../components/Loading';
import db from "../../database/db";

class ReadStory extends React.PureComponent{
    
    
    constructor(props)
    {
         super(props) ;
         this.state = {StoryDetails:{
             "myid":"",
             
         } , imageAddress: process.env.PUBLIC_URL+"ScribbleBow.png" ,
         AllStoryComments:{ comments:null},
         stage:0,
        Liked:false } ; 
            
    }
           
    shouldComponentUpdate(nextprops , nextState)
    {
        console.log("Update");  
        console.log(this.state.AllStoryComments); 
        console.log(this.state.StoryDetails.myid === nextState.StoryDetails.myid ); 
        console.log(this.state.AllStoryComments.length === nextState.AllStoryComments.length); 
        console.log(this.state.stage == nextState.stage);
        if(this.props == nextprops 
            && this.state.StoryDetails.myid === nextState.StoryDetails.myid 
            && this.state.AllStoryComments.length === nextState.AllStoryComments.length
            && this.state.Liked === nextState.Liked
            && this.state.stage == nextState.stage)
             return false ; 
        else return true ; 
    }

    GetStoryDetails = function  (collecName, StoryId)
        {
         

            const snapshot = db.firestore()
            .collection(collecName).doc(StoryId)
            .get()
            .then(querySnapshot => {

                console.log(querySnapshot); 
                var sep = {
                    ...querySnapshot.data(),
                    "myid": querySnapshot.id 
                   }     ; 
                     this.setState({StoryDetails: sep } ) ; 
                }
                )
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
            //console.log("Returning the Story Details"); 
            
             
        }
        GetAllComments = function (StoryId)
        {
            db.firestore().collection("comments")
            .doc(StoryId)
            .get()
            .then(querysnapshot =>{
                if(querysnapshot.exists)
                    this.setState({AllStoryComments : querysnapshot.data()} ); 
            }).catch(error =>{
                console.log(error) ;console.log("NO COmmetns"); 
            })
        }
        CheckLiked(StoryId)
        {
            console.log("checked Liked")
            db.firestore().collection("likes")
            .doc(StoryId)
            .get()
            .then(querysnapshot =>{
                if(querysnapshot.exists)
                   {
                       let likedUsers = querysnapshot.data().usernames; 
                       console.log(likedUsers) ;
                       let val = likedUsers.find(e => e === localStorage.getItem('username')); 
                       this.setState({Liked:val!=null , stage:4 });  
                       console.log("setting to 4 ")
                   }
            }).catch(error =>{
                console.log(error) ;console.log("NO COmmetns"); 
                this.setState({stage:4})
            }); 
        }

    render(){

        var allProps = {
            "title": new URLSearchParams(this.props.location.search).get("title"), 
            "id": new URLSearchParams(this.props.location.search).get("StoryId")
        }  ;
        console.log(allProps);
        this.GetStoryDetails(Atts.documentName[allProps.title],allProps.id) ;
        
        this.GetAllComments(allProps.id) ; 
        this.CheckLiked(allProps.id);  
        if(this.state.stage === 4)
    {
        return (
            <div>
                 
                <Header title = {allProps.title} />
                <div className = "container">
                    <div className= "row">
                        <p.CoverPage 
                        imageAddress = {this.state.StoryDetails.coverid !="" ? this.state.StoryDetails.coverid : this.state.imageAddress}
        
                        />
                        <p.default 
                        id = {allProps.id} 
                        Details = {this.state.StoryDetails}
                        title = {allProps.title}
                        Comments = {this.state.AllStoryComments.comments}
                        Liked = {this.state.Liked}
                        />
                    </div>
                    <hr></hr>
                    <p.StoryContent
                        Details = {this.state.StoryDetails}
                    />
                </div>
            </div>
            ); 
    }
    else
    {
       return( <Loading message="Loading"/>); 
    }
    
    }

    
}

export default ReadStory ; 