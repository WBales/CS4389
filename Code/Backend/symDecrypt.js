class symDecrypt{
    constructor (cipherText, key){
        this.cipherText = cipherText
        this.key = key
    }
    
    calcPlain(){
        var i;
        var encryptedArray = [];
        for(i = 0; i < 128; i++){
            if(this.cipherText.length != 0){
                if(this.cipherText.length > 16){
                    encryptedArray[i] = this.cipherText.substring(0, 16);
                    this.cipherText = this.cipherText.substring(16);
                } else {
                    encryptedArray[i] = this.cipherText.substring(0);
                    this.cipherText = "";
                }
            } else {
                i = 128
            }
        }
        //i = 0;

        var decrypted = "";
        var keyArray = (""+this.key).split("");
        //console.log("DECRYPT VALUES")
        //Not Decrypting with key
        //Algorithm is incorrect
        for(i = 0; i < encryptedArray.length; i++){
            var j;
            var decryptedBlock = "";
            for(j = 0; j < encryptedArray[i].length; j++){
                var checkDecrypt = encryptedArray[i].charCodeAt(j);
                //console.log(checkDecrypt);
                /*
                var decryptedChar = (((encryptedArray[i].charCodeAt(j) -32);
                */
                if((checkDecrypt - 32) < 32){
                    var decryptedChar = checkDecrypt -32 + 96 - keyArray[j];
                } else {
                    var decryptedChar = checkDecrypt -32 - keyArray[j];
                }
                //console.log(decryptedChar);
                decryptedBlock = decryptedBlock + String.fromCharCode(decryptedChar);
            }
            decrypted = (decrypted + decryptedBlock);
        }

        return decrypted;
        //return (`${this.cipherText} is now decrypted with ${this.key}`)
    }
}

module.exports = symDecrypt