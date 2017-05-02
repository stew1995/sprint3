//----------------------------------------------------------------
// file name: js/login.js
//----------------------------------------------------------------
// Contributed to by 750430 & 703451
//----------------------------------------------------------------
// Component version: v0.1
// - implementation of:
// -
//----------------------------------------------------------------
// FGenerates Random UID
//----------------------------------------------------------------
// REFERENCED FROM:

// User is signed in.
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

      $(".login-cont").hide();
      //To show the dialog box using MDL
      var dialog = document.querySelector('#loginDialog');

      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      dialog.close();


    } else {
      // No user is signed in.
      $(".login-cont").show();

      var dialog = document.querySelector('#loginDialog');

      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      dialog.showModal();
    }
  });

//Onlick listener on button

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

/*Logout user*/
$("#logoutButton").click(
  function() {
    //Logout user
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      //Authentication at the top should handle what happens here



    }).catch(function(error) {
      // An error happened.



    });
  }
)
