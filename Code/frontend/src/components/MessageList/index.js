import React from "react";
import Compose from "../Compose/index";
import Toolbar from "../Toolbar";
//import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import { SERVER_IP_ADDR } from "../../constants";
import axios from "axios";

import "./MessageList.css";

//let MY_USER_ID = "apple"; //<--- The user name: probably important
const initMsg = [
  {
    id: -1,
    author: `ChatBot`,
    message: `Please type in a userid. Follow the example below.`,
    timestamp: new Date().getTime()
  },
  {
    id: 0,
    author: `ChatBot`,
    message: `/userid JohnDoe`,
    timestamp: new Date().getTime()
  }
];
const sessionKey = 1470229811036160;

class MessageList extends React.Component {
  // const [messages, setMessages] = useState([]);
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userID_exists: false,
      MY_USER_ID: "apple"
    };
  }

  //gets the newly typed message and sends it to the server
  // then we call rerender
  msgCallback = dataToSend => {
    let MY_USER_ID = this.state.MY_USER_ID;

    if (dataToSend[0] !== "/") {
      axios
        .post(SERVER_IP_ADDR + "postmsgs", {
          msgpayload: this.calcCipher(dataToSend),
          author: MY_USER_ID
        })
        .then(response => {
          this.getMessages();
        });
    } else {
      let cmd = dataToSend.substring(1);
      let space = cmd.indexOf(" ");
      let newUserID = null;

      switch (cmd.substring(0, space)) {
        case "userid":
          if (space !== -1) {
            newUserID = cmd.substring(space + 1);
            console.log(`userid: ${newUserID}`);
            this.setState({
              MY_USER_ID: newUserID,
              userID_exists: true
            });
          }
          break;
        case "encrypt":
          let encryptArray = this.state.messages;
          encryptArray.forEach(element => {
            element.message = this.calcCipher(element.message);
          });
          this.setState({
            messages: encryptArray
          });
          break;
        case "decrypt":
          let decryptArray = this.state.messages;
          decryptArray.forEach(element => {
            element.message = this.calcPlain(element.message);
          });
          this.setState({
            messages: decryptArray
          });
          break;
        default:
          console.log(`Error: could not determine command ${cmd}`);
          break;
      }
    }
  };

  getMessages = () => {
    axios.get(SERVER_IP_ADDR + "loadmsgs").then(response => {
      let newMessagesFromServer = response.data;
      console.log(newMessagesFromServer);
      newMessagesFromServer.forEach(element => {
        element.message = this.calcPlain(element.message);
      });
      this.setState({
        messages: newMessagesFromServer
      });
    });
  };

  renderMessages = () => {
    console.log(`rendering ${this.props.chanName}`);
    const MY_USER_ID = this.state.MY_USER_ID;
    const userID_exists = this.state.userID_exists;
    let messages;
    if (userID_exists === true) {
      messages = this.state.messages;
    } else {
      messages = initMsg;
    }
    console.log(messages);
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
          message={`${current.author}: ${current.message}`}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  render() {
    return (
      <div className="message-list">
        <Toolbar
          title="Symmetric Chat Channel"
          // rightItems={[
          //   <ToolbarButton
          //     key="info"
          //     icon="ion-ios-information-circle-outline"
          //   />,
          //   <ToolbarButton key="video" icon="ion-ios-videocam" />,
          //   <ToolbarButton key="phone" icon="ion-ios-call" />
          // ]}
        />

        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose data={this.msgCallback.bind(this)} />
      </div>
    );
  }

  componentDidMount() {
    // https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
    console.log("componentDidMount()");
    this.timer = setInterval(() => this.getMessages(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  simpleHash(msg) {
    var hashNum = 0;
    var prime = 7;

    for (var i = 0; i < msg.length; i++) {
      hashNum = hashNum + prime * msg.charCodeAt(i);
      //console.log(hashNum);
    }

    hashNum = hashNum % 5953474341373129;

    var hashString = hashNum.toString();

    while (hashString.length < 16) {
      hashNum = hashNum * 2;
      hashString = hashNum.toString();
    }

    if (hashString.length > 16) {
      hashString = hashString.substring(0, 16);
    }

    return hashString;
  }

  calcPlain(cipherText) {
    console.log("Entering calcPlain");
    console.log(cipherText);
    var i;
    var encryptedArray = [];
    for (i = 0; i < 256; i++) {
      if (cipherText.length !== 0) {
        if (cipherText.length > 16) {
          encryptedArray[i] = cipherText.substring(0, 16);
          cipherText = cipherText.substring(16);
        } else {
          encryptedArray[i] = cipherText.substring(0);
          cipherText = "";
        }
      } else {
        i = 256;
      }
    }

    var decrypted = "";
    var keyArray = ("" + sessionKey).split("");
    //console.log("DECRYPT VALUES")
    for (i = 0; i < encryptedArray.length; i++) {
      var j;
      var decryptedBlock = "";
      for (j = 0; j < encryptedArray[i].length; j++) {
        var checkDecrypt = encryptedArray[i].charCodeAt(j);
        if (checkDecrypt)
          var decryptedChar =
            encryptedArray[i].charCodeAt(j) - 5 * parseInt(keyArray[j]) - 10;
        if (decryptedChar < 32) {
          decryptedChar = 126 - (32 - decryptedChar);
        }
        decryptedBlock = decryptedBlock + String.fromCharCode(decryptedChar);
      }
      //console.log(decryptedBlock);
      decrypted = decrypted + decryptedBlock;
    }
    //Get hashed portion
    if (decrypted.length > 16) {
      var hashedPortion = "";
      for (i = decrypted.length - 16; i < decrypted.length; i++) {
        hashedPortion = hashedPortion + decrypted.charAt(i);
      }
    }
    decrypted = decrypted.substring(0, decrypted.length - 16);

    //console.log(decrypted);
    var plainHash = this.simpleHash(decrypted);
    //console.log("Hash from decrypt: " + plainHash);
    if (plainHash === hashedPortion) {
      console.log("Hash: " + plainHash + " :Matches");
      console.log(`Decrypted: ${decrypted}`);
      return decrypted;
    } else {
      return "Hash not matching";
    }
  }

  calcCipher(plainText) {
    //Arbitrary message length limit of 16*256
    console.log("Entering calcCipher");
    console.log(plainText);
    var i;
    var messageArray = [];
    var plainPad = "";
    for (i = 0; i < 256; i++) {
      if (plainText.length !== 0) {
        if (plainText.length > 16) {
          messageArray[i] = plainText.substring(0, 16);
          plainText = plainText.substring(16);
        } else {
          var subStr = plainText.substring(0);
          while (subStr.length < 16) {
            var min = Math.ceil(33);
            var max = Math.floor(126);
            let r = Math.floor(Math.random() * (max - min)) + min;
            r = String.fromCharCode(r);
            subStr = subStr + r;
          }
          messageArray[i] = subStr;
          plainText = "";
        }
        //console.log(messageArray[i]);
        plainPad = plainPad + messageArray[i];
      } else {
        i = 256;
      }
    }
    //console.log(plainPad);
    // eslint-disable-next-line no-undef
    plainPad = this.simpleHash(plainPad);
    //console.log("Hash from encrypt: " + plainPad);

    messageArray[messageArray.length] = plainPad;

    var encrypted = "";
    var keyArray = ("" + sessionKey).split("");
    for (i = 0; i < messageArray.length; i++) {
      var j;
      var encryptedBlock = "";
      for (j = 0; j < messageArray[i].length; j++) {
        var encryptedChar =
          messageArray[i].charCodeAt(j) + 5 * parseInt(keyArray[j]) + 10;
        if (encryptedChar > 126) {
          encryptedChar = 32 + (encryptedChar - 126);
        }
        encryptedBlock = encryptedBlock + String.fromCharCode(encryptedChar);
      }
      //console.log(messageArray[i]);
      encrypted = encrypted + encryptedBlock;
    }
    console.log(`Encrypted: ${encrypted}`);
    return encrypted;
  }
}

export default MessageList;

// let newMessages = response.data.results.map(result => {
//   return {
//     id: result.id,
//     author: `${result.author}`,
//     message: `${result.message}`,
//     timestamp: result.timestamp
//   };
// });

// rightItems={[
//   <ToolbarButton key="photo" icon="ion-ios-camera" />,
//   <ToolbarButton key="image" icon="ion-ios-image" />,
//   <ToolbarButton key="audio" icon="ion-ios-mic" />,
//   <ToolbarButton key="money" icon="ion-ios-card" />,
//   <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
//   <ToolbarButton key="emoji" icon="ion-ios-happy" />
// ]}
