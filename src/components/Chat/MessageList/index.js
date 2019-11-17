import React from "react";
import ReactDOM from "react-dom";
import { format } from "date-fns";

import Message from "../Message";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
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
  // componentWillUpdate() {
  //   const node = ReactDOM.findDOMNode(this);
  //   this.shouldScrollToBottom =
  //     node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  // }

  // componentDidUpdate() {
  //   if (this.shouldScrollToBottom) {
  //     const node = ReactDOM.findDOMNode(this);
  //     node.scrollTop = node.scrollHeight;
  //   }
  // }

  render() {
    if (!this.props.currentRoom) {
      return (
        <Paper>
          <Typography variant="h3" component="h3">
            Join a room! &rarr;
          </Typography>
        </Paper>
      );
    }
    const style = {
      display: "flex",
      "flex-direction": "column",
      overflow: "scroll",
    };
    return (
      <div style={style}>
        {this.props.messages.map((message, index) => {
          const time = format(new Date(`${message.updatedAt}`), "HH:mm");
          return (
            <Message
              key={message.id}
              username={message.senderId}
              text={message.text}
              time={time}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
