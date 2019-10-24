import React from "react";
import { Grid } from "@material-ui/core";

// components
import PageTitle from "../PageTitle/PageTitle";
import Competition from "../Competition/Competition";


export default function Dashboard(props) {
  return (
    <>
      <PageTitle title="Dashboard" button="Latest Reports" />
      <Grid container spacing={4}>
        {/* Component for displaying the competitions  */}
        <Grid item xs={12}>
          <Competition />
        </Grid>
      </Grid>
    </>
  );
}
