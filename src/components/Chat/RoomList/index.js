import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
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
  inline: {
    display: "inline",
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

const RoomList = ({ rooms, roomId, subscribeToRoom }) => {
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
      <div className={classes.paper}>
         <Typography variant="h5" component="h5">
          Your Rooms
        </Typography>
        <List className={classes.root}>
          {orderedRooms.map(room => {
            const active = room.id === roomId ? "active" : "";
            return (
              <>
                <ListItem
                  key={room.id}
                  onClick={() => subscribeToRoom(room.id)}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`# ${room.name}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          })}
        </List>
      </div>

      // <div className="rooms-list">
      //   <ul>
      //     <h3>Your rooms:</h3>
      //     {orderedRooms.map(room => {
      //       const active = room.id === this.props.roomId ? "active" : "";
      //       return (
      //         <li key={room.id} className={"room " + active}>
      //           <a onClick={() => this.props.subscribeToRoom(room.id)} href="#">
      //             # {room.name}
      //           </a>
      //         </li>
      //       );
      //     })}
      //   </ul>
      // </div>
    );
};

export default RoomList;
