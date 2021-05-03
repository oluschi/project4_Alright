let result = document.querySelector("#result");

// About Page //
function myFunction() {

  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");

  let popClose = document.querySelector("#ellipse1");
	
	// function that closes the 2 pop up columns. 
	popClose.addEventListener("click",function(){
	myPopup.style.display="none;"	

	});

	document.addEventListener("keydown",function(event){
		$( function() {
	$( "draggable" ).draggable();});
	});

}


// Share: Message //
let mediaPop = document.querySelector("#share");

var Airtable = require("airtable");
console.log(Airtable);

// Keys //
var base = new Airtable({ apiKey: "keygEINsXOj57TR6b"}).base(
	"app3J7I3REkUeJGxY");

//base("media").select({}).eachPage(gotPageOfMedia, gotAllMedia);//

base('media').create({"genre": "quote"}, function(err, record) {
  
  console.log(record.getId());

const media=[];

function gotPageOfMedia(records, fetchNextPage) {
  console.log("gotPageOfMedia()");
 
  media.push(...records);
 
  fetchNextPage()
}

function gotAllMedia(err) {
  console.log("gotAllMedia()");
	
	if (err) {
	  console.log("error loading media");
	  console.error(err);
	  return;
	}

  showMedia();
}



    mediaShelf.addEventListener("click",function(){
  	
  	mediaPop.style.display="block";
	
	//add info to the right column. 
	const mediaTitle=document.querySelector("#title");
	mediaTitle.innerText=item.fields.title;
	const mediaBio = document.querySelector("#bio");
	mediaBio.innerText=item.fields.description;

	//add the image to the left column. 
	let mediaImg = document.getElementById('box');
	mediaImg.style.display="inline-block";	
	mediaImg.src = item.fields.cover_image[0].url;



	let mediaClose = document.querySelector("#close");
	
	// function that closes the 2 pop up columns. 
	mediaClose.addEventListener("click",function(){
	mediaPop.style.display="none";
	mediaImg.style.display="none";	
	});


});


// Share Box info //


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





/* OUTPUT
recBZjTx7pnZCqjpo
recBZjTx7pnZCqjpo */



/*
$(function myShare() {
	var =document.getElementById("");
	.classList.("show")

var noteShare = document.querySelector("#share");

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  
  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(a.href);
};

document.querySelector('#btnSave').addEventListener('click', () => {
  const textArea = document.querySelector('textarea');
  
  downloadToFile(textArea.value, 'my-new-file.txt', 'text/plain');
});
*/


});
