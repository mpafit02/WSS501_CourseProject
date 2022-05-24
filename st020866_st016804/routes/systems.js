var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/listSystems", function (req, res) {
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");
    dbo
      .collection("systems")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result));
        db.close();
      });
  });
});

module.exports = router;
