importScripts('https://www.gstatic.com/firebase/8.4.3/firebase-app.js') ; 
importScripts('https://www.gstatic.com/firebase/8.4.3/firebase-messaging.js') ; 


firebase.initializeApp({
    'messagingSenderId':"922017979428" 
})  ; 

const messaging = firebase.messaging() ; 


messaging.setBackgroundMessageHandler(function(payload){
    console.log("Recevid message" , payload) ; 
    var obj = JSON.parse(payload.data.notification) ; 
    var notificationTitle = obj.title ; 
    var notificationOptions = {
        icon :obj.icon , 
        body: obj.body 
    }  ; 

    return self.registration.showNotification(notificationTitle , notificationOptions) ; 
})