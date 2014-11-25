// modal window appears between turns, on window load
// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:

var path;
var win_y = $(window).height();
var win_x = $(window).width();
var coord;
var top;
var left;
var players = document.getElementById("playersCount").innerHTML;
paper.tool.minDistance = 10;

// takes cordinates of top left corner and calculates it again when the widow
// scrolled down
$(window).load(function(){
	coord = $("#myCanvas").position();
	top = $(window).scrollTop();
	left = coord.left;
	console.log("yo");
});



// calc window height and sets canvas to windwo height times players in game
(function() {
  	var big_height = (win_y * players);
  	$('#myCanvas').attr("height", big_height);
  	$('#myCanvas').height(big_height);
  	$('#myCanvas').attr("width", win_x);
  	$('#myCanvas').width(win_x);
  	top = $(window).scrollTop();
	var topLeft = new paper.Point(0, top); //creates the top left corner of rectangle
	var rectSize = new paper.Size(win_x, big_height);
	var rect = new paper.Path.Rectangle(topLeft, rectSize);
	rect.fillColor = '#fffff';

})();



var color = "#000000";
var width = 5;

function onMouseDown(event) {
	// Create a new path and select it:
	path = new Path();
	path.strokeColor = color;
	path.strokeWidth = width;

	// Add a segment to the path where
	// you clicked:
	path.add(event.point);

}

function onMouseDrag(event) {
	// Every drag event, add a segment
	// to the path at the position of the mouse:
	path.add(event.point);

}


// Toggle listner for button to change from drawing mode to erasing mode
$( "#eraser" ).click(function() {
  	color = '#ffffff';
  	width = 30;
  	$("*").removeClass('selected');
	$(this).addClass('selected');
});


// Click listeners for stroke width buttons
$('#small').click(function(){
	width = 1;
	color = '#000000';
	$("*").removeClass('selected');
	$(this).addClass('selected');
});

$('#medium').click(function(){

	width = 5;
	color = '#000000';
	$("*").removeClass('selected');
	$(this).addClass('selected');
});

$('#large').click(function(){
	width = 15;
	color = '#000000';
	$("*").removeClass('selected');
	$(this).addClass('selected');
});


// check window size for clear button

$(window).resize(function(){
	win_y = $(window).height(); // returns height of HTML window
	win_x = $(window).width(); // returns width of HTML window
	coord = $("#myCanvas").position(); //returns top left coordinates
	top = $(window).scrollTop();
	left = coord.left;
	$('#myCanvas').attr("width", win_x);
  	$('#myCanvas').width(win_x);

});

// creates a white rectangle based on the window size to clear the shown canvas
nextTurn = function() {
	top = $(window).scrollTop();
	var topLeft = new paper.Point(0, top); //creates the top left corner of rectangle
	var rectSize = new paper.Size(win_x, win_y);
	var rect = new paper.Path.Rectangle(topLeft, rectSize);
	rect.fillColor = '#fffff';
};

$('#clear').click(function() {

	$.when(nextTurn()).done(function(){

	});
});


// scroll only when done button is clicked

var scrollTop;
var allowScrolling;

$(document).ready(function() {
	scrollTopPos = $( document ).scrollTop();
    allowScrolling = false;

    $(window).scroll(function() {

        if(allowScrolling === false) {
             $( document ).scrollTop( scrollTopPos );
        }
    });
});

var clicks = 0;

//scrolling based on fixed viewport height
scrolldown = function(){
	allowScrolling = true;
	var currentHeight = $(document).scrollTop();
	var newScrollPos = currentHeight + win_y;
	$('body').animate({scrollTop: newScrollPos}, 800).promise().done(function(){
	    	noscroll();
	});
};

