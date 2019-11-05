import React from "react";
import "./Compose.css";

// export default function Compose(props) {
//  {props.rightItems}
// }

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
    console.log(`${event.target.value}\n${this.state.currMsg}`);
    this.setState({
      currMsg: ""
    });
    this.props.callbackFromParent(event.target.value);
    // pass stuff upstream
    // https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
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
