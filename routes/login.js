var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* user's credentials login handler */
router.post("/login", function (req, res) {
  console.log("email: " + req.body.email);
  console.log("password: " + req.body.password);

  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");

    var query = {
      email: req.body.email,
      password: req.body.password,
    };

    console.log("Query: " + JSON.stringify(query));

    dbo.collection("users").findOne(query, function (err, data) {
      if (err) throw err;
      console.log(data);
      if (!data) {
        console.log("User Not found!");
        // send the results back to the client for display
        res.end(false);
        db.close();
      } else {
        console.log("User found!");
        // send the results back to the client for display
        res.end(JSON.stringify(data));
        db.close();
      }
    });
  });
  /*  next() // pass control to the next handler*/
});

module.exports = router;
