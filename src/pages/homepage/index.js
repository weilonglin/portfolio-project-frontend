import React from "react";

import Deck from "../../components/Homepage/Deck";
import Signup from "../signupUser/index";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";

import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PetsIcon from "@material-ui/icons/Pets";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  appBar: {
    backgroundColor: "transparent",
  },
  toolbar: {
    flexWrap: "wrap",
    color: "#FFFFFF",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "#FFFFFF",
  },
  linkTitle: {
    color: "#FFFFFF",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },

  heroTitle: {
    padding: theme.spacing(8, 0, 6),
    color: "#FFFFFF",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  image: {
    backgroundImage:
      "url(https://art-u1.infcdn.net/articles_uploads/2/2270/Tindog_Main.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default function Homepage(props) {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} xs={12} className={classes.image}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <Typography variant="h4" noWrap className={classes.toolbarTitle}>
              <PetsIcon />
              Dog Tinder
            </Typography>
            <nav>
              <Link
                variant="button"
                href="/signup"
                className={classes.link}
                size="large"
              >
                Sign up
              </Link>
            </nav>
            <Button
              href="/login"
              color="primary"
              variant="contain"
              className={classes.link}
              size="large"
              style={{ backgroundColor: "#fd5068" }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            className={classes.heroTitle}
          >
            Discover. Chat. Meet.
            <Button
              variant="button"
              href="/signup"
              align="center"
              className={classes.linkTitle}
              style={{ backgroundColor: "#fd5068" }}
              size="large"
            >
              Sign up
            </Button>
          </Typography>
        </Container>

        <Container
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography align="center"></Typography>
        </Container>
      </Grid>
    </Grid>
  );
}
