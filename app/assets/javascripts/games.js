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



// takes cordinates of top left corner and calculates it again when the widow
// scrolled down
$(window).load(function(){
	paper.install(window);
	paper.setup("myCanvas");
	coord = $("#myCanvas").position();
	top = $(window).scrollTop();
	left = coord.left;

	
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
	 $('#myModal').modal('show');


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
	paper.view.draw();
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
	var userInput = $("#myInput").val();
	var inputLength = $("#myInput").val().length;
	var size = (inputLength * 1.7);
	coord = $("#myCanvas").position();

	if (inputLength <= 9){
		var text = new PointText({
		    point: [(win_x/2), newScrollPos+(win_y/2)],
		    content: userInput,
		    fillColor: 'black',
		    fontFamily: "'Comfortaa', Helvetica, sans-serif",
		    fontWeight: 'bold',
		    fontSize: (win_x/size),
		    justification: 'center'
		});
			paper.view.draw();
			$('#myInput').val("");
			
		} else {
		var text = new PointText({
		point: [(win_x/24), (win_y/2)],
	    content: userInput,
	    fillColor: 'black',
	    fontFamily: "'Comfortaa', Helvetica, sans-serif",
	    fontWeight: 'bold',
	    fontSize: (win_x/26)

	});
		paper.view.draw();
		$('#myInput').val("");
		
	}

};

// text input for first modal 
writingFirst = function(){

	var userInput = $("#firstInput").val();

	var inputLength = $("#firstInput").val().length;

	var size = (inputLength * 1.7);

	if (inputLength <= 9){
	var text = new PointText({
		point: [(win_x/2), (win_y/1.5)],
	    content: userInput,
	    fillColor: 'black',
	    fontFamily: "'Comfortaa', Helvetica, sans-serif",
	    fontWeight: 'bold',
	    fontSize: (win_x/size),
	    justification: 'center'
		});
		paper.view.draw();
	} else {
		var text = new PointText({
		point: [(win_x/24), (win_y/2)],
	    content: userInput,
	    fillColor: 'black',
	    fontFamily: "'Comfortaa', Helvetica, sans-serif",
	    fontWeight: 'bold',
	    fontSize: (win_x/26)

	});
	paper.view.draw();
	}
};


// adds click listener to enter button
$('#submit').click(function() {
	var inputLength = $("#myInput").val().length;
	if (inputLength >= 3){
		writing();
    	scrolldown();
 		$('#textModal').modal('hide');
	}


});

$('#myInput').on('keyup', function(e) {
    if (e.keyCode === 13) {
        $('#submit').click();
		
    }
});

$('#firstSubmit').click(function() {
	var inputLength = $("#firstInput").val().length;
	if (inputLength >= 3 ){
    writingFirst();
    $('#myModal').modal('hide');

     }
});

$('#firstInput').on('keyup', function(e) {
    if (e.keyCode === 13) {
        $('#firstSubmit').click();
       
    }
});


//Canvas post to Facebook


//if browser is Chrome or Webkit send Request to FB as Uint8Array

if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
        var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
    };
};

//function that posts the decoded base64 binary image string to facebook
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
      FB.login(function(response) {
      postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
     }, {scope: "publish_actions"});
	  } else if (response.status === "not_authorized") {
      console.log("Status is not authorized");
		 FB.login(function(response) {
			postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
		 }, {scope: "publish_actions"});
	  } else {
      console.log("else happened");
		 FB.login(function(response)  {
			postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
		 }, {scope: "publish_actions"});
	  }
	 });
  FB.getLoginStatus();

}


displayImage = function(){

var canvas = document.getElementById('myCanvas');
var data = canvas.toDataURL("image/png");
console.log(data);

var image = document.getElementById('result');
$(image).attr("src", data);

$('#resultModal').modal('show');

};







