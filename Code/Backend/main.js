var express = require("express"); //spins up the server
var app = express();
var bodyParser = require("body-parser"); //this is for being able to open JSON objects
const Symmetric = require("./symmetric.js");
const PORT = 4000;

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.listen(PORT, function() {
  console.log(`Security app listening on port ${PORT}!`);
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/newmsg", function(req, res) {
  console.log("/newmsg hit!");
  var newMessages = [
    {
      id: 1,
      author: "apple",
      message: "Test Message 1 from Apple",
      timestamp: new Date().getTime()
    },
    {
      id: 2,
      author: "orange",
      message: "Test Message 2 from Orange",
      timestamp: new Date().getTime()
    },
    {
      id: 3,
      author: "orange",
      message: "Test Message 3 from Orange",
      timestamp: new Date().getTime()
    }
  ];
  res.send(newMessages);
});

app.post("/msgrecieving", function(req, res) {
  //req.body
  res.send();
});

// EXAMPLE ENDPOINT
// This demonstrates how an endpoint is written in Node.JS w/ Express
app.post("/testendpoint", function(req, res) {
  console.log("DEBUG: ", req.body);
  var x = new Symmetric("ADWADWAWAD", 14515151); //just an example

  //this demonstrates what a JSON messeage is formatted like
  var testJSON = {
    name: "YourMom",
    class: "CS 4389",
    tech: "Node.JS & Express"
  };

  res.send(testJSON);
});
