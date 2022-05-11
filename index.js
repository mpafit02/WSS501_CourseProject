/* Modules to be used */
const express = require('express'); // a minimal and flexible web application framework on top of Node.js web server
const app = express(); 				// enables interacting with the file system
const fs = require("fs"); 			// The Node.js file system module allows for work with the computer's file system
const bodyParser = require("body-parser");  // parses the JSON, buffer, string and URL encoded data submitted

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// request for users list
app.get('/listUsers', function (req, res) {
	const MongoClient = require('mongodb').MongoClient;
	const url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		const dbo = db.db("wss551");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		res.end( JSON.stringify(result) );
			db.close();
		});
	});
})

// application -------------------------------------------
app.get('/',  (req, res) => {
// load the single view file (angular will handle the page changes on the front-end)
	res.sendFile('index.html', { root: __dirname });
});


app.post('/addUser', function (req, res) {
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/";
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	const dbo = db.db("wss551");
	// You can accept the same input in the form of JSON using Ajax call
	// but for demonstration purpose, we are hard-coding it here.
	const user = { "name" : "mohit", "password" : "password4", "profession" :
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
	const key = req.params.id;
	const url = "https://jsonplaceholder.typicode.com/users/" + key;

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
	const MongoClient = require('mongodb').MongoClient;
	const url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	const dbo = db.db("wss551");
	const key = "id";
	const value = parseInt(req.params.id);
	const query = { };
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
	const MongoClient = require('mongodb').MongoClient;
	const url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	const dbo = db.db("wss551");
	const query = { id: 4 }; dbo.collection("users").deleteOne(query,
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



/* On Error */

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('File Not Found');
	err.status = 404;
	next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.message);
});

// Prepei na bei sto telos
const PORT = process.env.PORT || 8081;
app.listen(PORT, function () {
	console.log('Server is started on http://127.0.0.1:'+PORT);
});
/*

// Prepei na bei sto telos
const server = app.listen(8081, function () {
	const host = server.address().address
	const port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})
*/
