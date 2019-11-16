const Hashing = require("./hashing.js");

class symEncrypt{
    constructor (plainText, key){
        this.plainText = plainText;
        this.key = key;
    }

    calcCipher(){
        //Arbitrary message length limit of 16*256
        var i; 
        var messageArray = [];
        var plainPad = "";
        for(i = 0; i < 256; i++){
            if(this.plainText.length != 0){
                if(this.plainText.length > 16){
                    messageArray[i] = this.plainText.substring(0, 16);
                    this.plainText = this.plainText.substring(16);
                } else {
                    var subStr = this.plainText.substring(0);
                    while(subStr.length < 16){
                        var min = Math.ceil(33);
                        var max = Math.floor(126);
                        let r = Math.floor(Math.random() * (max - min)) + min;
                        r = String.fromCharCode(r);
                        subStr = (subStr + r);
                    }
                    messageArray[i] = subStr;
                    this.plainText = "";
                }
                //console.log(messageArray[i]);
                plainPad = plainPad + messageArray[i];
            } else {
                i = 256;
            }
        }
        //console.log(plainPad);
        var _hashing = new Hashing();
        var plainPad = _hashing.simpleHash(plainPad);
        //console.log("Hash from encrypt: " + plainPad);

        messageArray[messageArray.length] = plainPad;

        var encrypted = "";
        var keyArray = (""+this.key).split("");
        for(i = 0; i < messageArray.length; i++){
            var j;
            var encryptedBlock = "";
            for(j = 0; j < messageArray[i].length; j++){
                var encryptedChar = (messageArray[i].charCodeAt(j) + (5 * parseInt(keyArray[j])) + 10);
                if(encryptedChar > 126){
                    encryptedChar = 32 + (encryptedChar - 126);
                }
                encryptedBlock = encryptedBlock + String.fromCharCode(encryptedChar);
            }
            //console.log(messageArray[i]);
            encrypted = (encrypted + encryptedBlock);
        }
        return (encrypted);
    }
}

module.exports = symEncrypt