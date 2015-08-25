<<<<<<< HEAD
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: String,
  email: String,
},
{collection: 'user'}
);

mongoose.model('users', usersSchema);
=======
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var usersSchema = new Schema({
//   name: String,
//   email: String,
// },
// {collection: 'user'}
// );

// mongoose.model('users', usersSchema);
>>>>>>> c9b2945d2d921bf54e332995d61bd4d3753a7f3d
