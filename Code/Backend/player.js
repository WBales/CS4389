//TUTORIAL on javascript classes:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
const symEncrypt = require("./symEncrypt.js");
const symDecypt = require("./symDecrypt.js");

class Player {
  //cipherText;
  //sessionKey;
  //plainText;

  constructor(key) {
    this.key = key;
  }

  // Getter
  get cipherText() {
    return this.calcCipher();
  }

  get key(){
    return this.key;
  }

  // Method
  calcCipher(plainText) {
    var encrypted = symEncrypt(plainText, this.sessionKey)
    return encrypted.cipherText();
  }

  get plainText(){
    return this.calcPlain();
  }

  calcPlain(cipherText) {
    var decrypted = symDecypt(cipherText, this.sessionKey)
    return decrypted.plainText();
  }

  // How do setters work?
  sessionKey(sessionKey){
    this.sessionKey = sessionKey
  }

}

export default class Player {}

/* USAGE in another file (like main.js)
const player = require("./player.js");    //includes the class in other file
const symPlayer = new Player(ADWADADAWDWA, 10);  //make a new class variable

console.log(symPlayer.ciphertext); // does the thing
*/
