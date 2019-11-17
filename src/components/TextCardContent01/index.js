import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { TextInfoCardContent } from '@mui-treasury/components/cardContent';
import { useBlogCardContentStyles } from '@mui-treasury/styles/cardContent';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow';

const dateOptions = {
  localeMatcher: "lookup",
  hour12: true,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const TextCardContent01 = ({title, date, key, link, content}) => {
  const styles = useBlogCardContentStyles();
  const boxStyle = useLightTopShadowStyles({
    inactive: true, // add this line to disable hover effect
  });
  return (
    <Box width={'100%'} borderRadius={4} classes={boxStyle}>
      <CardContent>
        <TextInfoCardContent
          classes={styles}
          overline={new Date(date).toLocaleString(undefined, dateOptions)}
          heading={title}
          body={content.length > 150 ? `${content.substring(0, 150)}...` : content}
        />
        <Button key = {key} href={link} className={styles.button}>Read more</Button>
      </CardContent>
    </Box>
  );
};


export default TextCardContent01;