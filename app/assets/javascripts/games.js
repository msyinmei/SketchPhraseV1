

// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:
// tool.minDistance = 10;

var path;
var win_y = $(window).height();
var win_x = $(window).width();
var coord;
var top;
var left;

$(window).load(function(){
	coord = $("#myCanvas").position();
	console.log(coord);
	top = $(window).scrollTop();
	left = coord.left;
});


(function() {
	console.log("THIS IS WIN Y");
  	var big_height = (win_y * 5);
  	$('#myCanvas').attr("height", big_height);
  	$('#myCanvas').height(big_height);
  	$('#myCanvas').attr("width", win_x);
  	$('#myCanvas').width(win_x);

})();

var color ;
var width ;

function onMouseDown(event) {
	// Create a new path and select it:
	path = new Path();
	path.strokeColor = 'black';
	path.strokeWidth = 5;

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
$( "#eraser" ).toggle(function() {
	$(this).html('Draw');
  	color = '#fffff'; 
  	console.log("WHITE");

  	}, function(){

  		$(this).html('Erase');
  		color = '#00000'; 
});


// Click listeners for stroke width buttons 
$('#small').click(function(){
	width = 1;
});

$('#medium').click(function(){
	width = 5;
});

$('#large').click(function(){
	width = 15;
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

nextTurn = function() {
	top = $(window).scrollTop();
	var topLeft = new paper.Point(0, top); //creates the top left corner of rectangle
	var rectSize = new paper.Size(win_x, win_y); 
	var rect = new paper.Path.Rectangle(topLeft, rectSize);
	rect.fillColor = '#FBC6FF';
	console.log(topLeft);
	console.log(rect); // { x: 10, y: 20, width: 200, height: 100 }
	console.log(rect.point); // { x: 10, y: 20 }
	console.log(rect.size);
	console.log("Doing");
};

$('#clear').click(function() {
	$.when(nextTurn()).done(function(){
		
		console.log("Done!");
	});
});






