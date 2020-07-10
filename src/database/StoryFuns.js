import React, {useState, useContext, Component } from "react";
import { AuthContext } from "../Auth";
import db from "./db";
import {futureObject} from "react-futures";
import {Username} from './funcs' ; 

export const GetStoryDetails = function  (collecName, StoryId)
{
  const [StoryDetails , setStoryDetails] = useState([]) ; 
  console.log("Getting Story Details "+collecName+StoryId); 
  const snapshot = db.firestore()
  .collection(collecName).doc(StoryId)
  .get()
  .then(querySnapshot => {
  
    console.log("setting ythe "); 
        setStoryDetails(querySnapshot.data());
      }
      )
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  console.log("Returning the Story Details"); 
  
  return StoryDetails ; 
}

