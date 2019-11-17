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

const SendMessageForm = ({ sendMessage, disabled }) => {
  const classes = useStyles();

  const [message, setMessage] = useState("");

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <TextField
        label="Type your message and hit ENTER"
        className={classes.textField}
        margin="normal"
        value={message}
        disabled={disabled}
        onChange = {handleChange}
      />
    </form>
  );
};

export default SendMessageForm;
