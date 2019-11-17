import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import TextCardContent01 from "../TextCardContent01";

import { config } from "../../helpers/config";

import SimpleCard from "../Card";

import { withFirebase } from "../Firebase";

let Parser = require("rss-parser");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
    
    function updateNotes()
    {
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
    
  return (
    <div className={classes.root}>
      <Grid  container justify="left" spacing={5}>
            {noteData.map(obj => {
                return (<Grid item xs={4}>
                    <SimpleCard 
                    id = {obj.id}
                    title={obj.data.title} 
                    content={obj.data.code.slice(0,250)} />
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
    </div>

  );
};

export default withFirebase(NotesGrid);
