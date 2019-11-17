import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  active: {
    backgroundColor: "grey",
  },
  inline: {
    display: "inline",
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

const RoomList = ({ rooms, currentRoom, connectToRoom, currentUser }) => {
  const classes = useStyles();
  const orderedRooms = [...rooms].sort((a, b) => a.id > b.id);

  if (!orderedRooms.length)
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3">
          No Rooms Created!
        </Typography>
      </Paper>
    );
  else
    return (
      <div>
        <Typography variant="h5" component="h5">
          Your Rooms
        </Typography>
          <div className={classes.demo}>
            <List>
              {orderedRooms.map(room => {
                const active = room.id === currentRoom ? true : false;
                const roomIcon = !room.isPrivate ? "🌐" : "🔒";
                return (
                  <>
                    <ListItem
                      className={active ? classes.active : null}
                      key={room.id}
                      onClick={() => connectToRoom(room.id)}
                      alignItems="flex-start"
                    >
                      <ListItemAvatar>
                        <Avatar>{roomIcon}</Avatar>
                      </ListItemAvatar>
                      {room.customData && room.customData.isDirectMessage ? (
                        <ListItemText
                          primary={
                            room.customData.userIds.filter(
                              id => id !== currentUser.id,
                            )[0]
                          }
                        />
                      ) : (
                        <ListItemText primary={`# ${room.name}`} />
                      )}
                    </ListItem>
                  </>
                );
              })}
            </List>
          </div>
      </div>
    );
};

export default RoomList;
