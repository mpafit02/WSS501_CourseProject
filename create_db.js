// create a MongoDB client app in JS
var MongoClient = require('mongodb').MongoClient;
// url path of the database
var url = "mongodb://localhost:27017/wss551";

// Create a connection to the database
MongoClient.connect(url, function(err, db) {
	
	// if the connection is successful the library DB
	// is created - based on the url above
	if (err) throw err;
	console.log("Database created!");
	
	// we create a database object
	var dbo = db.db("wss551");

	// get access to DB 
	
	// Users
	// create the "users" collection/table, collection is the same as table in SQL databases
	dbo.createCollection("users", function(err, res) {
		if (err) throw err;
		console.log("Collection users created!");
	});

	// create an array of json objects/users with key value pairs
	var myusers = [
		{ "id": 1 , "first_name" : "Marios","last_name" : "Pafitis", "password" : "1234", "account_type" : "student", "quizes":[{"id": 1, "grade": 80, "answers":[{id:1, answer:"first answer of user"}]}], lectures:[]},
		{ "id": 2 , "first_name" : "Vasileios", "last_name" : "Samaras", "password" : "5678", "account_type" : "teacher", "quizes":[], lectures:[]}
	];

	// insert the array of objects/users in the users collection
	// we have to create the users collection from before
	dbo.collection("users").insertMany(myusers, function(err, res) { 
		if (err) throw err;
		console.log("Number of documents inserted in users: " + res.insertedCount);
		db.close();
	});
	// Quizes
	// create the "quizes" collection/table, collection is the same as table in SQL databases
	dbo.createCollection("quizes", function(err, res) {
		if (err) throw err;
		console.log("Collection users created!");
	});
	
	// create an array of json objects/quizes with key value pairs
	var myquizes = [
		{ "id": 1 , "subject" : "Differential", "exercises":[{"question": "first question", "answer": "first answer"}, {"question": "second question", "answer": "second answer"}]}
	];

	// insert the array of objects/quizes in the quizes collection
	// we have to create the quizes collection from before
	dbo.collection("quizes").insertMany(myquizes, function(err, res) { 
		if (err) throw err;
		console.log("Number of documents inserted in quizes: " + res.insertedCount);
		db.close();
	});
	
	// Lectures
	// create the "lectures" collection/table, collection is the same as table in SQL databases
	dbo.createCollection("lectures", function(err, res) {
		if (err) throw err;
		console.log("Collection users created!");
	});
	
	// create an array of json objects/lectures with key value pairs
	var mylectures = [
		{ "id": 1 , "subject" : "Differential", "description": "The differential is a system of the car.", "exercises":[{"img_path": "images/differential/img_0.jpg", "label": "component1"}]}
	];

	// insert the array of objects/lectures in the lectures collection
	// we have to create the lectures collection from before
	dbo.collection("lectures").insertMany(mylectures, function(err, res) { 
		if (err) throw err;
		console.log("Number of documents inserted in lectures: " + res.insertedCount);
		db.close();
	});
});
