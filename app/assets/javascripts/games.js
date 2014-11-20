

// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:
tool.minDistance = 10;

var path;
var height = $(document).height();
var width = $(document).width();
var coord = $("#myCanvas").position();
var top = coord.top;
var left = coord.left;


var color = '#00000';
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
$( "#eraser" ).toggle(function() {
	$(this).html('Draw');
  	color = '#fffff'; 

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


$(window).resize(function(){
	height = $(document).height(); // returns height of HTML document
	width = $(document).width(); // returns width of HTML document
	coord = $("#myCanvas").position();
	top = coord.top;
	left = coord.left;
	console.log(height);
	console.log(width);
	console.log(top, left);
});

$('#clear').click(function(){
var topLeft = new Point(left, top);
var rectSize = new Size(width, height);
var rect = new Path.Rectangle(topLeft, rectSize);
rect.fillColor = '#fffff';
console.log(rect); // { x: 10, y: 20, width: 200, height: 100 }
console.log(rect.point); // { x: 10, y: 20 }
console.log(rect.size); 
});






