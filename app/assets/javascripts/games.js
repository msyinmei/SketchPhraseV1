// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:
tool.minDistance = 10;

var path;

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


// Click listeners for stoke width buttons 
$('#small').click(function(){
	width = 1;
});

$('#medium').click(function(){
	width = 5;
});

$('#large').click(function(){
	width = 15;
});