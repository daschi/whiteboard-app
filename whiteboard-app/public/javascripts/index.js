$(document).ready(function() {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var $canvas = $("#canvas");

	$canvas.mousedown(function(event) {
		var mouseX = event.pageX - this.offsetLeft;
		var mouseY = event.pageY - this.offsetTop;

		paint = true;
		addClick(mouseX, mouseY);
		redraw()
	})

	$canvas.mousemove(function(event) {
		if(paint) {
			addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
			redraw();
		}
	});

	$canvas.mouseup(function(event) {
		paint = false;
	});

	$canvas.mouseleave(function(event) {
		paint = false
	})

	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

	function addClick(x, y, dragging) {
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
	}

	function redraw() {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.strokeStyle = "#df4b26";
		ctx.lineJoin = "round";
		ctx.lineWidth = 5;

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