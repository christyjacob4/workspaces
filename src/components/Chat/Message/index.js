import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography"
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Message = ({ username, text, key, time }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <Typography variant="h5" className={classes.username}>
        {username}
    </Typography>
      <Chip
        color="secondary"
        // icon={icon}
        label={text}
        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
        className={classes.chip}
        avatar={<Avatar>{username}</Avatar>}
      />
    </div>
  );
};

export default Message;
