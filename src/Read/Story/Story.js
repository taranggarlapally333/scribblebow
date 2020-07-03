import React from 'react' ; 
import Header from '../../components/Header' ; 
import * as p from './Details' ; 
import Navbar from '../../components/navbar'; 
function ReadStory()
{
    return (
    <div>
         
        <Header title ="STORY" />
        <Navbar />
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

export default ReadStory ; 