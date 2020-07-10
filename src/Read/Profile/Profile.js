import React from 'react' ; 
import * as User from './ProfileFuns' ; 
import NavHeader from '../../components/NavHeader';
function Profile()
{
    return (
        <div>
            <NavHeader  title = "Profile"/>
            <div  className = "container" >
                <div className= "row"><User.UserDetails /></div>
                <hr></hr>
                <div id ="UserWorks"><User.UserWorks /></div>
                <User.Analytics />
            </div>
           
           
        </div>
    ); 
}

export default Profile ; 