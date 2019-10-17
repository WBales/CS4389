class symmetric{
    constructor (cipherText, key){
        this.cipherTest = cipherText
        this.key = key
    }

    get plainText(){
        return this.calcPlain();
    }

    calcPlain(){
        return (`${cipherText} is now decrypted with ${this.key}`)
    }
}