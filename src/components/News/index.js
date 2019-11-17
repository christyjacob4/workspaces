import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";

import { config } from "../../helpers/config";

import TextCardContent01 from "../TextCardContent01";
import NewsCard from "../NewsCard";

let Parser = require("rss-parser");

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 900,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

const News = props => {
  const classes = useStyles();

  const [rssFeed, setrssFeed] = useState([]);
  const [newsApiFeed, setNewsApiFeed] = useState([]);

  useEffect(() => {
    let parser = new Parser();
    parser.parseURL(`${config.corsProxyURL}${config.newsRSS}`, function(
      err,
      rssFeed,
    ) {
      console.log(rssFeed.items);
      setrssFeed(rssFeed.items);
    });
  }, []);

  useEffect(() => {
    var url = `${config.newsApiTopNews}&apiKey=${config.newsApiKey}`;
    var req = new Request(url);
    fetch(req)
      .then(response => response.json())
      .then(response => {
        console.log(response.articles);
        setNewsApiFeed(response.articles);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <div className={classes.root}>
          <GridList cellHeight={'auto'} spacing={20} className={classes.gridList}>
            {rssFeed.map(tile => (
              <TextCardContent01
                title={tile.title}
                date={tile.pubDate}
                content={tile.contentSnippet}
                key={tile.guid}
                link={tile.link}
              />
            ))}
          </GridList>
        </div>
      </Grid>

      <Grid item xs={8}>
        <div className={classes.root}>
          <GridList cellHeight={"auto"} spacing={5} cols={4} className={classes.gridList}>
            {newsApiFeed.map(data => (
              <GridListTile
                key={data.img}
                cols={data.title.split(" ").length < 15 ? 3 : 1}
                rows={data.title.split(" ").length < 15 ? 1 : 2}
              >
                <NewsCard title={data.title} description={data.description} author={data.author} url={data.url} image={data.urlToImage} time={data.publishedAt}/>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Grid>
    </Grid>
  );
};

export default News;
