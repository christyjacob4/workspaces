import React from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import RoomList from "./RoomList";
import NewRoomForm from "./NewRoomForm";
import NewUserDialog from "./NewUserDialog";
import CurrentUser from "./CurrentUser"
import ActiveUsers from "./ActiveUsers";
import { config } from "../../helpers/config";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography"

import { handleUserId, handleMessage, connectToChatkit, getRooms, createRoom, connectToRoom, sendMessage} from "./methods";

const sidebarLeft = {
  border: "2px solid #ccc",
};

const sidebarRight = {
  border: "2px solid #ccc",
};

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      showLogin: true,
      userId: "",
      currentUser: null,
      currentRoom : null,
      roomUsers: [],
      roomName: null,
      newMessage : ""
    };
    this.sendMessage = sendMessage.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.getRooms = getRooms.bind(this);
    this.createRoom = createRoom.bind(this);
    this.handleUserId = handleUserId.bind(this);
    this.handleMessage = handleMessage.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
  }

  render() {
    if (this.state.showLogin) {
      return (
        <NewUserDialog
          userId={this.state.userId}
          handleInput={this.handleUserId}
          connectToChatkit={this.connectToChatkit}
        />
      );
    }
    return (
      <Box
        width={1}
        height={0.92}
        bgcolor="background.paper"
        p={1}
        // my={0.5}
        // mx={1}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid
            container
            item
            xs={3}
            direction="column"
            justify="space-around"
            alignItems="center"
            style={sidebarLeft}
          >
            <Box width={1} height={1} p={1} my={0.5} mx={1}>
              <CurrentUser user={this.state.currentUser}/>
              <RoomList
                connectToRoom={this.connectToRoom}
                rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                currentRoom={this.state.currentRoom}
                currentUser= {this.state.currentUser}
              />

              <NewRoomForm createRoom={this.createRoom} />
            </Box>
          </Grid>

          <Grid
            container
            xs={5}
            item
            direction="column"
            justify="space-around"
            alignItems="flex-start"
            style={sidebarRight}
          >
            <Box width={1} height={1} p={1} my={0.5} mx={1}>
              <Typography variant="h6">
                {this.state.roomName}
              </Typography>
              <MessageList
                messages={this.state.messages}
                currentRoom={this.state.currentRoom}
              />

              <SendMessageForm
                disabled={!this.state.currentRoom}
                sendMessage={this.sendMessage}
                newMessage={this.state.newMessage}
                handleInput={this.handleMessage}
              />
            </Box>
          </Grid>

          <Grid
            container
            xs={2}
            item
            direction="column"
            justify="space-around"
            alignItems="flex-start"
            style={sidebarRight}
          >
            <Box width={1} height={1} p={1} my={0.5} mx={1}>
              <RoomList
                connectToRoom={this.connectToRoom}
                rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                currentRoom={this.state.currentRoom}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Chat;
