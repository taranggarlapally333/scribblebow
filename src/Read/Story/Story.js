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
             
         } , imageAddress:"" } ; 
            
    }
           
    shouldComponentUpdate(nextprops , nextState)
    {
        console.log("Update");  
        console.log(this.state.StoryDetails.myid) ;
         console.log(nextState.StoryDetails); 
        if(this.props == nextprops && this.state.StoryDetails.myid === nextState.StoryDetails.myid && this.state.imageAddress === nextState.imageAddress)
             return false ; 
        else return true ; 
    }

    GetStoryDetails = function  (collecName, StoryId)
        {
         
            //console.log("Getting Story Details "+collecName+StoryId); 
            const snapshot = db.firestore()
            .collection(collecName).doc(StoryId)
            .get()
            .then(querySnapshot => {

                console.log(querySnapshot); 
                var sep = {
                    ...querySnapshot.data(),
                    "myid": querySnapshot.id 
                   }     ; 
                     this.setState({StoryDetails: sep }) ; 
                }
                )
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
            //console.log("Returning the Story Details"); 
            
             
        }
        GetCoverPage  = function(imageId)
        {

          console.log("Get Cover Page is called"); 
          const images = db.storage().ref().child('CoverPages');
            const image = images.child(imageId);
            image.getDownloadURL().then((url) => { 
              
                this.setState({imageAddress:url}) ;
                console.log("setting the iamge")
              
            });
            
           
        }

    render(){

        var allProps = { ...this.props.location.state}  ;
        this.GetStoryDetails(Atts.documentName[allProps.title],allProps.id) ;
        this.GetCoverPage(allProps.id); 
        if(this.state.StoryDetails)
    {
        return (
            <div>
                 
                <Header title = {allProps.title} />
                <div className = "container">
                    <div className= "row">
                        <p.CoverPage 
                        imageAddress = {this.state.imageAddress}
        
                        />
                        <p.default 
                        id = {allProps.id} 
                        Details = {this.state.StoryDetails}
                        title = {allProps.title}
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