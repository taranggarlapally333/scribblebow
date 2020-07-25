import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import Gravatar from 'react-gravatar'
import Header from '../components/NavHeader' ; 
import * as funs from "./homeFuns";
// import { categoryAvailable } from "../Write/Story/Atts";

function Home(){
    const {currentUser} = useContext(AuthContext);
    var aboutUs = <funs.default/> ; 
    var currentLocation = window.location.pathname;
    var logged=0;
    if(localStorage.getItem("username")){
        logged=1;
    }
    var categoryAvailable = ["Story","Poem" , "Article" , "Fanfiction"];  
    return (

        
        <div>
        
           <Header title="HOME" logged={logged}/> 
          
          {currentLocation == "/home" ? aboutUs : null }
          {categoryAvailable.map(eachCat =>{ return( <funs.FamousStories title={eachCat}/> ) ; })}
           
        </div>
); 
}

export default Home;