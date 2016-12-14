const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const session = require('express-session');

app.use(express.static(path.join(__dirname, '/front/bundle')));

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('9999', () => console.log('Listening on port 9999'));


//////////
// YOUR CODE HERE:
//////////
app.use(session({
  secret: 'the maze is not for you',
  resave: true,
  saveUninitialized: true
}));

app.use('/login', require('./moreroute'));
app.use('/auth', require('./auth-route'));
app.use('/api', require('./api-routes'));

//will make your express server send back your React frontend app (which is loaded when you send index.html) whenever anyone navigates to any URL that's not caught by your API.

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
});

// /api/artists GET all artists, ordered a-z
// /api/artists/:id GET a specific artist by id
// /api/artists/ POST (create) a new artist
// /api/artists/:id DELETE an artist by id
// /api/artists/:id/:newName PUT (update) a specific artist's name
