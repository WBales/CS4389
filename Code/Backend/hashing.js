

class Hashing {
    // 
    simpleHash(msg) {
      var hashNum = 0;
      var prime = 7;
      
      for (var i = 0; i < msg.length; i++) {
        hashNum = hashNum + (prime * msg.charCodeAt(i));
        //console.log(hashNum);
      }

      hashNum = hashNum % 5953474341373129;

      var hashString = hashNum.toString();

      while(hashString.length < 16){
        hashNum = hashNum * 2;
        hashString = hashNum.toString();
      }

      if(hashString.length > 16){
        hashString = hashString.substring(0,16);
      }

      return hashString;
    } 
    
  }
  
  module.exports = Hashing
  
  /* USAGE in another file (like main.js)
  const Hashing = require("./hashing.js");    //includes the class in other file
  const hash = new Hashing;  // make a new class variable
  var hashedMessage = hash.simpleHash("message");
  
  console.log(symEncryp.ciphertext); // does the thing
  */