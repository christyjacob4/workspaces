import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import TextCardContent01 from "../TextCardContent01";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditDialog from '../EditDialog';
import CustomizedSnackbars from "../Snackbar/Snackbar";

import { config } from "../../helpers/config";

import SimpleCard from "../Card";

import { withFirebase } from "../Firebase";

import { withAuthentication } from '../Session';

let Parser = require("rss-parser");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    position:'fixed',
    bottom: '5%',
    left:'92%',
  },
  gridList: {
    height: 900,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

const NotesGrid = props => {
   const classes = useStyles();

//   const [rssFeed, setrssFeed] = useState([]);
//   const [newsApiFeed, setNewsApiFeed] = useState([]);
    const [noteData, setNoteData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [open,setOpen] = useState(false);
    const [deleted,setDeleted] = useState(false);

    function updateNotes()
    {
        if(!props.firebase.auth.currentUser)
        {
            setTimeout(updateNotes, 1000);
        }
        else
        {
            // console.log(props.firebase.auth.currentUser);
            props.firebase.getNotes((notes)=>{
                // console.log(notes); 
                var notesArray = [];
                var i =0;
                notes.forEach(doc => {
                    notesArray[i] = {'id':doc.id, 'data':doc.data().note};
                    i+=1;
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


//   useEffect(() => {
//     var url = `${config.newsApiTopNews}&apiKey=${config.newsApiKey}`;
//     var req = new Request(url);
//     fetch(req)
//       .then(response => response.json())
//       .then(response => {
//         console.log(response.articles);
//         setNewsApiFeed(response.articles);
//       });
//   }, []);
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
    <EditDialog dialogTitle={'New Note'} id={null} code={placeholder} open={open} setOpen={setOpen} onClose={updateNotes}/>
      <Grid  container justify="left" spacing={5}>
            {noteData.map(obj => {
                return (<Grid item xs={4}>
                    <SimpleCard 
                    id = {obj.id}
                    title={obj.data.title} 
                    content={obj.data.code.slice(0,250)} 
                    note = {obj.data.code}
                    onClose={updateNotes} 
                    onDelete={setDeleted}
                    />
                    
                </Grid>);
            })} 
        </Grid>
            {!loaded && (
                <Grid  container justify="center" spacing={5}>
                
                  <CircularProgress
                    size={50}
                    style={{ marginTop: '20%', position: "relative" }}
                  />
                </Grid>
            )}
        <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon 
            onClick={()=>{setOpen(true)}}
        />
      </Fab>
    </div>

  );
};

export default withAuthentication(withFirebase(NotesGrid));
