import React from 'react' ; 
import Header from '../components/NavHeader';


function Create()
{
    return (
        <div>
            <Header title = "Create" />
            <div className = "container" style={{display:"flex",justifyContent:"space-evenly"}} ><a className = "btn btn-danger"  href="WriteStory">Story</a>
            <a className = "btn btn-warning"  href="WritePoem">Poem</a>
            <a className = "btn btn-primary"  href="WriteBlog">Blog</a>
            <a className = "btn btn-info" href="WriteArticle">Article</a></div>
            
        </div>
    )
}
export default Create  ; 