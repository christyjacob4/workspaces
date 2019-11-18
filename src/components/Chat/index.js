import React from "react";
import ChatSession from "./ChatSession";
import RoomList from "./RoomList";
import RoomUsers from "./RoomUsers";
import Speech from "./Speech";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import { withFirebase } from "../Firebase";

// import 'skeleton-css/css/normalize.css';
// import 'skeleton-css/css/skeleton.css';
import "./index.css";

import {
  handleUserId,
  handleMessage,
  handleNewRoom,
  connectToChatkit,
  getRooms,
  createRoom,
  connectToRoom,
  sendMessage,
  sendDM,
} from "./methods";

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
      currentRoom: null,
      roomUsers: [],
      roomName: null,
      newMessage: "",
      newRoom: "",
    };
    this.sendMessage = sendMessage.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.getRooms = getRooms.bind(this);
    this.createRoom = createRoom.bind(this);
    this.handleUserId = handleUserId.bind(this);
    this.handleMessage = handleMessage.bind(this);
    this.handleNewRoom = handleNewRoom.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.sendDM = sendDM.bind(this);
  }

  getUserId = () => {
    if (!this.props.firebase.auth.currentUser) {
      setTimeout(this.getUserId, 1000);
      console.log("[INFO] Timeout")  
    }
    else {
      this.setState({
        userId: this.props.firebase.getCurrentUsername(),
      },this.connectToChatkit);
      
    }
  };

  componentDidMount() {
    this.getUserId();
  }

  render() {
    const {
      userId,
      showLogin,
      joinedRooms,
      joinableRooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
      newRoom,
    } = this.state;

    return (
      <Grid container>
        <Card>
          <div className="App">
            <aside className="sidebar left-sidebar">
              {currentUser ? (
                <div className="user-profile">
                  <span className="username">{currentUser.name}</span>
                  <span className="user-id">{`@${currentUser.id}`}</span>
                </div>
              ) : null}
              <RoomList
                rooms={[...joinedRooms, ...joinableRooms]}
                currentRoom={currentRoom}
                connectToRoom={this.connectToRoom}
                currentUser={currentUser}
              />
              <div className="create-room-div">
                <input
                  type="text"
                  value={newRoom}
                  name="newRoom"
                  className="message-input create"
                  placeholder="Create New Room"
                  onChange={this.handleNewRoom}
                />

                <IconButton
                  onClick={() =>
                    this.createRoom().then(room => {
                      this.setState({
                        newRoom: "",
                      });
                      this.connectToRoom(room.id);
                    })
                  }
                  title={`Create a new Room`}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </aside>
            <section className="chat-screen">
              <header className="chat-header">
                {currentRoom ? <h2>#{roomName}</h2> : <h2> Select a Room </h2>}
              </header>
              <ul className="chat-messages">
                <ChatSession messages={messages} />
              </ul>
              <footer className="chat-footer">
                <form onSubmit={this.sendMessage} className="message-form">
                  <input
                    type="text"
                    value={newMessage}
                    name="newMessage"
                    className="message-input"
                    placeholder="Type your message and hit ENTER to send"
                    onChange={this.handleMessage}
                    disabled={!currentRoom}
                  />
                  <Speech onChange={this.handleMessage} />
                </form>
              </footer>
            </section>
            <aside className="sidebar right-sidebar">
              {currentRoom ? (
                <RoomUsers
                  currentUser={currentUser}
                  sendDM={this.sendDM}
                  roomUsers={roomUsers}
                />
              ) : null}
            </aside>
          </div>
        </Card>
      </Grid>
    );
  }
}

export default withFirebase(Chat);
