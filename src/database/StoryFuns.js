import React, {useState, useContext, Component } from "react";
import { AuthContext } from "../Auth";
import db from "./db";
import {futureObject} from "react-futures";
import {Username} from './funcs' ; 

export const GetStoryDetails = function  (collecName, StoryId)
{
  const [StoryDetails , setStoryDetails] = useState({}) ; 
  console.log("Getting Story Details "+collecName+StoryId)
  const snapshot = db.firestore()
  .collection(collecName)
  .where("creator","==", localStorage.getItem("username"))
  .get()
  .then(querySnapshot => {
      querySnapshot.forEach(function(doc) {
          
        console.log("setting the Story Details") ;   
        setStoryDetails(doc.data()); 
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  console.log("Returning the Story Details"); 
  return StoryDetails ; 
}

