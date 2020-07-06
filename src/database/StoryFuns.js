import React, {useState, useContext, Component } from "react";
import { AuthContext } from "../Auth";
import db from "./db";
import {futureObject} from "react-futures";
import {Username} from './funcs' ; 

export const getStoryDetails = function  (collecName, StoryId)
{
  var StoryDetails  ; 
  const snapshot = db.firestore()
  .collection(collecName)
  .where("creator","==", localStorage.getItem("username"))
  .get()
  .then(querySnapshot => {
      querySnapshot.forEach(function(doc) {
          StoryDetails = doc.data() ; 
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  return StoryDetails ; 
}

