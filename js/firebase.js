(function() {

  // Initialize Firebase
  //const is read only
  const config = {
    apiKey: "AIzaSyB8HwUxXpPbR6GBnMZXWdIvGmldXHdrj2c",
    authDomain: "sprint3-4ed4d.firebaseapp.com",
    databaseURL: "https://sprint3-4ed4d.firebaseio.com",
    storageBucket: "sprint3-4ed4d.appspot.com",
    messagingSenderId: "716959490806"
  };
  firebase.initializeApp(config);

  //Get element
  const preObject = document.getElementById('element');

  //Create Reference
  const dbRef = firebase.database().ref().child('object');

  //Sync with object changes
  dbRef.on('value', snap => console.log(snap.val()));
});
