import React from 'react' ; 
var fontsAvailable = ["'Pacifico', cursive","Arial, Helvetica, sans-serif" ,"'Teko', sans-serif"]; 
var GenreAvailable = ["COMEDY" , "HORROR" , "ROMANCE" , "ACTION" ,"ADVENTURE","SCI-FI" ,"FAN_FICTION" ] ; 
var GenreColors = {
    "COMEDY":"#f5ba13" , 
    "HORROR":"dark green" , 
    "ROMANCE":"#E61D42" , 
    "ACTION":"blue" ,
    "ADVENTURE":"green",
    "SCI-FI" :"silver" ,
    "FAN_FICTION":"purple"
} ; 
 var propsClass = "form-control " ; 
 var documentName  = {
     "Story":"stories", 
     "Poem": "poems" , 
     "Blog" : "blogs" , 
     "Article": "articles",
     "Audio":"audios"
 }




 

 function CoverPage(props)
{
    return (
        
            <div className= "col-md-3">
                <div class = "myshadow" style = {{width:160}}>
                <img src = {props.imageAddress} alt = "Cover " style = {{height:277}}></img>
                </div>
            </div>
        ); 
}

 export {fontsAvailable , 
    propsClass, 
    CoverPage , 
    GenreAvailable , 
    GenreColors,
    documentName} ; 