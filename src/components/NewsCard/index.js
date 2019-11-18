import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    margin: 'auto',
    borderRadius: 0,
    position: 'relative',
  },
  content: {
    padding: 24,
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: '3px',
    fontWeight: 200,
    fontSize: 12,
  },
  desc:{
      textShadow: '0 0 20px rgba(0, 0, 0, 1)',
  },
  title: {
    color: '#fff',
    letterSpacing: '2px',
    textShadow: '0 0 20px rgba(0, 0, 0, 1)',
  },
}));

const NewsCard = ({title, description, author, url, image, time}) => {
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia classes={mediaStyles} image={image} />
      <CardActionArea onClick={() => {window.open(url, "_blank") }}>
        <CardContent className={styles.content}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            minHeight={360}
            color={'common.white'}
            textAlign={'center'}
          >
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.desc}>{description}</p>
          </Box>
          <Typography className={styles.cta} variant={'overline'}>
            Explore
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};


export default NewsCard;