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
	
// Set username -- Need to fix this
	var username;
	$('form.username').submit(function() {
		username = $('#name').val();
		$(this).hide();
	})

// Send chat messages
	$('form.send-chat').submit(function() {
		var message = { 
			name: username, 
			text: $('#message').val()
		}

		socket.emit('chat message', message);
		$('#message').val('');
		return false;
	});

// Listen for chat messages
	socket.on('chat message', function(message) {
		$('#chatbox').append("<p>" + message.name + ": " + message.text + "</p>");
	});

// Set video element to variable and attempt to emit it - Need to fix this
	var video = document.getElementById('video-id')

	$('video').on('timeupdate', function(event){
		if (!video.ended){
			for (var i = 0; i <= this.duration; i++){
				socket.emit('timeupdate', (this.currentTime));
				console.log("EMIT client video, current time is: " + this.currentTime);
				this.currentTime += i
			}
		}
	});

	socket.on('timeupdate', function (time){
		video.currentTime = time 
		console.log("socket ON client video, current time is: " + time);
	});

}); // end document ready


