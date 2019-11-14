//TUTORIAL on javascript classes:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
const symEncrypt = require("./symEncrypt.js");
const symDecypt = require("./symDecrypt.js");

class Player {
  constructor(key) {
    this.key = key;  
  }

  // Method
  calcCipher(plainText) {
    var _symEncrypt = new symEncrypt(plainText, this.sessionKey);
    //var encrypted = _symEncrypt(plainText, this.sessionKey)
    return _symEncrypt.calcCipher();
  }

  calcPlain(cipherText) {
    var _symDecrypt = new symDecypt(cipherText, this.sessionKey);
    //var decrypted = symDecypt(cipherText, this.sessionKey)
    return _symDecrypt.calcPlain();
  }
}

module.exports = Player

/* USAGE in another file (like main.js)
const player = require("./player.js");    //includes the class in other file
const symPlayer = new Player(ADWADADAWDWA, 10);  //make a new class variable

console.log(symPlayer.ciphertext); // does the thing
*/
