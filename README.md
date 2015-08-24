# Simple Whiteboard + Chat
Simple Whiteboard + Chat is an app I made to learn new about new technologies:
 - Node.js Server
 - Express.js for web framework
 - Socket.io for websockets
 - HTML5 Canvas & Jquery for the whiteboard

I chose to pursue these technologies because I'm interested in collaborative web spaces for teaching and learning foreign languages. Online language classes are much cooler when you can write, draw, play and listen to videos, and chat together at the same time. I want to learn how these technologies work so that I'm better prepared to enter the field of real-time collaborative web services.

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

# Future Implementations
 - Synced video play
 - Implementing this feature within my sound & script language app
 - Personal video/voice sharing
