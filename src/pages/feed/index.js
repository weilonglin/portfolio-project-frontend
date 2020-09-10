import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Deck from "../../components/Feed/Deck";
import SideNav from "../../components/SideNav/sideNav";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    height: "100vh",
  },
  background: {
    height: "100%",
    backgroundColor: "#fafafa",
  },
  container: {
    minHeight: "100vh",
    width: "100%",
    height: "100%",
  },
}));
export default function Index() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <SideNav />
        <Deck />
      </div>
    </React.Fragment>
  );
}
