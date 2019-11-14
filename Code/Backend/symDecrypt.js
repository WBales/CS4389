const Hashing = require("./hashing.js");

class symDecrypt{
    constructor (cipherText, key){
        this.cipherText = cipherText;
        this.key = key;
    }
    
    calcPlain(){
        var i;
        var encryptedArray = [];
        for(i = 0; i < 256; i++){
            if(this.cipherText.length != 0){
                if(this.cipherText.length > 16){
                    encryptedArray[i] = this.cipherText.substring(0, 16);
                    this.cipherText = this.cipherText.substring(16);
                } else {
                    encryptedArray[i] = this.cipherText.substring(0);
                    this.cipherText = "";
                }
            } else {
                i = 256;
            }
        }

        var decrypted = "";
        var keyArray = (""+this.key).split("");
        //console.log("DECRYPT VALUES")
        for(i = 0; i < encryptedArray.length; i++){
            var j;
            var decryptedBlock = "";
            for(j = 0; j < encryptedArray[i].length; j++){
                var checkDecrypt = encryptedArray[i].charCodeAt(j);
                if(checkDecrypt )
                var decryptedChar = encryptedArray[i].charCodeAt(j) - (5 * parseInt(keyArray[j])) - 10
                if(decryptedChar < 32){
                    decryptedChar = 126 - (32 - decryptedChar);
                }
                decryptedBlock = decryptedBlock + String.fromCharCode(decryptedChar);
            }
            //console.log(decryptedBlock);
            decrypted = (decrypted + decryptedBlock);
        }
        //Get hashed portion
        if(decrypted.length > 16){
            var hashedPortion = "";
            for(i = decrypted.length - 16; i < decrypted.length; i++){
                hashedPortion = hashedPortion + decrypted.charAt(i);
            }
        }
        decrypted = decrypted.substring(0, (decrypted.length - 16))

        var _hashing = new Hashing();
        //console.log(decrypted);
        var plainHash = _hashing.simpleHash(decrypted);
        //console.log("Hash from decrypt: " + plainHash);
        if(plainHash == hashedPortion){
            console.log("Hash: " + plainHash + " :Matches")
            return decrypted;
        } else {
            return "Hash not matching";
        }
    }
}

module.exports = symDecrypt