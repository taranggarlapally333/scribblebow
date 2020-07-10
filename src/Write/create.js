import React , {useState} from 'react' ; 
import Header from '../components/NavHeader';
import { Redirect } from 'react-router';


function Create()
{
    
    const [ stage , setStage] = useState(0) ; 
    if(stage == 0 )
    { 
        return (
            <div>
                <Header title = "Create" />
                <div className = "container" style={{display:"flex",justifyContent:"space-evenly"}} ><a className = "btn btn-danger"  onClick={()=>{setStage(4)}}>Story</a>
                <a className = "btn btn-warning"  href="WritePoem">Poem</a>
                <a className = "btn btn-primary" href="WriteArticle">Article</a>
                <a className = "btn btn-info" href="WriteFanFiction">Fan-Fiction</a></div>
                
                
            </div>
        ); 
    }
    
    else{
        return(<Redirect to={{pathname:'/WriteStory', 
        state: { id: "1594116035361" , title:"Story" , new:false }, 
        key:{id: "1594116035361" , title:"Story" , new:false}
        }}/>) ; 
    }
}
export default Create  ; 