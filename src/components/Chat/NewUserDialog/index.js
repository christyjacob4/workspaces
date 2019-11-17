import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const NewUserDialog = (props) => {
  const [open, setOpen] = React.useState(true);
  const { userId, handleInput, connectToChatkit } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown fullWidth={true}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Chatroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Login With your Username
          </DialogContentText>
          <TextField
            autoFocus
            placeholder="Enter your username"
            type="text"
            value={userId}
            onChange={handleInput}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={connectToChatkit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewUserDialog;