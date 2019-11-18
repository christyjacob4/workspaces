import React from 'react';
import Proptypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const RoomUsers = props => {
  const { roomUsers, sendDM, currentUser } = props;
  const users = roomUsers.map(user => {
    return (
      <li className="room-member" key={user.id}>
        <div>
          <span className={`presence ${user.presence.state}`} />
          <span>{user.name}</span>
        </div>
        {currentUser.id !== user.id ? (
          <IconButton
            onClick={() => sendDM(user.id)}
            title={`Send ${user.name} a direct message`}
          >
            <AddIcon/>
          </IconButton>
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

RoomUsers.propTypes = {
  roomUsers: Proptypes.array.isRequired,
  sendDM: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired,
};

export default RoomUsers;