class symDecrypt{
    constructor (cipherText, key){
        this.cipherText = cipherText
        this.key = key
    }
    
    calcPlain(){
        return (`${this.cipherText} is now decrypted with ${this.key}`)
    }
}

module.exports = symDecrypt