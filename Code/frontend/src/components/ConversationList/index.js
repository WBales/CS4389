import React from "react";
//import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
//import ToolbarButton from "../ToolbarButton";
// import axios from "axios";

import "./ConversationList.css";

//export default function ConversationList(props)
class ConversationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [{ name: "Symmetric" } /*, { name: "Asymmetric" }*/]
    };
  }

  channelCallback = channelName => {
    console.log(`ConvoList ${channelName}`);
    //this.props.messengerCallback(channelName);
  };

  // getConversations = () => {
  //   let newConversations = ;
  //   this.setState({
  //     conversations: newConversations
  //   });
  // };

  render() {
    const conversations = this.state.conversations;
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          //leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
          //  rightItems={[
          //  <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          //]} <ConversationSearch />
        />

        {conversations.map(conversation => (
          <ConversationListItem
            key={conversation.name}
            data={conversation}
            callback={this.channelCallback.bind(this)}
          />
        ))}
      </div>
    );
  }
}

export default ConversationList;
