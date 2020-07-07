import React from 'react' ; 
import * as User from './ProfileFuns' ; 
import NavHeader from '../../components/NavHeader';
function Profile()
{
    return (
        <div>
            <NavHeader  title = "Header"/>
            <div  className = "container" >
                <div className= "row"><User.UserDetails /></div>
                <hr></hr>
                <User.UserWorks />
            </div>
           
           
        </div>
    ); 
}

export default Profile ; 