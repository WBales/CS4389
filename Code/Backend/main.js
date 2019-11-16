var express = require("express"); //spins up the server
var app = express();
var bodyParser = require("body-parser"); //this is for being able to open JSON objects
const Player = require("./player.js");
const SessionKey = require("./sessionKey.js");
const PORT = 4000;
const sessionKey = 1470229811036160;

var newMessages = [];
var server = new Player(12345);

const jsonRes = {
  result: true
};

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/loadmsgs", function(req, res) {
  console.log("/loadmsgs");
  console.log(newMessages);
  let encryptMessages = [];
  // encryptMessages.forEach(element => {
  //   element.message = server.calcCipher(element.message);
  // });
  for (let i = 0; i < newMessages.length; i++) {
    encryptMessages.push({
      id: newMessages[i].id,
      author: newMessages[i].author,
      message: server.calcCipher(newMessages[i].message),
      timestamp: newMessages[i].timestamp
    });
  }
  console.log(encryptMessages);
  res.send(encryptMessages);
});

app.post("/postmsgs", function(req, res) {
  console.log("/postmsgs");
  console.log(`Got encrypt: ${req.body.msgpayload}`);
  let newMsg = {
    id: newMessages.length + 1,
    author: req.body.author,
    message: server.calcPlain(req.body.msgpayload),
    timestamp: new Date().getTime()
  };
  console.log(`got decrypt msg: ${newMsg.message}`);

  newMessages.push(newMsg);
  res.send(jsonRes);
});

app.listen(PORT, function() {
  server.sessionKey = sessionKey;
  console.log(`Security app listening on port ${PORT}!`);
});
