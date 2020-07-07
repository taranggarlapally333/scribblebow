import React from 'react' ; 
import {CoverPage} from '../Story/Details' ;
import * as Atts from '../../Write/Story/Atts'; 
export const UserDetails  = function ()
{
    
    var allprops = {
        ...Atts.tempUser 
    }; 
    return(
        <div >
            <CoverPage imageAddress = {allprops.imageAddress} />
            <div className= "col-12 col-md-9 myshadow Details">
            <p style={{fontSize:"40px"}}>{allprops.fname+" "+allprops.lname}</p>
            <h3><span className= {Atts.getHashClassName(allprops.bio.length)}>{allprops.bio}</span></h3>
            <hr></hr>
            <p>Title: {allprops.title}</p>
            <p>Gender: {allprops.gender}</p>
            <p>Achievements:</p>
            </div>
        </div>
    ) ; 
}

export const UserWorks = function()
{
    return(
        <div>
            <div className = "container-inner" style={{display:"flex",justifyContent:"space-evenly" , backgroundColor:"red"}} ><a className = "btn btn-danger"  href="WriteStory">Story</a>
            <button className = "btn btn-warning"  >Poem</a>
            <button className = "btn btn-primary" >Article</a>
            <button className = "btn btn-warning"  >Audio</a>
            <a className = "btn btn-info">Fan-Fiction</a>
            <a className = "btn btn-warning"  >Quote</a></div>
        
        
        </div>
    ); 
}