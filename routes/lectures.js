var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET lectures listing. */
router.get("/listLectures", function (req, res, next) {
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");
    dbo
      .collection("lectures")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result));
        db.close();
      });
  });
});

router.post("/addLecture", function (req, res, next) {
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");
    // You can accept the same input in the form of JSON using Ajax call
    // but for demonstration purpose, we are hard-coding it here.
    var lecture = {
      subject: "other",
      description: "Another system of the car.",
      account_type: "teacher",
      id: 2,
    };
    dbo.collection("lectures").insertOne(lecture, function (err, data) {
      if (err) throw err;
      console.log("1 document inserted");
      res.end(JSON.stringify(data));
      // send the results back to the client for display db.close();
    });
  });
});

router.delete("/deleteLecture/:id", function (req, res, next) {
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");
    var query = { id: 2 };
    dbo.collection("lectures").deleteOne(lecture, function (err, data) {
      if (err) throw err;
      console.log("1 document deleted");
      res.end(JSON.stringify(data)); // send results back to client for display
      db.close();
    });
  });
});

router.get("/getLecture/:id", function (req, res) {
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");
    var key = "id";
    var value = parseInt(req.params.id);
    var query = {};
    query[key] = value;
    console.log(query);
    dbo
      .collection("lectures")
      .find(query)
      .toArray(function (err, data) {
        if (err) throw err;
        console.log(data);
        res.end(JSON.stringify(data));
        db.close();
      });
  });
});

module.exports = router;
