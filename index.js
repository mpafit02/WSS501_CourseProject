var express = require('express');
var app = express();
var fs = require("fs");
var __dirname = "./";

const axios = require('axios');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/listUsers', function (req, res) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("library2");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		res.end( JSON.stringify(result) );
			db.close();
		});
	});
})

// application -------------------------------------------
app.get('/', function(req, res) {
// load the single view file (angular will handle the page
// changes on the front-end)
res.sendFile('index.html', { root: __dirname });
});


app.post('/addUser', function (req, res) {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("library2");
	// You can accept the same input in the form of JSON using Ajax call
	// but for demonstration purpose, we are hard-coding it here.
	var user = { "name" : "mohit", "password" : "password4", "profession" :
	"teacher", "id": 4 }
	dbo.collection("users").insertOne(user, function(err, data) {
	if (err) throw err;
	console.log("1 document inserted"); res.end( JSON.stringify(data));
	// send the results back to the client for display db.close();
	});
	});
})

/* app.get('/get_external_api/users/:id', function (req, res) {
	console.log("okay");
	var key = req.params.id;
	var url = "https://jsonplaceholder.typicode.com/users/" + key;

	console.log("calling axios");
	axios
	  .get(url)
	  .then(res => {
		console.log(`statusCode: ${res.status}`);
		console.log("index.js data");
		console.log(res.data);
		return res.data;
	  })
	  .catch(error => {
		console.error(error);
	  });

}) */

app.get('/getUser/:id', function (req, res) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("library2");
	var key = "id";
	var value = parseInt(req.params.id);
	var query = { };
	query[key] = value;
	dbo.collection("users").find(query).toArray(function(err, data) {
	if (err) throw err;
	console.log(data);
	res.end( JSON.stringify(data));
	db.close();
	});
	});
})

app.delete('/deleteUser/:id', function (req, res) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("library2");
	var query = { id: 4 }; dbo.collection("users").deleteOne(query,
	function(err, data) {
	if (err) throw err;
	console.log("1 document deleted");
	res.end( JSON.stringify(data)); // send results back to client for display
	db.close();
	});
	});
})

app.post('/login', function (req, res) {
console.log("username: " + req.body.username);
console.log("password: " + req.body.password);
res.end( "DONE!");
})

// Gia na valume eikones
app.use(express.static('assets'))

// Prepei na bei sto telos
var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})
