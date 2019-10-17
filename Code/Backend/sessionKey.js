const Player = require("./player.js");

class sessionKey{
    constructor(playerOne, playerTwo){
        this.firstKey = playerOne.getKey;
        this.secondKey = playerTwo.getKey;
    }

    setSessionKeys(){
        playerOne.sessionKey(this.calcSessionKey)
        playerTwo.sessionKey(this.calcSessionKey)
    }

    //placeholder algorithm
    calcSessionKey(){
        //playerOne.sessionKey(this.setSessionKey());
        //playerTwo.sessionKey(this.setSessionKey());
        //this.sessionKey = this.firstKey * this.secondKey
        return (this.firstKey * this.secondKey)
        //return this.firstKey * this.secondKey
    }
}

export default class sessionKey {}