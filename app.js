require('dotenv').load();
var express = require('express');
var Note = require('./models/note');
var User = require('./models/user');
var bodyParser = require('body-parser');
var noteRoutes = require('./routes/note-routes');
var userRoutes = require('./routes/user-routes');
var sessionRoutes = require('./routes/session-routes');
var headersMiddleware = require('./middleware/headers');
var app = express();

// Middleware
app.use(headersMiddleware);

// Body parsing for JSON POST/PUT payloads
app.use(bodyParser.json());
//Routes
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/session', sessionRoutes);


app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
