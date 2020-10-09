import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9)
  },
  title: {
    color: "white",
    marginLeft: "10px"
  }
}));

export default function TopBar() {
  const userImage = localStorage.getItem("useImg");
  const classes = useStyles();
  return (<>
    <ListItem button key="RemySharp"
      style={
        {
          padding: "10px",
          background: "linear-gradient(262deg, #ff7854, #fd267d)"
        }
    }>
      <ListItemIcon>
        <Avatar className={
            classes.large
          }
          alt="This is me"
          src={userImage}/>
      </ListItemIcon>
      <ListItemText className={
        classes.title
      }>
        <h2>My profile</h2>
        {" "} </ListItemText>
    </ListItem>

    <Divider/>
  </>);
}