scrollPage = function(){
	// only scrolls the page based on the number of players
	if (clicks < (players - 1)) {
		document.getElementById('done').value = ++clicks;
    	// if number of clicks is an even number then player write
    	// pops up modal that tells the player to wrtie
    	if (clicks % 2 === 0){
    		$('#textModal h1').text('Player: ' + (clicks + 1));
    		$('#textModal h3').text("phrase this sketch!");
		    $('#textModal').modal('show');
		    console.log("This is player" + (clicks + 1) );


    	}
    	// if number of clicks is an odd number then player draws
    	// pops up modal that tells the player to write
    	else if (clicks % 2 !== 0){
    		$('#drawingModal h1').text('Player: ' + (clicks + 1));
    		$('#drawingModal h3').text("sketch this phrase!");
    		$('#drawingModal').modal('show');
    		console.log("This is player" + (clicks + 1) );
    	}
	}
	// alerts when game is done(needs to be changed to a modal)
	else if (clicks === (players - 1)){
		displayImage();
		$('#resultModal').modal('show');

		// $.when(displayImage()).done(function(){
		// var url = "http://localhost:3000/results";
  //  		window.location.href= url;
		// });

	}
};

// disables scrolling
noscroll = function(){
	scrollTopPos = $(window).scrollTop();
    allowScrolling = false;
};



// writes text on the canvas using prompt(needs to be changed to input modal)
writing = function(){
	var currentHeight = $(document).scrollTop();
	var newScrollPos = currentHeight + win_y;
	text = $("#myInput").val();
	coord = $("#myCanvas").position();
		var text = new PointText({
		    point: [(win_x/6), newScrollPos+(win_y/2)],
		    content: text,
		    fillColor: 'black',
		    fontFamily: "'Comfortaa', Helvetica, sans-serif",
		    fontWeight: 'bold',
		    fontSize: (win_x/15)
		});
		$('#myInput').val("");
	};

// adds click listener to enter button
$('#submit').click(function() {
    writing();
    scrolldown();
});

$('#myInput').on('keyup', function(e) {
    if (e.keyCode === 13) {
        $('#submit').click();
         $('#myCanvas').click();
    }
});

$('#firstSubmit').click(function() {
    writing();
});

$('#firstInput').on('keyup', function(e) {
    if (e.keyCode === 13) {
        $('#firstSubmit').click();
         $('#myCanvas').click();
    }
});


writingFirst = function(){

text = $("#firstInput").val();
	var text = new PointText({
		point: [(win_x/4), (win_y/2)],
	    content: text,
	    fillColor: 'black',
	    fontFamily: "'Comfortaa', Helvetica, sans-serif",
	    fontWeight: 'bold',
	    fontSize: (win_x/10)
	});
		$('#firstInput').val("");
};

//Canvas post to Facebook

if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
        var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
    };
};

var authToken;
function postImageToFacebook( authToken, filename, mimeType, imageData, message ){
    // this is the multipart/form-data boundary we'll use
    var boundary = '----ThisIsTheBoundary1234567890';
    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n'
    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for ( var i = 0; i < imageData.length; ++i )
    {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
    formData += message + '\r\n'
    formData += '--' + boundary + '--\r\n';

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
    xhr.onload = xhr.onerror = function() {
        console.log( xhr.responseText );
    };
    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
    xhr.sendAsBinary( formData );
};

//call this function with button to Share canvas
function postCanvasToFacebook() {
	var canvas = document.getElementById("myCanvas");
	var data = canvas.toDataURL("image/png");
	var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
	var decodedPng = Base64Binary.decode(encodedPng);
  console.log("postCanvasToFacebook has been clicked and should be initiated");

  FB.getLoginStatus(function(response) {
    console.log("Facebook get Login Status initiated");
    console.log("response: " + response);
	  if (response.status === "connected") {
      console.log("Status is connected");
		postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
	  } else if (response.status === "not_authorized") {
      console.log("Status is not authorized");
		 FB.login(function(response) {
			postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
		 }, {scope: "publish_stream"});
	  } else {
      console.log("else happened");
		 FB.login(function(response)  {
			postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
		 }, {scope: "publish_stream"});
	  }
	 });
  FB.getLoginStatus();

}


displayImage = function(){

var canvas = document.getElementById('myCanvas');
var data = canvas.toDataURL("image/png");
console.log(data);




// localStorage.setItem("imageUrl", decodedPng);


var image = document.getElementById('result');
$(image).attr("src", data);


$('#resultModal').modal('show');

// localStorage.setItem("imgData", data);
// window.location.href=image; // it will save locally
};






