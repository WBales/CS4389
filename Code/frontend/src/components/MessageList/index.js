import React from "react";
import Compose from "../Compose/index";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
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
          msgpayload: dataToSend,
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
          title="Conversation Title"
          rightItems={[
            <ToolbarButton
              key="info"
              icon="ion-ios-information-circle-outline"
            />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
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
