/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function testFirebase() {

}


function submitData() {

  var mainText = document.getElementById('mainText').value;
  var submit = document.getElementById('submitButton');



  var firebaseRef = firebase.database().ref();

  firebaseRef.push(mainText);
}


  var test = document.getElementById('test');
  var firebaseRef = firebase.database().ref().child("test");

  firebaseRef.on('value', function(datasnapshot) {
    test.innerHTML = datasnapshot.val();
  });
