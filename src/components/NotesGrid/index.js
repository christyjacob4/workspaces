/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditDialog from "../EditDialog";
import CustomizedSnackbars from "../Snackbar/Snackbar";

import SimpleCard from "../Card";

import { withFirebase } from "../Firebase";

import { withAuthentication } from "../Session";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    position: "fixed",
    bottom: "5%",
    left: "92%",
  },
  gridList: {
    height: 900,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

const NotesGrid = props => {
  const classes = useStyles();
  const [noteData, setNoteData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function updateNotes() {
    if (!props.firebase.auth.currentUser) {
      setTimeout(updateNotes, 1000);
    } else {
      // console.log(props.firebase.auth.currentUser);
      props.firebase.getNotes(notes => {
        // console.log(notes);
        var notesArray = [];
        var i = 0;
        notes.forEach(doc => {
          notesArray[i] = { id: doc.id, data: doc.data().note };
          i += 1;
        });
        console.log(notesArray);
        setNoteData(notesArray);
        setLoaded(true);
      });
    }
  }

  useEffect(() => {
    updateNotes();
  }, []);

  var placeholder = `# Markdown Notes
  Write more effective notes!
  
  Changes are automatically rendered as you type.`;

  return (
    <div className={classes.root}>
      {deleted && (
        <CustomizedSnackbars
          isOpen={true}
          variant={"success"}
          message={"Deleted Note Successfully"}
          callback={() => {
            setDeleted(false);
          }}
        />
      )}

      {loaded && !noteData.length && (
        <Grid container justify="center" spacing={5} style={{ marginTop: "20%", position: "relative"}}>
            <Typography variant="h1">No Notes Yet!</Typography>
        </Grid>
      )}
      <EditDialog
        dialogTitle={"New Note"}
        id={null}
        code={placeholder}
        open={open}
        setOpen={setOpen}
        onClose={updateNotes}
      />
      <Grid container justify="left" spacing={5}>
        {noteData.map(obj => {
          return (
            <Grid item xs={4}>
              <SimpleCard
                id={obj.id}
                title={obj.data.title}
                content={obj.data.code.slice(0, 250)}
                note={obj.data.code}
                onClose={updateNotes}
                onDelete={setDeleted}
              />
            </Grid>
          );
        })}
      </Grid>
      {!loaded && (
        <Grid container justify="center" spacing={5}>
          <CircularProgress
            size={50}
            style={{ marginTop: "20%", position: "relative" }}
          />
        </Grid>
      )}
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon
          onClick={() => {
            setOpen(true);
          }}
        />
      </Fab>
    </div>
  );
};

export default withAuthentication(withFirebase(NotesGrid));
