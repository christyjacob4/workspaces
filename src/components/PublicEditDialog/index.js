import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Notes from '../PublicNotes';

const EditDialog = (props) => {
  const { id, title, code, open , setOpen} = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown fullWidth={true} maxWidth={'xl'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <Notes id={id} code={code} title={title}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.onClose(); setOpen(false);}} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialog;