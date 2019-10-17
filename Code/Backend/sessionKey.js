class sessionKey{
    constructor(firstKey, secondKey){
        this.firstKey = firstKey
        this.secondKey = secondKey
    }

    get sessionKey(){
        return this.calcSessionKey()
    }

    //placeholder algorithm
    calcSessionKey(){
        return this.firstKey * this.secondKey
    }
}