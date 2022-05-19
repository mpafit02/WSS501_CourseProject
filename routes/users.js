var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log("Time: ", Date());
//   // next() // pass control to the next handler
// });

// /* GET users listing. */
// router.get("/users", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";

//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     dbo
//       .collection("users")
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.end(JSON.stringify(result));
//         db.close();
//       });
//   });
//   // next() // pass control to the next handler
// });

// router.post("/addUser", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     // You can accept the same input in the form of JSON using Ajax call
//     // but for demonstration purpose, we are hard-coding it here.
//     let user = {
//       first_name: "mohit",
//       last_name: "kmuojahedin",
//       email: "kmouj@india.edu.in",
//       password: "password4",
//       account_type: "teacher",
//       id: 3,
//     };
//     dbo.collection("users").insertOne(user, function (err, data) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       res.end(JSON.stringify(data));
//       // send the results back to the client for display
//       db.close();
//     });
//   });
//   // next() // pass control to the next handler
// });

// router.get("/getUser/:id", function (req, res) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     var key = "id";
//     var value = parseInt(req.params.id);
//     var query = {};
//     query[key] = value;
//     dbo
//       .collection("users")
//       .find(query)
//       .toArray(function (err, data) {
//         if (err) throw err;
//         console.log(data);
//         res.end(JSON.stringify(data));
//         db.close();
//       });
//   });
// });

// router.delete("/deleteUser/:id", function (req, res, next) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     var query = { id: 3 };
//     dbo.collection("users").deleteOne(query, function (err, data) {
//       if (err) throw err;
//       console.log("1 document deleted");
//       res.end(JSON.stringify(data)); // send results back to client for display
//       db.close();
//     });
//   });
//   // next() // pass control to the next handler
// });

// router.get("/listUsers", function (req, res) {
//   var MongoClient = mongodb.MongoClient;
//   var url = "mongodb://localhost:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("wss551");
//     dbo
//       .collection("users")
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.end(JSON.stringify(result));
//         db.close();
//       });
//   });
// });

router.get("/updateProgress/:id", function (req, res) {
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("wss551");
    var key = "email";
    var value = req.params.id;
    var query = {};
    query[key] = value;

    dbo.collection("users").findOne(query, function (err, data) {
      if (err) throw err;
      console.log(data);
      if (!data) {
        console.log("User not found in update progress!");
        // send the results back to the client for display
        res.end(false);
        db.close();
      } else {
        console.log("User found in update progress!");
        // send the results back to the client for display
        res.end(JSON.stringify(data));
        db.close();
      }
    });
  });
});

module.exports = router;
