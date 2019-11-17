import React, { useEffect, useState } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import RoomList from "./RoomList";
import NewRoomForm from "./NewRoomForm";
import NewUserDialog from "./NewUserDialog";
import ActiveUsers from "./ActiveUsers";
import { config } from "../../helpers/config";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const styles = makeStyles(theme => ({
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
}));

const Chat = () => {
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [joinableRooms, setJoinableRooms] = useState([]);
  const [joinedRoms, setJoinedRooms] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const classes = useStyles();

  const getRooms = () => {
    currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        setJoinableRooms(joinableRooms);
        setJoinedRooms(currentUser.rooms);
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  };

  useEffect(() => {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: config.instanceLocator,
      userId: "cj",
      tokenProvider: new Chatkit.TokenProvider({
        url: config.tokenUrl,
      }),
    });

    chatManager
      .connect()
      .then(currentUser => {
        setCurrentUser(currentUser);
        getRooms();
      })
      .catch(err => console.log("error on connecting: ", err));
  }, [getRooms]);


  const subscribeToRoom = roomId => {
    setMessages([]);
    currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            console.log("[HOOK] New Message Received", message);
            setMessages([...this.state.messages, message]);
          },
        },
      })
      .then(room => {
        setRoomId(room.id);
        getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  };

  const sendMessage = text => {
    currentUser.sendMessage({
      text,
      roomId,
    });
  };

  const createRoom = name => {
    currentUser
      .createRoom({
        name,
      })
      .then(room => {
        subscribeToRoom(room.id);
      })
      .catch(err => console.log("error with createRoom: ", err));
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.gridList}
    >
      <Grid
        container
        xs={3}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Box
          width={1}
          height={1}
          bgcolor="background.paper"
          p={1}
          my={0.5}
          mx={1}
        >
          <RoomList
            subscribeToRoom={this.subscribeToRoom}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            roomId={this.state.roomId}
          />

          <NewRoomForm createRoom={this.createRoom} />
        </Box>
      </Grid>

      <Grid
        container
        xs={5}
        direction="column"
        justify="space-around"
        alignItems="flex-start"
      >
        <Box
          width={1}
          height={1}
          bgcolor="background.paper"
          p={1}
          my={0.5}
          mx={1}
        >
          <MessageList
            roomId={this.state.roomId}
            messages={this.state.messages}
          />

          <SendMessageForm
            disabled={!this.state.roomId}
            sendMessage={this.sendMessage}
          />
        </Box>
      </Grid>

      <Grid
        container
        xs={2}
        direction="column"
        justify="space-around"
        alignItems="flex-start"
      >
        <Box
          width={1}
          height={1}
          bgcolor="background.paper"
          p={1}
          my={0.5}
          mx={1}
        >
          <RoomList
            subscribeToRoom={this.subscribeToRoom}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            roomId={this.state.roomId}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Chat);
