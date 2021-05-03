// server.js
// where your node app starts

// init project
var express = require('express');
// setup a new database
// persisted using async file storage
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)
var app = express();

// default list of messages
db.defaults({ messages: [] }).write();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// removes entries from messages and populates it with default messages
app.get("/reset", function (request, response) {
  // removes all entries from the collection
  db.get('messages')
  .remove()
  .write()
  console.log("Database cleared");
  response.redirect("/");
});

app.get("/messages", function (request, response) {
  var dbMessages=[];
  var messages = db.get('messages').value() // Find all messages in the collection
  messages.forEach(function(message) {
    dbMessages.push([message.messageText]); // adds their info to the dbMessages value
  });
  response.send(dbMessages); // sends dbMessages back to the page
});

// creates a new entry in the messages collection with the submitted values
app.post("/messages", function (request, response) {
  db.get('messages')
    .push({ 
      messageText: request.query.messageText,
      question: request.question,
      answer: request.answer
    })
    .write()
  console.log("New message inserted in the database");
  response.sendStatus(200);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});