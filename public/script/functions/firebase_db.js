//@ts-nocheck
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAummeFtZuiLFuC0FKgGs5qITwoBHah46c",
    authDomain: "taiyaking-9d190.firebaseapp.com",
    databaseURL: "https://taiyaking-9d190.firebaseio.com",
    projectId: "taiyaking-9d190",
    storageBucket: "taiyaking-9d190.appspot.com",
    messagingSenderId: "473080549401"
};

firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.collection("scores").orderBy("posted").limit(3).get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
        console.log(doc.data());
    });
});