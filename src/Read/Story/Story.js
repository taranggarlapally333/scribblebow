import React, { useState } from 'react' ; 
import Header from '../../components/NavHeader' ; 
import * as p from './Details' ; 
import * as Files from '../../Storage/UploadFile' ; 
import * as Story from '../../database/StoryFuns';
import * as Atts from "../../Write/Story/Atts";  
import Loading from '../../components/Loading';
function ReadStory(props)
{
    
    var allProps = {
        ...props.location.state
    } ; 
    console.log("allProps"+ allProps); 
    const [stage , setStage] = useState(0) ;
    var StoryDetails  = Story.GetStoryDetails(Atts.documentName[allProps.title],allProps.id) ; 
    var ImageAddress  = Files.GetCoverPage(allProps.id) ; 
    if(StoryDetails)
    {
        return (
            <div>
                 
                <Header title ="STORY" />
                <div className = "container">
                    <div className= "row">
                        <p.CoverPage 
                        imageAddress = {ImageAddress}
        
                        />
                        <p.default 
                        id = {allProps.id} 
                        Details = {StoryDetails}
                        />
                    </div>
                    <hr></hr>
                    <p.StoryContent
                        Details = {StoryDetails}
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

export default ReadStory ; 