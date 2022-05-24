var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// /* GET lectures listing. */
// router.get("/listLectures", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     dbo
//       .collection("lectures")
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.end(JSON.stringify(result));
//         db.close();
//       });
//   });
// });

router.post(
  "/addLecture",
  function (req, res, next) {
    console.log("id: " + req.body.id);
    console.log("subject: " + req.body.subject);
    console.log("definition: " + req.body.definition);
    console.log("description: " + req.body.description);
    console.log("img_path: " + req.body.img_path);
    console.log("model_url: " + req.body.model_url);
    console.log("parts: " + req.body.parts);

    var MongoClient = mongodb.MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("wss551");
      // You can accept the same input in the form of JSON using Ajax call
      // but for demonstration purpose, we are hard-coding it here.
      var lecture = {
        id: req.body.id,
        subject: req.body.subject,
        definition: req.body.definition,
        descriptions: [req.body.description],
        img_path: req.body.img_path,
        model_url: req.body.model_url,
        parts: req.body.parts,
      };

      dbo.collection("lectures").insertOne(lecture, function (err, data) {
        if (err) throw err;
        console.log("1 document inserted in lectures");
        // send the results back to the client for display db.close();
      });
    });
    next();
  },
  function (req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("wss551");

      var system = {
        id: req.body.id,
        model: req.body.subject,
      };

      dbo.collection("systems").insertOne(system, function (err, data) {
        if (err) throw err;
        if (!data) {
          console.log("Document failed to be updated!");
          // send the results back to the client for display
          res.end(JSON.stringify({ status: "error" }));
          db.close();
        } else {
          console.log("1 document inserted in systems");
          res.end(JSON.stringify(data));
          db.close();
        }
      });
    });
  }
);

// router.delete("/deleteLecture/:id", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     var query = { id: 2 };
//     dbo.collection("lectures").deleteOne(lecture, function (err, data) {
//       if (err) throw err;
//       console.log("1 document deleted");
//       res.end(JSON.stringify(data)); // send results back to client for display
//       db.close();
//     });
//   });
// });

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

router.post("/completeLecture", function (req, res) {
  console.log("lecture_id: " + req.body.lecture_id);
  console.log("model: " + req.body.model);
  console.log("email: " + req.body.email);

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
        "systems_progress.lectures": {
          id: req.body.lecture_id,
          model: req.body.model,
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
