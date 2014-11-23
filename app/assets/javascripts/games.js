// modal window appears between turns, on window load
// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:

var path;
var win_y = $(window).height();
var win_x = $(window).width();
var coord;
var top;
var left;
var players = 5;
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
	console.log("THIS IS WIN Y");
  	var big_height = (win_y * players);
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
	console.log("document is ready");
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
	if (clicks < (players - 1)) {
		document.getElementById('done').value = ++clicks;
		 allowScrolling = true;
	    var currentHeight = $(document).scrollTop();
	    var newScrollPos = currentHeight + win_y;
	    console.log(clicks);
	    $('body').animate({scrollTop: newScrollPos}, 800).promise().done(function(){
	    	noscroll();
	    	if (clicks % 2 === 0){
	    		console.log ("whaaaaaaaa");
	    		
	    		writing();
	    	}
	    });
	}
	else if (clicks === (players - 1)){
		alert("This game is done!!");
	}
};

noscroll = function(){
	scrollTopPos = $(window).scrollTop();
    allowScrolling = false;
};




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


var text = new PointText({
    point: [(win_x/4), (win_y/2)],
    content: 'whaaa',
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: (win_x/10)
});


// var timeoutID;

// function delayedAlert() {
//  window.setTimeout(newText(), 5000);
// }

// function newText() {
//   var text = new PointText({
//     point: [win_x, win_y],
//     content: clicks,
//     fillColor: 'black',
//     fontFamily: 'Courier New',
//     fontWeight: 'bold',
//     fontSize: 55
// 	});
// }

// delayedAlert();


// });
