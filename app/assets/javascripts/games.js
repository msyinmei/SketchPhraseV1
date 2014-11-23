// modal window appears between turns, on window load
// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:

var path;
var win_y = $(window).height();
var win_x = $(window).width();
var coord;
var top;
var left;
var players = 4;
paper.tool.minDistance = 10;

// takes cordinates of top left corner and calculates it again when the widow
// scrolled down
$(window).load(function(){
	coord = $("#myCanvas").position();
	top = $(window).scrollTop();
	left = coord.left;
	yo();
});



// calc window height and sets canvas to windwo height times players in game
(function() {
  	var big_height = (win_y * players);
  	$('#myCanvas').attr("height", big_height);
  	$('#myCanvas').height(big_height);
  	$('#myCanvas').attr("width", win_x);
  	$('#myCanvas').width(win_x);

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

scrollPage = function(){
	// only scrolls the page based on the number of players 
	if (clicks < (players - 1)) {
		document.getElementById('done').value = ++clicks;
		 allowScrolling = true;
	    var currentHeight = $(document).scrollTop();
	    var newScrollPos = currentHeight + win_y;
	    console.log(clicks);
	    // scrolls the page 
	    $('body').animate({scrollTop: newScrollPos}, 800).promise().done(function(){
	    	noscroll();
	    	// if number of clicks is an even number then player write
	    	// pops up modal that tells the player to wrtie
	    	if (clicks % 2 === 0){
	    		$('#textModal h1').text('Player: ' + (clicks + 1) + " write!");
			    $('#textModal').modal('show');
			    console.log("This is player" + (clicks + 1) );      
			    
	    	// writing();
	    	}
	    	// if number of clicks is an odd number then player draws
	    	// pops up modal that tells the player to write 
	    	else if (clicks % 2 !== 0){
	    		$('#drawingModal h1').text('Player: ' + (clicks + 1) + " draw!");
	    		$('#drawingModal').modal('show'); 
	    		console.log("This is player" + (clicks + 1) ); 
	    	}
	    });
	}
	// alerts when game is done(needs to be changed to a modal)
	else if (clicks === (players - 1)){
		alert("This game is done!!");
	}
};

// disables scrolling 
noscroll = function(){
	scrollTopPos = $(window).scrollTop();
    allowScrolling = false;
};



// writes text on the canvas using prompt(needs to be changed to input modal)
writing = function(){
text = prompt("Write here!!");
coord = $("#myCanvas").position();

var currentHeight = $(document).scrollTop();
console.log(currentHeight);
	var text = new PointText({
	    point: [(win_x/4), currentHeight+(win_y/2)],
	    content: text,
	    fillColor: 'black',
	    fontFamily: 'Courier New',
	    fontWeight: 'bold',
	    fontSize: (win_x/10)
	});
};

// adds text the beginning of canvas 
var text = new PointText({
    point: [(win_x/4), (win_y/2)],
    content: 'Whaaaaa',
    fillColor: 'black',
    fontFamily: "'Comfortaa', Helvetica, sans-serif",
    fontWeight: 'bold',
    fontSize: (win_x/10)
});

//Canvas post to Facebook
function postCanvasToFacebook() {
	var canvas = document.getElementById("myCanvas")
	var data = canvas.toDataURL("image/png");
	var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
	var decodedPng = Base64Binary.decode(encodedPng);
	
	FB.getLoginStatus(function(response) {
	  if (response.status === "connected") {	
		postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
	  } else if (response.status === "not_authorized") {
		 FB.login(function(response) {
			postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
		 }, {scope: "publish_stream"});
	  } else {
		 FB.login(function(response)  { 
			postImageToFacebook(response.authResponse.accessToken, "SketchPhrase", "image/png", decodedPng, "SketchPhrase game results");
		 }, {scope: "publish_stream"});
	  }
	 }); 

};


otherImage = function(){


	var canvas = document.getElementById('myCanvas');
	var data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
var height = canvas.height;
var width = canvas.width;


var back = document.getElementById('background');
// $(back).attr(height);
$(back).height(height);
$(back).attr(width);
$(back).width(width);
$(back).zIndex(0);
$(back).css("background-color", "white");

var blah= document.getElementById('result');
$(blah).attr("src", data);
$(blah).zIndex(100);

$('#resultModal').modal('show');

// localStorage.setItem("imgData", data);

// window.location.href=image; // it will save locally
};



