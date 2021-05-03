let result = document.querySelector("#result");


// PRESS KEY & GET CHANGES //

// Detect when we are pressing a key anywhere on the webpage (document)
 document.addEventListener("keydown", function(event){
   
console.log ("Hi Bookshelf");

// AIRTABLE DATA EXTRACT //
  var Airtable = require("airtable");
  console.log(Airtable);

  // use the airtable librar to get a variable that represents one of our bases
  var base = new Airtable({ apiKey: "keyLcTgqOkYLvbG5V" }).base(
  "appugOEfoytzxTsd7"
  );
   
//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("table").select({}).eachPage(gotPageOfHands, gotAllHands);

// an empty array to hold our book data
const hands = [];

// callback function that receives our data
function gotPageOfHands(records, fetchNextPage) {
  console.log("gotPageOfHands()");
  // add the records from this page to our books array
  hands.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllHands(err) {
  console.log("gotAllHands()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading books");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogHands();
  showHands();
}

// just loop through the books and console.log them
function consoleLogHands() {
  console.log("consoleLogHands()");
  hands.forEach((hand) => {
    console.log("Hand:", hand);
  });
}
   
// loop through the images (books), create an h3 for each one, and add it to the page
function showHands() {
  console.log("showHands()");
    hands.forEach((hand) => {

  
  // Print out the event details to the console
  console.log(event);
  // Print out what key we just pressed
  console.log("what did we just press:")
  console.log(event.key)
  

      // create a container for the answer
   var imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.style.right = '30px';
    document.querySelector(".container").append(imageContainer);
  
  // add captions in containers
    var instaCaptions = document.createElement("p");
    instaCaptions.classList.add("insta-captions");
    instaCaptions.innerText = hand.fields.insta_captions;
    imageContainer.append(instaCaptions);
    
      
  // Check if the key we pressed is the Enter key
  // If so, turn our page blue
  if (event.key == "?"){
    document.body.classList.toggle("blue");
  }
      
  
  // Change the inside of the result paragraph to include the key we just pressed
  result.innerText = "You just input: " + event.key;
  
})

    }
});

// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $.get('/messages', function(messages) {
    messages.forEach(function(message) {
      $('#messages').append('<li>' + message[0] + '</li>');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var messageText = $('input#messageText').val();
    $.post('/messages?' + $.param({ messageText: messageText, question: 'the question', answer: 'the answer' }), function() {
      $('#messages').append('<li>' + messageText + '</li>');
      $('input#messageText').val('');
      $('input').focus();
    });
  });
});


