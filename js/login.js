// User is signed in.
$("#loginContainer").hide();
$("#spin").hide();
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {


      var dialog = document.querySelector('.login-cont');

      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      dialog.close();

    } else {
      // No user is signed in.

      var dialog = document.querySelector('.login-cont');

      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      dialog.showModal();
    }
  });

//Onlick listerner on button
$("#loginButton").click(
  function() {
    //Getting a html element
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();


    if(email != "" && password != "") {
      //Show prgoress bar
      $("#loginProgress").show();
      // Hide Button
      $("#loginButton").hide();

      // Sign in and catch for error
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

        $("#loginError").show().text(error.message);

      });

    }
  }
);

//Register user
$("#registerButton").click(
  function() {
    //Getting a html element
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();


    if(email != "" && password != "") {
      //Show prgoress bar
      $("#loginProgress").show();
      // Hide Button
      $("#loginButton").hide();

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    }

  }
);

var test = document.getElementById('test');
var firebaseRef = firebase.database().ref().child("test");

firebaseRef.on('value', function(datasnapshot) {
  test.innerHTML = datasnapshot.val();
});
