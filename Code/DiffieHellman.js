// Note: This still needs logic to confirm that both Secret keys are equivilant for Bob and Alice   if(S_Bob == S_Alice){/*open secure connection*/};

var Bob_message = new Object(),
    Bob_str = 'Bob        This is my encrypted message hard coded in.',

var Alice_message = new Alice(),
    Alice_str = 'Alice      This is my encrypted message hard coded in.',

class Bob {
  constructor(bob, public_prime_base, public_prime_modulus, bob_priv_key, alice_pub_key, bob_pub_key, s_key_Alice, s_key_Bob, Bob_str) {

      // Initialization of class objects...    Note: these objects will be set dynamically  (this is just a test example) 
      this.bob = bob;
      this.public_prime_base = 5;           //    g
      this.public_prime_modulus = 23;       //    p
      this.bob_priv_key = 15;               //    b     Note: needs to be a new random natural number every time  (1 <= b < n)
      this.alice_pub_key = 8;               //    A
      this.bob_pub_key = 19;                //    B
      this.s_key_Alice = 0;                           // Comparison value    Note: open connection if these values match
      this.s_key_Bob = 0;                             // Comparison value    Note: open connection if these values match
  }

  function() {
      "use strict";
      var bob_pub_key_value = function bob_encrypt_shared_secret_Key_Outgoing(bob_priv_key) {      // Bob's Encryption algorithm
          Y = function (bob_priv_key) {
              var i;
              var calc = 0;
              for (i = 0; i < bob_priv_key; i++) {
                  calc *= public_prime_base;
              }
              return (calc % public_prime_modulus);
          }
          return Y;
      }
  }// encrypts a message based on Bob's secret key

  function() {
      "use strict";
      s_key_Bob_value = function decrypt_Alice_Incoming(alice_pub_key) {        // Bob's Decryption algorithm
          W = function (alice_pub_key) {
              var k;
              var calc = 0;
              for (k = 0; k < bob_priv_key; k++) {
                  calc *= public_prime_base;
              }
              return (calc % public_prime_modulus);
          }
          return W;
      }
  }
}       //  Bob's Class

class Alice {
  constructor(alice, public_prime_base, public_prime_modulus, alice_priv_key, alice_pub_key, bob_pub_key, s_key_Alice, s_key_Bob, Alice_str) {

      // Initialization of class objects...    Note: these objects will be set dynamically  (this is just a test example) 
      this.alice = alice;
      this.public_prime_base = 5;           //    g
      this.public_prime_modulus = 23;       //    p
      this.alice_priv_key = 6;              //    a       Note: needs to be a new random NATURAL number every time  (1 <= a < n)
      this.alice_pub_key = 8;               //    A
      this.bob_pub_key = 19;                //    B
      this.s_key_Alice = 0;                           // Comparison value    Note: open connection if these values match
      this.s_key_Bob = 0;                             // Comparison value    Note: open connection if these values match
  }      // instatiate object with    // let key_sender_1 = Alice("name", "5", "23", "6", "8", "19", "0", "0");

  function() {
      "use strict";
      alice_pub_key_value = function alice_encrypt_shared_secret_Key(alice_pub_key) {      // Alice's Encryption algorithm

          X = function (alice_pub_key) {
              var j;
              var calc = 0;
              for (j = 0; j < alice_pub_key; j++) {
                  calc *= public_prime_base;
              }
              return (calc % public_prime_modulus);
          }
          return X;
      }
  }// encrypts a message based on Alice's secret key

  get ciphertext() {
      return this.plaintext;
  }

  function() {
      "use strict";
      s_key_Alice_value = function decrypt_Bob_Incoming(bob_pub_key) {        // Bob's Decryption algorithm
          Z = function (bob_pub_key) {
              var m;
              var calc = 0;
              for (m = 0; m < alice_pub_key; m++) {
                  calc *= public_prime_base;
              }
              return (calc % public_prime_modulus);
          }
          return Z;
      }
  }// end of class Alice


  //   Note: need to put this into scope
  export default class Bob{}
  export default class Alice{}



  // USAGE in another file (ie: to be used in main.js)   
  const Diffie = require("./diffie.js");  //includes the class in another file
  const diffieEncryp = new Diffie



function create_Diffie_Hellman_Keys(){
var bob;
var alice;
var a;
var b;
var not_coprimes = true;

function gcd_two_numbers(alice, bob) {
    if ((typeof alice !== 'number') || (typeof bob !== 'number')) {
        return false;
    }
    alice = Math.abs(alice);
    bob = Math.abs(bob);

    while (bob) {
        var t = bob;
        bob = alice % bob;
        alice = t;
    }
    return alice;
}

/*
Test Scripts for debugging purposes
//console.log("Hello world");
console.log("alice = " + alice);
console.log("bob = " + bob);
*/

  while (not_coprimes) {
    
    function getRandomInt(min, max){
//alice =// 

    }
    Math.floor((Math.random(alice) * 1000) + 2);    // Generates two random numbers
    Math.floor((Math.random(bob) * 1000) + 2);

    console.log("Hello world");
    console.log("alice = " + alice);
    console.log("bob = " + bob);  

    function prime_Factory(alice, bob) {     
        var minRange = 2;
        var maxRange = 1000;
        var number;
        //code to scanf the three vars above
        var x;

        //code to test if minRange<=maxRange and generate error
        for (x = minRange; x <= maxRange; x++) {
            if (gcd_two_numbers(number, x) == 1) {
                not_coprimes = false;
                break;
            }//tells how many coprimes are in the loop
        }
    }
  }// finds two numbers that are co-prime

bob_pub_key_value = bob_encrypt_shared_secret_Key_Outgoing(bob_priv_key);     // gets the shared secret key for the Encryption of Bob's message
s_key_Bob_value = decrypt_Alice_Incoming(alice_pub_key);             // gets the shared secret key for the Decryption of Alice's message
alice_pub_key_value = alice_encrypt_shared_secret_Key(alice_priv_key); // gets the shared secret key for the Encryption of Alice's message
s_key_Alice_value = decrypt_Bob_Incoming(bob_pub_key);             // gets the shared secret key for the Decryption of Bob's message

//Note: still need to create a function to recieve and send the messages from/to Bob
//Note: still need to create a function to recieve and send the messages from/to Alice

//displays the values for the keys
console.log("alice = " + alice);
console.log("bob = " + bob);
console.log("bob_pub_key_value = " + bob_pub_key_value);
console.log("bob_pub_key_value = " + s_key_Bob_value);
console.log("bob_pub_key_value = " + alice_pub_key_value);
console.log("bob_pub_key_value = " + s_key_Alice_value);
}

create_Diffie_Hellman_Keys();
