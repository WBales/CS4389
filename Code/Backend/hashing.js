//TUTORIAL on javascript classes:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

class Hashing {
    constructor(plaintext) {
      this.plaintext = plaintext;
      //this.hash = hash;
    }
  
    // Getter
    get hash() {
      return this.hashFunc();
    }
    // 
    hashFunc() {

        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        
        hash.on('readable', () => {
            // Only one element is going to be produced by the
            // hash stream.
            const data = hash.read();
            if (data) {
              console.log(data.toString('hex'));
              // Prints:
              //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
            }
          });

        hash.write('some data to hash');
        hash.end();

        return this.hash;

    }
    
  }
  
  export default class Hashing {}
  
  /* USAGE in another file (like main.js)
  const Symmetric = require("./symmetric.js");    //includes the class in other file
  const symEncryp = new Symmetric(ADWADADAWDWA, 10);  //make a new class variable
  
  console.log(symEncryp.ciphertext); // does the thing
  */