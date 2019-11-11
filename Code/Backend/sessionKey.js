const Player = require("./player.js");

class sessionKey{
    constructor(playerOne, playerTwo){
        this.firstKey = playerOne.key;
        this.secondKey = playerTwo.key;
        var key = this.calcSessionKey();
        playerOne.sessionKey = key;
        playerTwo.sessionKey = key;
        //console.log(this.firstKey, this.secondKey);
    }

    setSessionKeys(){
        playerOne.sessionKey = calcSessionKey();
        playerTwo.sessionKey = calcSessionKey();
        //console.log(calcSessionKey);
    }

    //placeholder algorithm
    calcSessionKey(){
        //playerOne.sessionKey(this.setSessionKey());
        //playerTwo.sessionKey(this.setSessionKey());
        //this.sessionKey = this.firstKey * this.secondKey
        //console.log(this.firstKey * this.secondKey)
        var key = (this.firstKey * this.secondKey);
        var sub = "";
        while(sub.length < 16){
            sub = key.toString();
            //console.log(sub.length);
            if(sub.length < 16){
                key = key * 2;
            }
            //console.log(key);
        }
        
        sub = key.toString();
        if(sub.length > 16){
            var subKey = sub.substring(0,16);
            key = parseInt(sub);
        }
        
        console.log(key);

        return (key);
        //return this.firstKey * this.secondKey
    }
}

module.exports = sessionKey