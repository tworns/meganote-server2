var db = require('../config/db');
var noteSchema = require("./noteSchema");

module.exports = db.model('Note', noteSchema);
