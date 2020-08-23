import * as firebase from 'firebase';
const { default: db } = require("../database/db");

export function addRemoveLike(id, flag){
    if(flag){
        db.firestore().collection("likes").doc(id).update({
            usernames: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem("username"))
        });
        db.firestore().collection("audio").doc(id).update({
            nlikes: firebase.firestore.FieldValue.increment(-1)
        });
    }
    else{
        db.firestore().collection("likes").doc(id).update({
            usernames: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem("username"))
        });
        db.firestore().collection("audio").doc(id).update({
            nlikes: firebase.firestore.FieldValue.increment(1)
        });
    }
} 



export function toggleShelf(id, flag){
    if(flag){
        db.firestore().collection("myshelf").doc(localStorage.getItem("username")).update({
            audio: firebase.firestore.FieldValue.arrayRemove(id)
        });
    }else{
        db.firestore().collection("myshelf").doc(localStorage.getItem("username")).update({
            audio: firebase.firestore.FieldValue.arrayUnion(id)
        });
    }
}