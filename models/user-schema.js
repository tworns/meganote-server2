var db = require('../config/db');
var bcrypt = require('bcryptjs');
var noteSchema = require('./note-schema');
var beautifyUnique = require('mongoose-beautiful-unique-validation');
var userSchema = db.Schema({
  name: {
    requried: [true, 'Cannot have blank name.'],
    type: String,
  },

  username: {
    type:String,
    required: [true, 'Must have a username.'],
    unique: 'Username is already in use.'},
    passwordDigest:{
      type: String,
      required: [true, 'Password cannot be blank.'],

    },
    updated_at: { type: Date, default: Date.now },
    notes: [noteSchema],
});
userSchema.plugin(beautifyUnique);

userSchema.pre('save', function(next){
  this.updated_at = Date.now();
  next();
});

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.passwordDigest;
  delete user.__v;
  return user;
};
userSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.passwordDigest, function(err, isMatch){
    callback(isMatch);
  });
};
module.exports = userSchema;
