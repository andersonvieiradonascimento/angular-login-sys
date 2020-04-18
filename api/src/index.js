var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app  = express();
var port = 3000;
var db = require('./queries');

require('dotenv').config();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cors());

app.get('/', (request, response) => {
	response.json({info : 'Node.js, Express, and Postgres API'});
});

// GET
app.get('/users', db.getUsers);
app.get('/users/:content', db.getUserByEmailOrNickname);

// POST
app.post('/users', db.createUser);
app.post('/auth/login', db.authLogin);

// PUT
app.put('/users/:id', db.updateUser);

// DELETE
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
	console.log(`App running on port ${process.env.PORT}!`);
});
