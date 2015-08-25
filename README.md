# Simple Whiteboard + Chat
Simple Whiteboard + Chat is an app I made to learn about new technologies:
 - Node.js Server
 - Express.js for web framework
 - Socket.io for websockets
 - HTML5 Canvas & Jquery for the whiteboard

I chose to pursue these technologies because I'm interested in collaborative web spaces for teaching and learning foreign languages. Online language classes are much cooler when you can write, draw, play and listen to videos, and chat together at the same time. I want to learn how these technologies work so that I'm better prepared to enter the field of real-time collaborative web services.

The project holds a whiteboard with various colors and line widths that multiple people can draw on from different browsers. It also includes a chatbox below the canvas. I am experimenting with learning how to sync video play across sockets, so there is also another branch 'sync-video' that includes the code I'm trying to work with to sync the video. It is still in progress. 

Below are some snippets of what I learned during this process. 

# Node.js

Node Modules: Modules are node libraries you can include in your package.json file as a dependency and then require in your server javascript file. The package.json file is where you list your dependencies, you can use npm install to install dependencies for the app. Node comes with modules automatically, like the http module. However, you still need to require it in your app file. 

Using the --save option installs the module and saves it to your package.json file. 
```
npm install --save express-generator
```
Require the http module to set up the server and respond with Hello World:
```
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');
```
# Express.js and the Express Generator
I used the Express generator node module to set up my web framework. The generator provides many of the files and structure you need to get started quickly. It will start you off with two server-side JS files: bin/www and app.js. I'm still learning the difference between the two, and I think the www file is more concerned with setting up and configuring the server, while the app.js file is concerned with setting up the application's environment. To use express-generator, make sure you have express installed and use npm to install it. Then, you can use the express command to create your new app. 
```
npm install express-generator -g
express myNewApp
```
The Express application generator automatically sets your view engine as Jade. For this learning exercise, I decided to use ejs (embedded javascript) instead, so I actually ran this command to create my new app:
```
express --ejs myNewApp
```

The express application file structure looks like this:
```
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    ├── index.ejs
    └── layout.ejs
```

# Socket.io
WOW, sockets are so cool! By far I spent the most time researching and reading about websockets. I'd like to learn more about the different options you could implement, since for now I've just done some simple emitting and listening. Here's some introductory code to get anyone started on Socket.io:

The following is assuming that you've created a variable 'server' using the http module and specified a port to listen on.
### SERVER SIDE: In your bin/www file (or whichever is your server-side JS file):
```
var io = require('socket.io').listen(server.listen(port));

io.sockets.on("connection", function (socket) {
  
  socket.on('draw', function (data) {
    // Data is sent in as: {x: data.x, y: data.y, etc. }
    io.emit('draw', data);
  });
})
```
```io.sockets.on``` sets up the initial connection when a new user connects to the server. The server is listening for 'draw' messages (or emits) from the client. When it hears a 'draw' emit, it will invoke a callback function that takes as a parameter the data sent along with the 'draw' message from the client. Then, the websocket server (io) will emit the same 'draw' message back to the other clients listening on the server with the new data it received. 
### CLIENT SIDE: In your public/javascripts/index.js file
Set up the socket connection on the client side:
```
var socket = io.connect('http://localhost:3000');
socket.on('draw', function (data) {
	draw(data);
});
```
The client is listening for 'draw' messages and a data object from the server. When the message and object are received, it will pass the data to the draw(); function that is defined within the client-side JS file (index.js). 

The following variables are set via an event listener on Canvas for mousedown events, so when the user is drawing on the whiteboard, it captures the x/y coordinates (not shown here). 
```
socket.emit('draw', { x: currentX, y: currentY, prevX: prevX, prevY: prevY, strokeStyle: strokeStyle, lineWidth: lineWidth });
```
socket.emit occurs within the mousedown eventlistener on the canvas. On mousedown, the socket emits the data and the message 'draw' to the server, which then receives it and broadcasts it to everyone else listening for 'draw'. Everyone else who is listening will receive the data (the x/y coordinates, strokeStyle and lineWidth) and invoke the draw(data); function with the new information from the server. IN REAL TIME. 
	
# Future Implementations
 - Synced video play
 - Implementing this feature within my sound & script language app
 - Personal video/voice sharing

# Contribute
If you'd like to contribute to the whiteboard + chat portion, clone the repo from master and submit a pull request. 
If you'd like to contribute to syncing the video-play, clone the video-play branch and submit a pull request to that branch.

# Running the Application
To run the application locally, clone the repo to your local machine. 
While you're inside Desktop/whiteboard-app directory, type the following in your command line:
'''
npm install
node bin/www
'''
This will launch the server to listen on port 3000, so you can use the app when you navigate to http://localhost:3000. 
