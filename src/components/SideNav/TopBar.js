import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function TopBar() {
  const userImage = localStorage.getItem("useImg");
  const classes = useStyles();
  return (
    <>
      <ListItem
        button
        key="RemySharp"
        style={{
          padding: "10px",
          background: "linear-gradient(262deg, #ff7854, #fd267d)",
        }}
      >
        <ListItemIcon>
          <Avatar className={classes.large} alt="This is me" src={userImage} />
        </ListItemIcon>
        <ListItemText primary="My profile" style={{ padding: "10px" }}>
          {" "}
        </ListItemText>
      </ListItem>

      <Divider />
    </>
  );
}
