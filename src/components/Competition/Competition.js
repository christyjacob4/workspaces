import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CircularProgress, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";

// Components
import { Button } from "../Wrappers";

// config
import {config} from "../../helpers/config";

// function secondsToHuman(seconds) {
//   seconds = Number(seconds);
//   var d = Math.floor(seconds / (3600 * 24));
//   var h = Math.floor((seconds % (3600 * 24)) / 3600);
//   var m = Math.floor((seconds % 3600) / 60);
//   var s = Math.floor(seconds % 60);

//   var dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
//   var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
//   var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
//   var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
//   return dDisplay + hDisplay + mDisplay + sDisplay;
// }

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

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1),
  },
}));

export default function Competition() {
  const classes = useStyles();

  const [competitions, setCompetitions] = useState({
    meta: {},
    objects: [],
  });

  const [loaded, setLoaded] = useState(false);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "event",
      label: "Event",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography>
            <Link
              href={tableMeta.rowData[6]}
              color="inherit"
              className={classes.link}
            >
              {value}
            </Link>
          </Typography>
        ),
      },
    },
    {
      name: "resource",
      label: "Website",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography>
            <Link href={`${"http://"}${value}`}>{value}</Link>
          </Typography>
        ),
      },
    },
    {
      name: "duration",
      label: "Duration",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          new Date(value).toLocaleString(undefined, dateOptions),
      },
    },
    {
      name: "start",
      label: "Start Time",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          new Date(value).toLocaleString(undefined, dateOptions),
      },
    },
    {
      name: "end",
      label: "End Time",
      options: {
        display: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          new Date(value).toLocaleString(undefined, dateOptions),
      },
    },
    {
      name: "href",
      label: "Link",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              // color={states[status.toLowerCase()]}
              color="success"
              size="small"
              className="px-2"
              variant="contained"
            >
              Hey
            </Button>
          );
        },
      },
    },
  ];

  useEffect(() => {
    getCompetitions();
  }, []);

  async function getCompetitions() {
    const options = {
      method: "GET",
      // mode: "no-cors",
      headers: {
        Authorization: `ApiKey ${config.clistUserName}:${config.clistApiKey}`,
      },
    };
    const response = await fetch(
      `${config.corsProxyURL}${config.contestsFetchURL}`,
      options,
    );
    let parsed = await response.json();
    parsed.objects = parsed.objects.map(obj => ({
      ...obj,
      resource: obj.resource.name,
    }));
    console.log(parsed);
    setCompetitions(parsed);
    setLoaded(true);
  }

  const tableOptions = {
    // filter: true,
    filterType: "dropdown",
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <Typography variant="h2">
                Upcoming Contests
                {!loaded && (
                  <CircularProgress
                    size={24}
                    style={{ marginLeft: 15, position: "relative", top: 4 }}
                  />
                )}
              </Typography>
            }
            data={competitions.objects}
            columns={columns}
            options={tableOptions}
          />
        </Grid>
      </Grid>
    </div>
  );
}
