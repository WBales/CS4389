class symEncrypt{
    constructor (plainText, key){
        this.plainText = plainText
        this.key = key
    }

    calcCipher(){
        return (`${this.plainText} is now encrypted with ${this.key}`)
    }
}

module.exports = symEncrypt