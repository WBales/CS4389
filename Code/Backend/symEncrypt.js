class symEncrypt{
    constructor (plainText, key){
        this.plainText = plainText
        this.key = key
    }

    calcCipher(){

        //Arbitrary message length limit of 16*128
        var i; 
        var messageArray = [];
        for(i = 0; i < 128; i++){
            if(this.plainText.length != 0){
                if(this.plainText.length > 16){
                    messageArray[i] = this.plainText.substring(0, 16);
                    this.plainText = this.plainText.substring(16);
                } else {
                    //console.log(this.plainText.substring(0));
                    var subStr = this.plainText.substring(0);
                    //let f = Math.floor(128);
                    //let r = Math.floor(Math.random() * Math.floor(128));
                    while(subStr.length < 16){
                        var min = Math.ceil(32);
                        var max = Math.floor(128);
                        let r = Math.floor(Math.random() * (max - min)) + min;
                        //console.log(r);
                        r = String.fromCharCode(r);
                        //console.log(r);
                        subStr = (subStr + r);
                    }
                    //console.log(subStr);
                    messageArray[i] = subStr;
                    this.plainText = "";
                }
            } else {
                i = 128;
            }
        }
        //i = 0;

        var encrypted = "";
        var keyArray = (""+this.key).split("");
        for(i = 0; i < messageArray.length; i++){
            var j;
            var encryptedBlock = "";
            for(j = 0; j < messageArray[i].length; j++){
                var checkEncrypt = messageArray[i].charCodeAt(j);
                //console.log(checkEncrypt);
                /*
                if(j == 0){
                    console.log("Encrypt: " + checkEncrypt);
                    console.log("/n");
                    console.log("Encrypt * key: " + (checkEncrypt * parseInt(keyArray[j])));
                    console.log("/n");
                    console.log("Mod: " + (messageArray[i].charCodeAt(j) * parseInt(keyArray[j])) % 96);
                    console.log("/n");
                    console.log("+32: " + ((messageArray[i].charCodeAt(j) * parseInt(keyArray[j])) % 96)+ 32);
                    console.log("/n");
                }
                */
                var encryptedChar = (((messageArray[i].charCodeAt(j) + parseInt(keyArray[j])) % 96) + 32);
                //console.log(encryptedChar)
                encryptedBlock = encryptedBlock + String.fromCharCode(encryptedChar);
                //console.log(String.fromCharCode(encryptedChar));
            }
            //console.log(messageArray[i]);
            encrypted = (encrypted + encryptedBlock);
        }
        //console.log(encrypted);

        return encrypted;
        //return (`${this.plainText} is now encrypted with ${this.key}`)
    }
}

module.exports = symEncrypt