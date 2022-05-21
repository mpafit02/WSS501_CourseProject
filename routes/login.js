var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
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
    };

    console.log("Query: " + JSON.stringify(query));

    dbo.collection("users").findOne(query, function (err, data) {
      if (err) throw err;
      console.log("Data: " + data);
      if (!data) {
        console.log("User Not found!");
        console.log("Data are null");
        // send the results back to the client for display

        res.end(JSON.stringify({ status: "error" }));
        db.close();
      } else {
        console.log("login.js: User found! " + JSON.stringify(data));
        console.log(
          "Compare: " + req.body.password + " with: " + data.password
        );
        bcrypt.compare(
          req.body.password,
          data.password,
          function (err, result) {
            if (err) {
              console.log("Login Error");
              res.end(JSON.stringify({ status: "error" }));
              db.close();
            } else {
              console.log("Identified");
              // send the results back to the client for display
              res.end(JSON.stringify(data));
              db.close();
            }
          }
        );
      }
    });
  });
  /*  next() // pass control to the next handler*/
});

module.exports = router;
