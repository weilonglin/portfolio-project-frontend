import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Deck from "../../components/Feed/Deck";
import SideNav from "../../components/SideNav/sideNav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <SideNav />
        </Grid>
        <Grid item xs={9}>
          <Deck />
        </Grid>
      </Grid>
    </div>
  );
}
