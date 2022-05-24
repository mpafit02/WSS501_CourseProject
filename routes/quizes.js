var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// /* GET quizes listing. */
// router.get("/listQuizes", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     dbo
//       .collection("quizes")
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.end(JSON.stringify(result));
//         db.close();
//       });
//   });
//   next(); // pass control to the next handler
// });

// router.post("/addQuiz", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     // You can accept the same input in the form of JSON using Ajax call
//     // but for demonstration purpose, we are hard-coding it here.
//     var user = { subject: "Other quiz", account_type: "teacher", id: 2 };
//     dbo.collection("quizes").insertOne(quiz, function (err, data) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       res.end(JSON.stringify(data));
//       // send the results back to the client for display db.close();
//     });
//   });
//   next(); // pass control to the next handler
// });

// router.delete("/deleteQuiz/:id", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     var query = { id: 4 };
//     dbo.collection("quizes").deleteOne(query, function (err, data) {
//       if (err) throw err;
//       console.log("1 document deleted");
//       res.end(JSON.stringify(data)); // send results back to client for display
//       db.close();
//     });
//   });
//   next(); // pass control to the next handler
// });

router.get("/getQuiz/:id", function (req, res) {
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
      .collection("quizes")
      .find(query)
      .toArray(function (err, data) {
        if (err) throw err;
        console.log(data);
        res.end(JSON.stringify(data));
        db.close();
      });
  });
});

router.post("/completeQuiz", function (req, res) {
  console.log("quiz_id: " + req.body.quiz_id);
  console.log("model: " + req.body.model);
  console.log("email: " + req.body.email);
  console.log("score: " + req.body.score);

  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");
    // You can accept the same input in the form of JSON using Ajax call
    // but for demonstration purpose, we are hard-coding it here.

    var query = { email: req.body.email };
    var newvalues = {
      $push: {
        "systems_progress.quizes": {
          id: req.body.quiz_id,
          model: req.body.model,
          score: req.body.score,
        },
      },
    };
    dbo.collection("users").updateOne(query, newvalues, function (err, data) {
      if (err) throw err;
      if (!data) {
        console.log("Document failed to be updated!");
        // send the results back to the client for display
        res.end(JSON.stringify({ status: "error" }));
        db.close();
      } else {
        console.log("1 document updated");
        res.end(JSON.stringify(data)); // send results back to client for display
        db.close();
      }
    });
  });
});
module.exports = router;
