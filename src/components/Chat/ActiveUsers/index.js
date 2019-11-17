// client/src/components/RoomUsers.js

import React from "react";

const ActiveUsers = props => {
  const { roomUsers, currentUser } = props;
  const users = roomUsers.map(user => {
    return (
      <li className="room-member" key={user.id}>
        <div>
          <span className={`presence ${user.presence.state}`} />
          <span>{user.name}</span>
        </div>
        {currentUser.id !== user.id ? (
          <button
            title={`Send ${user.name} a direct message`}
            className="send-dm"
          >
            +
          </button>
        ) : null}
      </li>
    );
  });

  return (
    <div className="room-users">
      <ul>{users}</ul>
    </div>
  );
};


export default ActiveUsers;
