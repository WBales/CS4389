import React from "react";
import "./Compose.css";

class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currMsg: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      currMsg: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let msgToSubmit = this.state.currMsg;
    this.setState({
      currMsg: ""
    });
    this.props.data(msgToSubmit);
  };

  render(props) {
    return (
      <div className="compose">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="compose-input"
            placeholder="Type a message, @name"
            value={this.state.currMsg}
            onChange={this.handleChange}
          />
        </form>
        {/*this.props.rightItems*/}
      </div>
    );
  }
}

export default Compose;
