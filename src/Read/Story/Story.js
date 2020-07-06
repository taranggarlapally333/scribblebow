import React from 'react' ; 
import Header from '../../components/NavHeader' ; 
import * as p from './Details' ; 
import * as Files from '../../Storage/UploadFile' ; 
import * as Story from '../../database/StoryFuns';
import * as Atts from "../../Write/Story/Atts";  
function ReadStory(props)
{
    
    var allProps = {
        ...props.location.state
    } ; 
    console.log(allProps); 
    return (
    <div>
         
        <Header title ="STORY" />
        <div className = "container">
            <div className= "row">
                <p.CoverPage 
                imageAddress = {Files.GetCoverPage(props.location.state.id)}
                />
                <p.default 
                title = "THE UNTOLD STORY"
                rating = "1200" 
                Details = {Story.getStoryDetails(Atts.documentName[props.location.state.title],props.location.state.id)}
                />
            </div>
            <hr></hr>
            <p.StoryContent/>
        </div>
    </div>
    ); 
}

export default ReadStory ; 