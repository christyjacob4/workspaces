import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Editor from "../PublicEditor";
import Preview from "../Preview";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Notes = (props) => {
  const classes = useStyles();
    
  const [code, setCode] = useState(props.code);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Editor code={code} setCode={setCode} id={props.id} title={props.title}/>
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}> */}
          {/* xs=6 */}
          <Preview code={code} />
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Notes;
