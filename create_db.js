// create a MongoDB client app in JS
var MongoClient = require("mongodb").MongoClient;
// url path of the database
var url = "mongodb://localhost:27017/wss551";

// Create a connection to the database
MongoClient.connect(url, function (err, db) {
  // if the connection is successful the library DB
  // is created - based on the url above
  if (err) throw err;
  console.log("Database created!");

  // we create a database object
  var dbo = db.db("wss551");

  // get access to DB

  // Users
  // create the "users" collection/table, collection is the same as table in SQL databases
  dbo.createCollection("users", function (err, res) {
    if (err) throw err;
    console.log("Collection users created!");
  });

  // create an array of json objects/users with key value pairs
  var myusers = [
    {
      id: 1,
      email: "test_student@gmail.com",
      first_name: "Marios",
      last_name: "Pafitis",
      password: "this is the hashed password",
      account_type: "student",
      systems_progress: {
        quizes: [
          {
            id: 1,
            model: "Brake system",
            grade: 80,
            answers: [{ id: 1, answer: "first answer of user" }],
          },
          {
            id: 2,
            model: "Suspension system",
            grade: 90,
            answers: [{ id: 1, answer: "first answer of user" }],
          },
        ],
        lectures: [{ id: 1, model: "Brake system" }],
      },
    },
    {
      id: 2,
      email: "test_teacher@gmail.com",
      first_name: "Vasileios",
      last_name: "Samaras",
      password: "this is the hashed password",
      account_type: "teacher",
      systems_progress: { quizes: [], lectures: [] },
    },
  ];

  // insert the array of objects/users in the users collection
  // we have to create the users collection from before
  dbo.collection("users").insertMany(myusers, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted in users: " + res.insertedCount);
    db.close();
  });
  // Quizes
  // create the "quizes" collection/table, collection is the same as table in SQL databases
  dbo.createCollection("quizes", function (err, res) {
    if (err) throw err;
    console.log("Collection quizes created!");
  });

  // create an array of json objects/quizes with key value pairs
  var myquizes = [
    {
      id: 1,
      subject: "Brake system",
      instruction: "Drag and drop the components in the correct position.",
      exercises: [
        { question: "first question", answer: "first answer" },
        { question: "second question", answer: "second answer" },
      ],
    },
    {
      id: 2,
      subject: "Suspension system",
      instruction: "Drag and drop the components in the correct position.",
      exercises: [
        { question: "first question", answer: "first answer" },
        { question: "second question", answer: "second answer" },
        { question: "third question", answer: "third answer" },
      ],
    },
    {
      id: 3,
      subject: "Differential",
      instruction: "Drag and drop the components in the correct position.",
      exercises: [
        { question: "first question", answer: "first answer" },
        { question: "second question", answer: "second answer" },
      ],
    },
  ];

  // insert the array of objects/quizes in the quizes collection
  // we have to create the quizes collection from before
  dbo.collection("quizes").insertMany(myquizes, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted in quizes: " + res.insertedCount);
    db.close();
  });

  // Lectures
  // create the "lectures" collection/table, collection is the same as table in SQL databases
  dbo.createCollection("lectures", function (err, res) {
    if (err) throw err;
    console.log("Collection lectures created!");
  });

  // create an array of json objects/lectures with key value pairs
  var mylectures = [
    {
      id: 1,
      subject: "Brake system",
      definition:
        "The definition of the brake system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      descriptions: [
        "Some information about the brake system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "More information about the brake system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "And some more information about the brake system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "A lot more information about the brake system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ],
      img_path: "./images/brake_system/brake_system.jpg",
      parts: [
        {
          label: "A component of the brake system.",
          class: "brake1_btn",
        },
        {
          label: "Another component of the brake system.",
          class: "brake2_btn",
        },
      ],
      model_url:
        "https://sketchfab.com/models/5feda9dbf20a49cf9fd29d550e55e4b9/embed?utm_source=website&amp;utm_campaign=blocked_scripts_error",
    },
    {
      id: 2,
      subject: "Suspension system",
      definition:
        "The definition of the suspension system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      descriptions: [
        "Some information about the suspension system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "More information about the suspension system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "And some more information about the suspension system. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ],
      img_path: "./images/suspension_system/suspension_system.png",
      parts: [
        {
          label: "A component of the suspension system.",
          class: "susp1_btn",
        },
        {
          label: "Another component of the suspension system.",
          class: "susp2_btn",
        },
      ],
      model_url:
        "https://sketchfab.com/models/2f1d0812ba4d4cdda6701ad84bd16538/embed",
    },
    {
      id: 3,
      subject: "Differential",
      definition:
        "A differential is a gear train with three drive shafts that has the property that the rotational speed of one shaft is the average of the speeds of the others, or a fixed multiple of that average.",
      descriptions: [
        "The differential assembly transmits the torque from the driveshaft or transmission to the axles. It also affects the maximum torque or speed available to the wheels.",
        "The differential also serves the important role of allowing the left and right wheels to turn at different speeds, and this is a function crucial to safe operation in turns. When the vehicle turns a corner, the inner wheel slows and the outer wheel increases in speed to compensate. This difference in rotational speed causes the pinion gears to “walk” around the slower side gear.",
      ],
      img_path: "./images/differential/differential.JPG",
      parts: [
        {
          label: "The axon gear converts vertical motion to horizontal.",
          class: "diff1_btn",
        },
        {
          label: "The parallel gear sychronizes the two weels.",
          class: "diff2_btn",
        },
        {
          label: "These gears do something really cool.",
          class: "diff3_btn",
        },
      ],
      model_url:
        "https://sketchfab.com/models/acaf00f5bcf64bc48253602e48bec0ab/embed",
    },
  ];

  // insert the array of objects/lectures in the lectures collection
  // we have to create the lectures collection from before
  dbo.collection("lectures").insertMany(mylectures, function (err, res) {
    if (err) throw err;
    console.log(
      "Number of documents inserted in lectures: " + res.insertedCount
    );
    db.close();
  });

  // Systems
  // create the "systens" collection/table, collection is the same as table in SQL databases
  dbo.createCollection("systems", function (err, res) {
    if (err) throw err;
    console.log("Collection systems created!");
  });

  // create an array of json objects/systens with key value pairs
  var mysystems = [
    { model: "Brake system", id: 1 },
    { model: "Suspension system", id: 2 },
    { model: "Differential", id: 3 },
  ];

  // insert the array of objects/systens in the systens collection
  // we have to create the systens collection from before
  dbo.collection("systems").insertMany(mysystems, function (err, res) {
    if (err) throw err;
    console.log(
      "Number of documents inserted in systems: " + res.insertedCount
    );
    db.close();
  });
});
