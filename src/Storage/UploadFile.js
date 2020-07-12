import React, {useState, useContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';
const storage = firebase.storage() ; 

export const UploadImage = function (MainDirectory,image , imageId)
{
  const uploadTask  = storage.ref( MainDirectory+imageId).put(image) ;

  console.log( MainDirectory , imageId) ; 
  var ImageAddress  = "" ; 
  uploadTask.on(
      'state_changed' , 
      function(snapshot){
        //nothing 
          
      }, function(error){alert(error) ;}, 
      function()
      {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            ImageAddress= downloadURL ;
          }); 
      }  
      ); 
      
      
      return ImageAddress ; 
}

export const GetCoverPage  = function(imageId)
{
  const [imageurl , setImageurl] = useState("") ;  
  console.log("Get Cover Page is called"); 
  const images = firebase.storage().ref().child('CoverPages');
    const image = images.child(imageId);
    image.getDownloadURL().then((url) => { 
      
        setImageurl(url) ; 
      
    });
    
    return imageurl ; 
}

