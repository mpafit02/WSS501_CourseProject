var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// registration
router.post("/register", function (req, res) {
  console.log("account_type: " + req.body.account_type);
  console.log("email: " + req.body.email);
  console.log("password: " + req.body.password);
  console.log("name: " + req.body.first_name);
  console.log("surname: " + req.body.last_name);

  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");

    var query = {};

    var key = "account_type";
    var value = req.body.account_type;
    console.log("key" + key);
    console.log("value" + value);
    query[key] = value;

    var key = "email";
    var value = req.body.email;
    console.log("key" + key);
    console.log("value" + value);
    query[key] = value;

    var key = "password";
    var value = req.body.password;
    console.log("key" + key);
    console.log("value" + value);
    query[key] = value;

    var key = "first_name";
    var value = req.body.first_name;
    console.log("key" + key);
    console.log("value" + value);
    query[key] = value;

    var key = "last_name";
    var value = req.body.last_name;
    console.log("key" + key);
    console.log("value" + value);
    query[key] = value;

    console.log("Query: " + JSON.stringify(query));

    dbo.collection("users").insertOne(query, function (err, data) {
      if (err) throw err;
      console.log(data);
      if (!data) {
        console.log("User Not Registered!");
        // send the results back to the client for display
        res.end(false);
        db.close();
      } else {
        console.log("User Registered!");
        res.end(JSON.stringify(data)); // send the results back to the client for display
        db.close();
      }
    });
  });
  // next(); // pass control to the next handler
});

module.exports = router;
