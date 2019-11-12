

class Hashing {
    // 
    simpleHash(msg) {
      var hashNum = 7;
  
      for (var i = 0; i < msg.length; i++) {
        hashNum = (hashNum * 31) + msg.charCodeAt(i);
      }
      var hashString = hashNum.toString();
  
      while ((hashString.length % 16) != 0) {
        hashString = hashString + '0';
      }
      return hashString;
    } 
    
  }
  
  export default class Hashing {}
  
  /* USAGE in another file (like main.js)
  const Hashing = require("./hashing.js");    //includes the class in other file
  const hash = new Hashing;  // make a new class variable
  var hashedMessage = hash.simpleHash("message");
  
  console.log(symEncryp.ciphertext); // does the thing
  */