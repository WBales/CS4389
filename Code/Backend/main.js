var express = require("express"); //spins up the server
var app = express();
var bodyParser = require("body-parser"); //this is for being able to open JSON objects
const PORT = 3000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// EXAMPLE ENDPOINT
// This demonstrates how an endpoint is written in Node.JS w/ Express
app.post("/testendpoint", function(req, res) {
  console.log("DEBUG: ", req.body);

  //this demonstrates what a JSON messeage is formatted like
  var testJSON = {
    name: "YourMom",
    class: "CS 4389",
    tech: "Node.JS & Express"
  };

  res.send(testJSON);
});

app.listen(PORT, function() {
  console.log(`Security app listening on port ${PORT}!`);
});
