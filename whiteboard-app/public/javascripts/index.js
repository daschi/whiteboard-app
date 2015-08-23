$(document).ready(function() {

	// Capture the canvas element
	var canvas = document.getElementById("canvas");
	// Set it to a canvas object
	var ctx = canvas.getContext("2d");
	// Set a jquery object of the canvas element
	var $canvas = $("#canvas");

// On mouse down, save the click coordinates relative to the canvas's edges and send them to the addClick function. Set paint to true and call redraw();
	$canvas.mousedown(function(event) {
		var mouseX = event.pageX - this.offsetLeft;
		var mouseY = event.pageY - this.offsetTop;

		paint = true;
		addClick(mouseX, mouseY);
		redraw()
	})

	$canvas.mousedown(function(event) {
		// do socket.io stuff
	})

// If paint is true and the mouse is moving, send the x/y coordinates to addClick and call redraw() again.
	$canvas.mousemove(function(event) {
		if(paint) {
			addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
			redraw();

		}
	});

// On mouse up or leave, set paint to false
	$canvas.mouseup(function(event) {
		paint = false;
	});

	$canvas.mouseleave(function(event) {
		paint = false
	})

// Hold the x/y position values, define paint
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

// Push x/y coordinates to click arrays and value of paint to clickDrag array
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