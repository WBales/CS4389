//TUTORIAL on javascript classes:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

class Symmetric {
  constructor(plaintext, key) {
    this.plaintext = plaintext;
    this.key = key;
  }

  // Getter
  get ciphertext() {
    return this.calcCipher();
  }
  // Method (Doesn't do anything, just for show)
  calcCipher() {
    return this.plaintext;
  }
}

export default class Symmetric {}

/* USAGE in another file (like main.js)
const Symmetric = require("./symmetric.js");    //includes the class in other file
const symEncryp = new Symmetric(ADWADADAWDWA, 10);  //make a new class variable

console.log(symEncryp.ciphertext); // does the thing
*/
