import React from 'react' ; 
import Header from '../components/Header' ; 
function WriteStory()
{
    return (
        <div>
            <Header title ="STORY" />
            <div className= "col-12 col-md-3 myshadow StoryWriteProps" >

            </div>
            <div className= "col-12 col-md-9 " >
                <div style={{ alignItem: "center" , padding:"100px" , paddingTop:"30px"}}>
                <textarea  className = "myshadow" 
                style= {{resize:"none" , width:"595px", height:"842px", padding:"10px" ,
                fontFamily:" Arial, Helvetica, sans-serif", 
                fontSize:"20px" }}></textarea>
                </div>
                
            </div>
        </div>
    ) ; 
}

export default WriteStory ; 