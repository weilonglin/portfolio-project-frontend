import React, {useState, useEffect} from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


const useStyles = makeStyles((theme) => ({
  list: {
    width: 500
  },
  fullList: {
    left: "15rem",
    width: "auto"
  },
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function addDog(props) {
  const image2 = props.src === null || props.src === undefined ? null : props.src.imageUrl;
  const name2 = props.name === null ? null : props.name.recipientName;
  const id2 = props.id === null ? null : props.id;
  const userImage = localStorage.getItem("useImg");
  const [active, setActive] = useState(false);
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});
  const user = localStorage.getItem("user");
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown") {
      return;
    }

    setState({
      ...state,
      [anchor]: open
    });
  };
  let usersCopy;

  function toggleActive() {
    if (active === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  const image = props.src;
  const chat = (<div>
    <ListItem key="1">
      <Grid container>
        <Grid item
          xs={12}>
          <ListItem button key="CindyBaker">
            <ListItemText align={
                parseInt(message.userId) === parseInt(user) ? "right" : "left"
              }
              primary={
                message.message
            }></ListItemText>
            <ListItemIcon>
              <Avatar alt="Cindy Baker"
                src={
                  parseInt(message.userId) === parseInt(user) ? userImage : image2
                }
                align={
                  parseInt(message.userId) === parseInt(user) ? "right" : "left"
                }/>
            </ListItemIcon>
          </ListItem>
        </Grid>
      </Grid>
    </ListItem>
  </div>);

  const list = (anchor) => (<div className={
      clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })
    }
    role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    onKeyDown={
      toggleDrawer(anchor, false)
  }>
    <Grid item
      xs={11}>
      <List className={
        classes.messageArea
      }> {chat}</List>
      <Divider/>

      <SendMessages userId={user}
        img={image2}
        recipientName={name2}
        id={id2}/>
    </Grid>
  </div>);

  return (<div>
    <div>
      <div> {
        ["left"].map((anchor) => (<React.Fragment key={anchor}>
          <List>
            <ListItem button
              key={name2}
              onClick={
                toggleDrawer(anchor, true)
            }>
              <ListItemIcon>
                <Avatar alt={name2}
                  src={image2}/>
              </ListItemIcon>
              <ListItemText primary={name2}> {name2}</ListItemText>
            </ListItem>
          </List>
          <Drawer anchor={anchor}
            open={
              state[anchor]
            }
            onClose={
              toggleDrawer(anchor, false)
          }> {
            list(anchor)
          } </Drawer>
        </React.Fragment>))
      } </div>
      {/* <Avatar alt={props.name} src={props.src} onClick={toggleActive} />
        <p> {props.name}</p> */} </div>
    {/* <div className="message">{active === false ? null : chat}</div> */}
    <div></div>
    {/* <myMessages message={chats} active={active} /> */} </div>);
}
