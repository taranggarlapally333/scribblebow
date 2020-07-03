import React from 'react' ; 
var fontsAvailable = ["'Pacifico', cursive","Arial, Helvetica, sans-serif" ,"'Teko', sans-serif"]; 
 var propsClass = "form-control " ; 




 

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

 export {fontsAvailable , propsClass, CoverPage} ; 