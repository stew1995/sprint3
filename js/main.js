/*
 When the document has loaded the messages in the database load
 each time a message is added, the js adds a new paragraph message
*/
$(document).ready(
  function() {
    var root = firebase.database().ref().child("Chat");

    root.on("child_added", snap => {


      //append() puts all into a line not a list
      $("#chatLayout").append("<div id='messageContent'><span class='timestamp'>"+snap.val().Time+"</span><p class='messageAuthor'>"+snap.val().User+"</p><p class='content'>"+snap.val().Message+"</p>");

    });
  }
)

/*
Sending message to the database

Firebase reference is Chat and each message is under a unqiue key
*/
$("#buttonSend").click(
  function() {
    var ref = firebase.database().ref().child("Chat").push();

    //Getting the feilds
    //Message Content
    var text = $("#messageText").val();
    //Message timestamp
    var time = new Date();
    //Time format for message
    var formatTime = time.getHours() + ":" + time.getMinutes();

    //User object
    var user = firebase.auth().currentUser;
    /*
    CHecks if user is not null
    if there is user then it sends the message
    */

    if(user != null) {
      //Message object
      //ref is the databse reference
      //user.uid is the users unqiue id to firebase
      ref.set({
        Message : text,
        User : user.uid,
        Time : formatTime
      });
    }
    //empty text field for the next message
    $("#messageText").val("");

  }
)

$(document).ready(
  function() {
    $("#open").click(
      function() {
        $.ajax({
          url : "helloworld.txt",
          dataType: "text",
          success: function(data) {
            $("#notesArea").text(data)
          }
        })
      })
  }
)
