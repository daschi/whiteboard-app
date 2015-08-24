var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: String,
  email: String,
},
{collection: 'user'}
);

mongoose.model('users', usersSchema);
