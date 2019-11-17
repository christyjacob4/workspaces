import React from "react";
import ReactDOM from "react-dom";
import Message from "../Message";

import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/styles";

// const styles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper,
//   },
//   paper: {
//     padding: theme.spacing(3, 2),
//   },
// }));

class MessageList extends React.Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="message-list">
          <div className="join-room">Join a room! &rarr;</div>
        </div>
      );
    }
    // const { classes } = this.props;
    return (
        <>
          {this.props.messages.map((message, index) => {
            return (
              <Message
                key={message.id}
                username={message.senderId}
                text={message.text}
              />
            );
          })}
        </>
    );
  }
}

export default MessageList;
