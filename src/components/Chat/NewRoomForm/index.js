import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    // display: "flex",
    // "justify-content": "space-between",
    // "align-items": "baseline",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // height : "100%"
  },
}));

const NewRoomForm = ({ createRoom }) => {
  const classes = useStyles();

  const [roomName, setRoomName] = useState("");

  const handleChange = e => {
    setRoomName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createRoom(roomName);
    setRoomName("");
  };

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <TextField
          label="Create a Room"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={roomName}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </Grid>
    </form>
  );
};

export default NewRoomForm;
