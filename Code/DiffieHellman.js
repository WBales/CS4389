/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
//---------------------------------  https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange




// Note: This still needs logic to confirm that both Secret keys are equivilant for Bob and Alice   if(S_Bob == S_Alice){/*open secure connection*/};
class Bob {
  constructor(bob, public_prime_base, public_prime_modulus, bob_priv_key, alice_pub_key, bob_pub_key, s_key_Alice, s_key_Bob){
    
    /* Initialization of class objects...    Note: these objects will be set dynamically  (this is just a test example) */
    this.bob = bob;
    this.public_prime_base = 5;           //    g
    this.public_prime_modulus = 23;       //    p
    this.bob_priv_key = 15;               //    b     Note: needs to be a new random natural number every time  (1 <= b < n)
    this.alice_pub_key = 8;               //    A
    this.bob_pub_key = 19;                //    B
    this.s_key_Alice = 0;                           // Comparison value    Note: open connection if these values match
    this.s_key_Bob = 0;                             // Comparison value    Note: open connection if these values match
}
  
    B = bob_encrypt_shared_secret_Key_Outgoing(b);     // gets the shared secret key for the Encryption of Bob's message
    s_key_Bob = decrypt_Alice_Incoming(A);             // gets the shared secret key for the Decryption of Alice's message
    //Note: still need to create a function to recieve and send the messages from/to Alice  
  
    function(){
     "use strict";
      function bob_encrypt_shared_secret_Key_Outgoing(b){      // Bob's Encryption algorithm
        Y = function(b){
          var i;
          var calc = 0;
          for(i = 0; i < b; i++)
          {  
            calc *= g; 
          }
          return (calc % p);
      }
      return Y;
    }
}// encrypts a message based on Bob's secret key
  

  function(){
  "use strict";
      function decrypt_Alice_Incoming(A){        // Bob's Decryption algorithm
        W = function(A){
          var i;
          var calc = 0;
          for(i = 0; i < b; i++)
          {  
             calc *= g; 
          }
          return (calc % p);
      }
        return W;
    }
}
}       //  Bob's Class
  

class Alice {
  constructor(alice, public_prime_base, public_prime_modulus, alice_priv_key, alice_pub_key, bob_pub_key, s_key_Alice, s_key_Bob){
    
    /* Initialization of class objects...    Note: these objects will be set dynamically  (this is just a test example) */
    this.alice = alice;
    this.public_prime_base = 5;           //    g
    this.public_prime_modulus = 23;       //    p
    this.alice_priv_key = 6;              //    a       Note: needs to be a new random NATURAL number every time  (1 <= a < n)
    this.alice_pub_key = 8;               //    A
    this.bob_pub_key = 19;                //    B
    this.s_key_Alice = 0;                           // Comparison value    Note: open connection if these values match
    this.s_key_Bob = 0;                             // Comparison value    Note: open connection if these values match
  }      // instatiate object with    // let key_sender_1 = Alice("name", "5", "23", "6", "8", "19", "0", "0");
  
 s_key_Alice = alice_encrypt_shared_secret_Key(a); // gets the shared secret key for the Encryption of Alice's message
 s_key_Bob = decrypt_Bob_Incoming(B);             // gets the shared secret key for the Decryption of Bob's message
    //Note: still need to create a function to recieve and send the messages from/to Bob  
  
  
  function(){
  "use strict";
    function alice_encrypt_shared_secret_Key(a){      // Alice's Encryption algorithm

      X = function(a){
          var i;
          var calc = 0;
          for(i = 0; i < a; i++)
          {  
            calc *= g; 
          }
          return (calc % p);
      }
      return X;
    }
}// encrypts a message based on Alice's secret key


get ciphertext(){
  return this.plaintext;
}

  function(){
  "use strict";
function decrypt_Bob_Incoming(B){        // Bob's Decryption algorithm
        Z = function(B){
          var i;
          var calc = 0;
          for(i = 0; i < a; i++)
          {  
             calc *= g; 
          }
          return (calc % p);
      }
      return Z;
    }
}

//   Note: need to put this into scope
//export default class Bob{}
//export default class Alice{}



/* USAGE in another file (ie: to be used in main.js)   */
//const Diffie = require("./diffie.js");  //includes the class in another file
//const diffieEncryp = new Diffie
}
