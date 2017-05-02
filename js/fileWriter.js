//----------------------------------------------------------------
// file name: js/fileWriter.js
//----------------------------------------------------------------
// Contributed to by 750430 & 703451
//----------------------------------------------------------------
// Component version: v0.1
// - implementation of:
// - file writing to 'helloworld.txt'
//----------------------------------------------------------------
//
//----------------------------------------------------------------

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
