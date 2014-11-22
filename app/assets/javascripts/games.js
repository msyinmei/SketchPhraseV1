

// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:
// tool.minDistance = 10;

var path;
var win_y = $(window).height();
var win_x = $(window).width();
var coord;
var top;
var left;


// takes cordinates of top left corner and calculates it again when the widow
// scrolled down
$(window).load(function(){
	coord = $("#myCanvas").position();
	console.log(coord);
	top = $(window).scrollTop();
	left = coord.left;
});



// calc window height and sets canvas to windwo height times players in game
(function() {
	console.log("THIS IS WIN Y");
  	var big_height = (win_y * 5);
  	$('#myCanvas').attr("height", big_height);
  	$('#myCanvas').height(big_height);
  	$('#myCanvas').attr("width", win_x);
  	$('#myCanvas').width(win_x);

})();

var color = "#00000";
var width = 5;

function onMouseDown(event) {
	// Create a new path and select it:
	path = new Path();
	path.strokeColor = color;
	path.strokeWidth = width;

	// Add a segment to the path where
	// you clicked:
	path.add(event.point);
	console.log("mouse down");
}

function onMouseDrag(event) {
	// Every drag event, add a segment
	// to the path at the position of the mouse:
	path.add(event.point);
	console.log("adding color" + color);
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
	color = '#00000';
	$("*").removeClass('selected');
	$(this).addClass('selected');
});

$('#medium').click(function(){

	width = 5;
	color = '#00000';
	$("*").removeClass('selected');
	$(this).addClass('selected');
});

$('#large').click(function(){
	width = 15;
	color = '#00000';
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
	console.log(win_y);
	console.log(win_x);
	console.log(top, left);
});

// creates a white rectangle based on the window size to clear the shown canvas
nextTurn = function() {
	top = $(window).scrollTop();
	var topLeft = new paper.Point(0, top); //creates the top left corner of rectangle
	var rectSize = new paper.Size(win_x, win_y); 
	var rect = new paper.Path.Rectangle(topLeft, rectSize);
	rect.fillColor = '#fffff';
	console.log(topLeft);
	console.log(rect); // { x: 10, y: 20, width: 200, height: 100 }
	console.log(rect.point); // { x: 10, y: 20 }
	console.log(rect.size);
	console.log("Doing");
};

$('#clear').click(function() {
	// $(this).toggleClass("animate");
	$.when(nextTurn()).done(function(){
	
		console.log("Done!");

	});
});






var scrollTop;
var allowScrolling;





$(document).ready(function() {
	console.log("document is ready");
	scrollTopPos = $( document ).scrollTop();
    allowScrolling = false;
    
    $(window).scroll(function() {
    	console.log("evaluating scroll state")
        if(allowScrolling === false) {
             $( document ).scrollTop( scrollTopPos );
        }
    });
    
   
    
});
    
scrollPage = function(){
    allowScrolling = true;
    var currentHeight = $(document).scrollTop();
    var newScrollPos = currentHeight + win_y;
    $('body').animate({scrollTop: newScrollPos}, 800).promise().done(function(){
    	noscroll();
    });
};

noscroll = function(){
	scrollTopPos = $(window).scrollTop();
    allowScrolling = false;
};



