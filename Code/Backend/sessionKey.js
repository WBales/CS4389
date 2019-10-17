const Player = require("./player.js");

class sessionKey{
    constructor(playerOne, playerTwo){
        this.firstKey = playerOne.key;
        this.secondKey = playerTwo.key;
        playerOne.sessionKey = this.calcSessionKey();
        playerTwo.sessionKey = this.calcSessionKey();
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
        return (this.firstKey * this.secondKey)
        //return this.firstKey * this.secondKey
    }
}

module.exports = sessionKey