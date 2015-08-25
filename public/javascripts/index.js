$(document).ready(function() {
// Capture the DOM elements
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var $canvas = $("#canvas");
	var strokeStyle = "black";
	var lineWidth = 10;
	var drawing;

// Set the client-side connection
	var socket = io.connect('http://localhost:3000');

// Listen for draw messages from server
	socket.on('draw', function (data) {
		console.log("on draw from the client")
		draw(data);
	});

// Begin draw
	$canvas.mousedown(function(event) {
		drawing = true;

		currentX = event.pageX - this.offsetLeft;
		currentY = event.pageY - this.offsetTop;

	});

// End draw
	$canvas.mouseup(function(event) {
		drawing = false;
	})

	$canvas.mouseleave(function(event) {
		drawing = false
	})

// Pick color and line width
	$(".color").on('click', function(event) {
		event.preventDefault();
		strokeStyle = $(this).css( "background-color" )
	})

	$(".line-width").on('click', function(event) {
		event.preventDefault();
		lineWidth = $(this).attr('id')
	})

// Set x/y coordinates and send data to server
	$canvas.mousemove(function(event){

		if (drawing) {
			prevX = currentX;
			prevY = currentY;
			currentX = event.pageX - this.offsetLeft;
			currentY = event.pageY - this.offsetTop;

			socket.emit('draw', {
					x: currentX,
					y: currentY,
					prevX: prevX,
					prevY: prevY,
					strokeStyle: strokeStyle,
					lineWidth: lineWidth,
			});
			console.log("from emit");
		}

	});

// Draw using the x/y coordinates
	function draw(data) {
		ctx.beginPath();
		ctx.strokeStyle = data.strokeStyle;
		ctx.lineJoin = "round";
		ctx.lineWidth = data.lineWidth;
		ctx.moveTo(data.prevX, data.prevY);
		ctx.lineTo(data.x, data.y);
		ctx.closePath();
		ctx.stroke();
	}

// Set username
	var username;
	$('form.username').submit(function(event) {
		event.preventDefault();
		name = $('#name').val();
		$(this).hide();

		// Emit that user has joined
		var user = {name: name}
		socket.emit('user joined', user);
	})

// Send chat messages
	$('form.send-chat').submit(function() {
		var message = {
			name: name,
			text: $('#message').val()
		}

		socket.emit('chat message', message);
		$('#message').val('');
		return false;
	});

	// Update chatbox to show user has joined
	socket.on('user joined', function(user) {
		$('#chatbox').append("<p>" + user.name + " has joined the chatroom</p>");
	})

// Listen for chat messages
	socket.on('chat message', function(message) {
		$('#chatbox').append("<p>" + message.name + ": " + message.text + "</p>");
	});

}); // end document ready


