var db = require('../config/db');
var userSchema = require('./userSchema');

module.exports = db.model('User', userSchema);
