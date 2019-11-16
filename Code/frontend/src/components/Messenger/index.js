import React from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import "./Messenger.css";

//export default function Messenger(props)
class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { channelName: "Symmetric" };
  }

  changeChannel = newChannelName => {
    //const currChanName = this.state.channelName;
    // console.log(`Got newChannelName ${currChanName}`);
    // if (newChannelName !== currChanName) {
    //   this.setState({ channelName: newChannelName });
    // }
  };

  render() {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList
            messengerCallback={
              (this.changeChannel = this.changeChannel.bind(this))
            }
          />
        </div>

        <div className="scrollable content">
          <MessageList chanName={this.state.channelName} />
        </div>
      </div>
    );
  }
}

export default Messenger;
