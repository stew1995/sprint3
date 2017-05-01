/*
 When the document has loaded the messages in the database load
 each time a message is added, the js adds a new paragraph message
*/
$(document).ready(
  function() {
    var root = firebase.database().ref().child("Chat");

    root.on("child_added", snap => {

      //append() puts all into a line not a list
      $("#message").append("<p>"+snap.val()+"</p>");

    });
  }
)






var test = document.getElementById('test');
var firebaseRef = firebase.database().ref().child("text");

firebaseRef.on('value', function(datasnapshot) {
  test.innerHTML = datasnapshot.val();
});



/*
Sending message to the database

Firebase reference is Chat and each message is under a unqiue key
*/
$("#buttonSend").click(
  function() {
    var ref = firebase.database().ref().child("Chat").push();

    //Getting the feilds
    //need to get the user id aswell
    var text = $("#messageText").val();

    ref.set(text);

  }
)
