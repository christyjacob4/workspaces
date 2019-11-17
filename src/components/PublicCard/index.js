import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Preview from "../Preview";
import Notes from '../Notes';
import EditDialog from '../PublicEditDialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { withFirebase } from "../Firebase";

const useStyles = makeStyles({
  delete: {
      position: 'relative',
      left:'80%',
  },
  card: {
    padding:10,
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
  },
  pos: {
    marginBottom: 12,
  },
});

const SimpleCard = ({firebase, title, content, note, id, onClose, onDelete}) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [open,setOpen] = useState(false);
  


  return (
    
    <Card className={classes.card}>
    <EditDialog dialogTitle={'Edit Note'} id={id} code={note} title={title} open={open} setOpen={setOpen} onClose={onClose}/>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Preview code={content} />
      </CardContent>
      <CardActions>
        <Button 
            size="small"
            onClick = {()=>{
                console.log("[INFO] In click");
                setOpen(true)
            }}
        >
        Edit
        </Button>
        <IconButton aria-label="delete" className={classes.delete}>
          <DeleteIcon
            onClick={()=>{
                firebase.deletePublicNote(id, ()=>{
                    onClose();
                    onDelete(true);
                })
            }}
            />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withFirebase(SimpleCard);