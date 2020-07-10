import WriteStory from './Story' ;
import React from 'react' ;  
import * as Atts from "./Atts" ; 
import db from '../../database/db'; 
import Loading from '../../components/Loading';
/* This is the main page for the Write Story 
the Other pages redirect to this page with three properties
1. StoryId , title , new/notNew
if the story is new we  retrive the data from the database else we wont */ 
class WriteTheStory extends React.PureComponent{
    constructor(props)
    {
        super(props) ; 
        this.state = { StoryDetails:{
            "id":"",
            "StoryTitle" : this.props.location.state.title+" Title", 
            "StoryFont":"",
            "StoryFontSize":"20" , 
            "StoryContent": "", 
            "StoryGenre": "" ,
            "StoryHashtags":"",
            "StoryDescription":"",
            "StorySeries":"",
            "part":0,
            "PublishSave" : true , 
            "StoryCoverPage":"" , 
            "ArticleType":"Personal Blog",
            "FictionBasedOn":"",
        }, stage:0 }
    }
    shouldComponentUpdate(nextProps , nextState)
    {
        if(this.props === nextProps &&this.state.StoryDetails.id === nextState.StoryDetails.id && this.state.stage === nextState.stage) return false ; else return true ; 
    }
    GetStoryDetails = function  (collecName, StoryId)
        {
         
            console.log("Getting Story Details "+collecName+StoryId); 
            const snapshot = db.firestore()
            .collection(collecName).doc(StoryId)
            .get()
            .then(querySnapshot => {

                
                var sep ={
                    "id": querySnapshot.id ,
                    "StoryTitle" : querySnapshot.data().title, 
                    "StoryFont":querySnapshot.data().font,
                    "StoryFontSize":"20" , 
                    "StoryContent": querySnapshot.data().content, 
                    "StoryGenre": querySnapshot.data().genre,
                    "StoryHashtags":querySnapshot.data().hashtags,
                    "StoryDescription":querySnapshot.data().description,
                    "StorySeries":"",
                    "part":querySnapshot.data().part,
                    "PublishSave" : false , 
                    "StoryCoverPage":"" , 
                    "ArticleType": ("type" in  querySnapshot.data())?querySnapshot.data().type:"Personal Blog",
                    "FictionBasedOn":("basedOn" in  querySnapshot.data())?querySnapshot.data().basedOn:"",
                }   ;
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
              
                let tempStory = 
                {
                    ...this.state.StoryDetails, 
                    "StoryCoverPage": url  
                }
                this.setState({StoryDetails:tempStory, stage:4 }) ;
                console.log("setting the iamge") ;
              
            });
            
           
        }
    render()
    {
        if(!this.props.location.state.new) {this.GetStoryDetails(Atts.documentName[this.props.location.state.title], this.props.location.state.id) ; this.GetCoverPage(this.props.location.state.id);
        
        if(this.state.stage ==4 )
            return (<div><WriteStory StoryDetails ={this.state.StoryDetails} new = {this.props.location.state.new} title={this.props.location.state.title} /></div>) ;
        if(this.state.stage == 0 )
          return(<div><Loading message="Loading Content" /></div>); 
        }
        else   return (<div><WriteStory StoryDetails ={this.state.StoryDetails} new = {this.props.location.state.new} title={this.props.location.state.title} /></div>) ;
    }
}

export default WriteTheStory ; 