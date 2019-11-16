import React from "react";
import "./ConversationListItem.css";

//export default function ConversationListItem(props)
class ConversationListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = channelName => {
    this.props.callback(channelName);
  };

  render(props) {
    const { name, text } = this.props.data;

    return (
      <div className="conversation-list-item" onClick={this.handleClick(name)}>
        {/* <img className="conversation-photo" src={photo} alt="conversation" /> */}
        <div className="conversation-info">
          <h1 className="conversation-title">{name}</h1>
          <p className="conversation-snippet">{text}</p>
        </div>
      </div>
    );
  }
}

export default ConversationListItem;
