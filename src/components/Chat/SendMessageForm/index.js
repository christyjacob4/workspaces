import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "100%",
  },
}));

const SendMessageForm = ({ sendMessage, disabled, newMessage, handleInput}) => {
  const classes = useStyles();


  return (
    <form onSubmit={sendMessage} className={classes.container}>
      <TextField
        label="Type your message and hit ENTER"
        className={classes.textField}
        margin="normal"
        value={newMessage}
        disabled={disabled}
        onChange = {handleInput}
      />
    </form>
  );
};

export default SendMessageForm;
