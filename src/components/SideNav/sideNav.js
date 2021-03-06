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
  const { data } = useQuery(GET_USER, {
    variables: {
      id: parseInt(user),
    },
  });
  const AddDog = () => {
    props.switch("addDog");
  };

  const { data: msgData } = useQuery(GET_MESSAGES, {
    variables: {
      id: parseInt(user),
    },
  });

  const { data: dogData } = useQuery(GET_ALL_USER_DOGS, {
    variables: {
      id: parseInt(user),
    },
  });

  const msgT = msgData === undefined ? null : msgData["chatMessage"];

  const { loading: subLoading, data: subData } = useSubscription(SUB_MESSAGE, {
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
      msgT === null
        ? null
        : arr
            .map((e) => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e])
            .map((e) => arr[e]);
    return unique;
  }

  useEffect(() => {
    const filtered = getUnique(msgT, "recipient");
    const filtered2 = getUnique(msgT, "sender");
    const filtered3 = filtered !== null ? filtered.concat(filtered2) : null;
    const filtered4 = getUnique(filtered3, "recipientName");
    const filtered5 =
      filtered4 === null
        ? null
        : filtered4.map((filter) => {
            return [filter.recipient, filter.sender];
          });
    const filtered6 = filtered5 === null ? null : filtered5.flat();
    const filtered7 = getUnique(filtered6, "userName");
    setAllnames(filtered7);
    setSender(msgT);
  }, [msgData, msgT]);

  useEffect(() => {
    const subChat = subLoading ? null : subData.chatMessage;
    const subMessages = subLoading ? null : subData.chatMessage;

    const newNames =
      subChat === null
        ? null
        : [...allNames, subChat.sender, subChat.recipient];

    const newMessage = [...sender, subMessages];
    const filtered = getUnique(newNames, "userName");


    setAllnames(filtered);

    setSender(newMessage);
  }, [subData]);

  const userImage = data === undefined ? null : data.user.imageUrl;

  useEffect(() => {
    if (userImage !== null) {
      localStorage.setItem("useImg", data.user.imageUrl);
    }
  }, [userImage]);

  if (!allNames || dogData === undefined || !data) {
    return "...loading";
  }

  return (
    <>
      <Grid className={classes.root} item={true} xs={2}>
        <TopBar />
        <Typography className={classes.heading} component={"span"}>
          My messages
        </Typography>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading} component={"span"}>
              <AvatarGroup max={4}>
                {allNames.length === 0
                  ? "No messages"
                  : allNames.map((user) => {
                      if (user.id !== parseInt(userId)) {
                        return (
                          <Avatar
                            key={`avatar-${user.id}`}
                            alt={user.userName}
                            src={user.imageUrl}
                            className={classes.large}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
              </AvatarGroup>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.spread} component={"span"}>
              {" "}
              {allNames.length === 0
                ? "No messages"
                : allNames.map((user) => {
                    const chatsSender = sender.filter((name) => {
                      if (
                        name.recipientName === user.userName ||
                        parseInt(name.userId) === parseInt(user.id)
                      ) {
                        return name;
                      } else {
                        return null;
                      }
                    });

                    if (user.id !== parseInt(userId)) {
                      return (
                        <Chat
                          key={`chat-${user.id}`}
                          src={user.imageUrl}
                          name={user.userName}
                          id={user.id}
                          messages={chatsSender}
                          data={subData}
                          myName={data.user.userName}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Typography className={classes.heading} component={"span"}>
          My dogs
        </Typography>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading} component={"span"}>
              <AvatarGroup max={3}>
                {" "}
                {dogData.allDogsUser.length === 0
                  ? "Add your first dog!"
                  : dogData.allDogsUser.map((dog) => {
                      return (
                        <Avatar
                          key={`avatarAllDog-${dog.id}`}
                          alt="Remy Sharp"
                          src={dog.imageUrl}
                          className={classes.large}
                        />
                      );
                    })}
              </AvatarGroup>
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
