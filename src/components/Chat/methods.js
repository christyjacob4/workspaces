// client/src/methods.js

import Chatkit from "@pusher/chatkit-client";
import axios from "axios";

function handleUserId(event) {
  const { value } = event.target;

  this.setState({
    userId: value,
  });
}

function handleMessage(event) {
  const { value } = event.target;

  this.setState({
    newMessage: value,
  });
}

function connectToChatkit(event) {
  event.preventDefault();

  const { userId } = this.state;

  console.log("[CONNECTING TO CHATKIT]", userId);

  if (userId === null || userId.trim() === "") {
    alert("Invalid userId");
    return;
  }

  axios
    .post("http://localhost:5200/users", { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: "http://localhost:5200/authenticate",
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:56165286-1172-4484-9d35-1e8bb8d98038",
        userId,
        tokenProvider,
      });

      return chatManager
        .connect({
          onAddedToRoom: room => {
            const { joinedRooms } = this.state;
            this.setState({
              joinedRooms: [...joinedRooms, room],
            });
          },
        })
        .then(currentUser => {
          this.setState({
            currentUser,
            showLogin: false,
            joinedRooms: currentUser.rooms,
          });
        });
    })
    .catch(console.error);
}

function getRooms() {
  this.currentUser
    .getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms,
      });
    })
    .catch(err => console.log("error on joinableRooms: ", err));
}

function createRoom(name) {
  const {currentUser} = this.state
  currentUser
    .createRoom({
      name,
    })
    .then(room => {
      connectToRoom(room.id);
    })
    .catch(err => console.log("error with createRoom: ", err));
}

function connectToRoom(id) {
  const { currentUser } = this.state;

  this.setState({
    messages: [],
  });

  return currentUser
    .subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message],
          });
        },
        onPresenceChanged: () => {
          const { currentRoom } = this.state;
          this.setState({
            roomUsers: currentRoom.users.sort(a => {
              if (a.presence.state === "online") return -1;

              return 1;
            }),
          });
        },
      },
    })
    .then(currentRoom => {
      const roomName =
        currentRoom.customData && currentRoom.customData.isDirectMessage
          ? currentRoom.customData.userIds.filter(
              id => id !== currentUser.id,
            )[0]
          : currentRoom.name;

      this.setState({
        currentRoom,
        roomUsers: currentRoom.users,
        joinedRooms: currentUser.rooms,
        roomName,
      });
    })
    .catch(console.error);
}


function sendMessage(event) {
      event.preventDefault();
      const { newMessage, currentUser, currentRoom } = this.state;

      if (newMessage.trim() === '') return;

      currentUser.sendMessage({
        text: newMessage,
        roomId: `${currentRoom.id}`,
      });

      this.setState({
        newMessage: '',
      });
    }

export { handleUserId, handleMessage, connectToChatkit, getRooms, createRoom, connectToRoom,sendMessage };
