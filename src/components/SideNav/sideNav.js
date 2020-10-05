import React, { useState, useEffect } from "react";

import TopBar from "./TopBar";
import Chat from "../Chat/Chat";
import { useAuthDispatch } from "../../context/auth";
import { useHistory } from "react-router-dom";
import { GET_USER } from "../../graphql/queries";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { Avatar, Grid } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import {
  SUB_MESSAGE,
  GET_MESSAGES,
  GET_ALL_USER_DOGS,
} from "../../graphql/queries";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    alignItems: "top",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    background: "white",
  },
  spread: {
    width: "100%",
  },
  heading: {
    padding: "10px",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function SideNav(props) {
  const [allNames, setAllnames] = useState([]);

  const [sender, setSender] = useState([]);

  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("user");

  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id: parseInt(user),
    },
  });
  const AddDog = () => {
    history.push("/add-dog");
  };

  const { loading: msgLoading, error: msgError, data: msgData } = useQuery(
    GET_MESSAGES,
    {
      variables: {
        id: parseInt(user),
      },
    }
  );

  const { loading: dogLoading, error: dogError, data: dogData } = useQuery(
    GET_ALL_USER_DOGS,
    {
      variables: {
        id: parseInt(user),
      },
    }
  );

  const msgT = msgData === undefined ? null : msgData["chatMessage"];

  const {
    loading: subLoading,
    error: subError,
    data: subData,
  } = useSubscription(SUB_MESSAGE, {
    variables: {
      userId: parseInt(user),
      recipientId: parseInt(user),
    },
  });

  const dispatch = useAuthDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  function getUnique(arr, comp) {
    const unique =
      msgT === undefined || msgT === null
        ? null
        : arr
            .map((e) => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e])
            .map((e) => arr[e]);
    return unique;
  }

  useEffect(() => {
    const filtered = getUnique(msgT, "recipientName");

    setAllnames(filtered);

    setSender(msgT);
  }, [msgData, subData]);

  useEffect(() => {
    const subChat = subLoading ? null : subData.chatMessage;
    const subMessages = subLoading ? null : subData.chatMessage;

    const newNames = [...allNames, subChat];
    const newMessage = [...sender, subMessages];
    const filtered = getUnique(newNames, "recipientName");

    setAllnames(filtered);

    setSender(newMessage);
  }, [subData]);

  const userImage = data == undefined ? null : data.user.imageUrl;

  useEffect(() => {
    if (userImage !== null) {
      localStorage.setItem("useImg", data.user.imageUrl);
    }
  }, [userImage]);

  const userName = data == undefined ? null : data.user.userName;

  const avatar = !allNames
    ? "...loading"
    : allNames.map((user) => {
        const chatsSender = sender.filter((name) => {
          if (
            name.recipientName === user.recipientName ||
            parseInt(name.userId) === parseInt(user.recipientId)
          ) {
            return name;
          }
        });

        if (
          user.userId !== parseInt(userId) &&
          user.recipient.id === parseInt(userId)
        ) {
          return (
            <Chat
              src={user.sender.imageUrl}
              name={user.sender.userName}
              id={user.sender.id}
              messages={chatsSender}
              data={subData}
              myName={userName}
            />
          );
        } else if (
          user.recipientId !== parseInt(userId) &&
          user.recipient.id !== parseInt(userId)
        ) {
          return (
            <Chat
              src={user.recipient.imageUrl}
              name={user.recipient.userName}
              id={user.recipient.id}
              messages={chatsSender}
              data={subData}
              myName={userName}
            />
          );
        }
      });

  const avatar2 = !allNames
    ? "...loading"
    : allNames.map((user) => {
        if (
          user.userId !== parseInt(userId) &&
          user.recipient.id === parseInt(userId)
        ) {
          return (
            <Avatar
              alt="Remy Sharp"
              src={user.sender.imageUrl}
              className={classes.large}
            />
          );
        } else if (
          user.recipientId !== parseInt(userId) &&
          user.recipient.id !== parseInt(userId)
        ) {
          return (
            <Avatar
              alt="Remy Sharp"
              src={user.recipient.imageUrl}
              className={classes.large}
            />
          );
        }
      });

  const dogAvatar =
    dogData === undefined
      ? "...loading"
      : dogData.allDogsUser.map((dog) => {
          return (
            <Avatar
              alt="Remy Sharp"
              src={dog.imageUrl}
              className={classes.large}
            />
          );
        });

  return (
    <>
      <Grid className={classes.root} xs={2}>
        <TopBar />
        <Typography className={classes.heading}>My messages</Typography>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              {" "}
              {avatar2 === null ? (
                "No messages"
              ) : avatar2 === [] ? (
                "No messages"
              ) : avatar2.length === 0 ? (
                "No messages"
              ) : (
                <AvatarGroup max={4}> {avatar2}</AvatarGroup>
              )}{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.spread}>
              {" "}
              {avatar == undefined ? null : avatar}{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Typography className={classes.heading}>My dogs</Typography>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              <AvatarGroup max={3}> {dogAvatar}</AvatarGroup>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Accordion className={classes.spread}>
              <AccordionDetails>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 35,
                    background: "linear-gradient(262deg, #ff7854, #fd267d)",
                    fontSize: "18px",
                  }}
                  size="large"
                  className={classes.button}
                  startIcon={<ControlPointIcon />}
                  color="primary"
                  onClick={AddDog}
                >
                  Add dog
                </Button>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <ExitToAppIcon onClick={logout} className={classes.large}>
          Log out
        </ExitToAppIcon>
      </Grid>
    </>
  );
}
