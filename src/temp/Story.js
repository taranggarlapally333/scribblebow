import React from 'react' ; 
import Header from '../components/NavHeader' ; 
import * as p from './Details' ; 
function ReadStory1()
{
    return (
    <div>
         
        <Header title ="STORY" />
        <div className = "container">
            <div className= "row">
                <p.CoverPage 
                imageAddress = "https://i.pinimg.com/originals/53/d4/ab/53d4ab97a2bf8a16a67950c52e34ca47.jpg" 
                />
                <p.default 
                title = "THE UNTOLD STORY"
                rating = "1200" />
            </div>
            <hr></hr>
            <p.StoryContent/>
        </div>
    </div>
    ); 
}

export default ReadStory1 ; 