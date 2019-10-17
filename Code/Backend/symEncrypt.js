class symEncrypt{
    constructor (plainText, key){
        this.plainText = plainText
        this.key = key
    }

    get cipherText(){
        return this.calcCipher();
    }

    calcCipher(){
        return (`${plainText} is now encrypted with ${this.key}`)
    }
}

export default class symEncrypt {}