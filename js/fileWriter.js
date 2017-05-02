

jshint node:true
'use strict'
var fs = require('fs');


//Array
var chat = ["Hello", "World"];



var open;
var notesArea;

function getText() {
  var message = document.getElementById('messageText');
  chat.push("Hello");
  console.log(chat);
}



fs.writeFile('helloworld.txt', "message", function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});


  var file = fs.createWriteStream('test.txt');

  file.on('error', function(err) { /* error handling */ });
  chat.forEach(function(v) { file.write(v + '\n'); });
  file.end();

fs.writeFile('helloworld.txt', "message", function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});
  console.log(username);
