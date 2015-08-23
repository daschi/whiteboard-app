$(document).ready(function() {
	// Capture the DOM elements
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var $canvas = $("#canvas");

	// Set the client-side connection 
	var socket = io.connect('http://localhost:3000');
	
	// Listen for draw messages
	socket.on('draw', function (data) {
		addClick(data.x, data.y, data.type)
		return redraw();
	});


// On mousedown: Save X/Y and send to the addClick function. Set paint to true and call redraw();
$canvas.mousedown(function(event) {
	paint = true;

	var x = event.pageX - this.offsetLeft;
	var y = event.pageY - this.offsetTop;

	addClick(x, y);
	redraw()
});

// On mousemove: Draw & emit the draw to the server which is listening on mousemove. Server will broadcast to all listeners of draw.
$canvas.mousemove(function(event) {
	var type = event.handleObj.type; // mouseover
	var x = event.pageX - this.offsetLeft;
	var y = event.pageY - this.offsetTop;

	if(paint) {
		addClick(x, y, true);
		redraw();

		socket.emit('mousemove', {
			x: x,
			y: y,
			type: type
		});
	}
});

// On mouse up or leave, set paint to false
$canvas.mouseup(function(event) {
	paint = false;
});

$canvas.mouseleave(function(event) {
	paint = false
})

// Collect the x/y positions, define paint
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

// Push x/y to arrays and value of paint to clickDrag array
function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}

// 1. Clear the canvas from top to bottom
// 2. Set stroke style and line
// 3. For length of clickX array (includes mousemove)
// 4. Begin path 
// 5. if clickDrag is true
// 6. Iterate through the click array backwards to reset each new starting point
// 7. Else, move it back by 1, or essentially don't move at all. 
// 8. Draw line from original x/y coordinates to the new points of the path and close path

function redraw() {

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.strokeStyle = "#df4b26";
	ctx.lineJoin = "round";
	ctx.lineWidth = 10;

	for(var i = 0; i < clickX.length; i++) {
		ctx.beginPath();
		if (clickDrag[i] && i) {
			ctx.moveTo(clickX[i-1], clickY[i-1]);
		}
		else {
			ctx.moveTo(clickX[i]-1, clickY[i]);
		}
		ctx.lineTo(clickX[i], clickY[i]);
		ctx.closePath();
		ctx.stroke();
	}
}
});