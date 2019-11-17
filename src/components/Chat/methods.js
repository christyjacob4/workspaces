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

function handleNewRoom(event) {
  const { value } = event.target;

  this.setState({
    newRoom: value,
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
    .post("https://agile-stream-37836.herokuapp.com/users", { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: "https://agile-stream-37836.herokuapp.com/authenticate",
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
          console.log("[JOINED ROOMS]", currentUser.rooms)
          this.setState({
            currentUser,
            showLogin: false,
            joinedRooms: currentUser.rooms,
          });
          getRooms(this);
        });
    })
    .catch(console.error);
}

function getRooms(self) {
  const { currentUser } = self.state;

  currentUser
    .getJoinableRooms()
    .then(joinableRooms => {
      console.log("[JOINABLE ROOMS]", joinableRooms);
      self.setState({
        joinableRooms,
      });
    })
    .catch(err => console.log("error on joinableRooms: ", err));
}

function createRoom() {
  const { currentUser, newRoom } = this.state;
  return currentUser
    .createRoom({
      name : newRoom,
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

      console.log("[INFO]", this.state)
      getRooms(this);
    })
    .catch(console.error);
}

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === "") return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`,
  });

  this.setState({
    newMessage: "",
  });
}

function createPrivateRoom(id) {
  const { currentUser, rooms } = this.state;
  const roomName = `${currentUser.id}_${id}`;

  const isPrivateChatCreated = rooms.filter(room => {
    if (room.customData && room.customData.isDirectMessage) {
      const arr = [currentUser.id, id];
      const { userIds } = room.customData;

      if (arr.sort().join("") === userIds.sort().join("")) {
        return {
          room,
        };
      }
    }

    return false;
  });

  if (isPrivateChatCreated.length > 0) {
    return Promise.resolve(isPrivateChatCreated[0]);
  }

  return currentUser.createRoom({
    name: `${roomName}`,
    private: true,
    addUserIds: [`${id}`],
    customData: {
      isDirectMessage: true,
      userIds: [currentUser.id, id],
    },
  });
}

function sendDM(id) {
  createPrivateRoom.call(this, id).then(room => {
    connectToRoom.call(this, room.id);
  });
}

export {
  handleUserId,
  handleMessage,
  handleNewRoom,
  connectToChatkit,
  getRooms,
  createRoom,
  connectToRoom,
  sendMessage,
  sendDM,
};
