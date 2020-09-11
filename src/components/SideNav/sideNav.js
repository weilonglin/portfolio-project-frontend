import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";

import Chat from "../Chat/Chat";
import { useAuthDispatch } from "../../context/auth";
import { useHistory, Link } from "react-router-dom";
import decode from "jwt-decode";
import { GET_USER } from "../../graphql/queries";
import { useQuery, useSubscription, useLazyQuery } from "@apollo/react-hooks";
import { Avatar, classes, Grid } from "@material-ui/core";
import { array } from "prop-types";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {
  SUB_MESSAGE,
  GET_USER_IMAGE,
  GET_MESSAGES,
  GET_USER_IMAGES,
  GET_ALL_USERS,
  GET_ALL_USER_DOGS,
} from "../../graphql/queries";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Button from "@material-ui/core/Button";

import SignupDog from "../../pages/signupDog";

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
  const [chatUsers, setChatUsers] = useState([]);
  const [sender, setSender] = useState([]);
  const [recipient, setRecipient] = useState([]);
  const [chat, setChat] = useState(``);
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("user");
  const [myPic, setMyPic] = useState("");
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

  const myDogs =
    dogData === null || dogData === undefined ? null : dogData.allDogsUser;
  console.log("my dogs", myDogs);

  const { loading: allLoading, error: allError, data: allData } = useQuery(
    GET_ALL_USERS
  );
  console.log("allUsers", allData);
  const allUserImagesNames =
    allData === undefined || allData === null ? null : allData.allUsers;

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

  const [getImages, { loading: lazyLoading }] = useLazyQuery(GET_USER_IMAGES);

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
  const loadingor = loading === null || undefined ? false : true;
  useEffect(() => {
    const chats =
      msgT === undefined || msgT === null
        ? null
        : msgT.map((name) => {
            return name.recipientName + name.recipientId + name.userId;
          });

    const filtered = getUnique(msgT, "recipientId");
    const filtered2 = getUnique(msgT, "userId");

    const mergethis = [].concat(filtered, filtered2);

    setAllnames(mergethis);

    setSender(msgT);
  }, [msgData, subData, loading, data]);

  useEffect(() => {
    const subChat = subLoading ? null : subData.chatMessage;
    const subMessages = subLoading ? null : subData.chatMessage;

    const newNames = [...allNames, subChat];
    const newMessage = [...sender, subMessages];
    const filtered = getUnique(newNames, "recipientId");
    const filtered2 = getUnique(newNames, "userId");

    const mergethis = [].concat(filtered, filtered2);

    setAllnames(mergethis);

    setSender(newMessage);
  }, [subData]);

  const userImage = data == undefined ? null : data.user.imageUrl;

  useEffect(() => {
    if (userImage !== null) {
      localStorage.setItem("useImg", data.user.imageUrl);
    }
  }, [userImage]);

  const userName = data == undefined ? null : data.user.userName;

  const avatar =
    allNames === null || allNames === undefined
      ? null
      : allNames.map((user) => {
          const chatsSender =
            loading ||
            data == undefined ||
            sender === null ||
            sender === undefined
              ? null
              : sender.filter((name) => {
                  const nameM =
                    name.recipientId === null || name.recipientId === undefined
                      ? null
                      : name.recipientId;
                  const userM =
                    user.recipientId === null || user.recipientId === undefined
                      ? null
                      : user.recipientId;
                  const userM2 =
                    name.recipientId === null || name.recipientId === undefined
                      ? null
                      : name.recipientId;
                  if (
                    nameM === userM ||
                    parseInt(nameM) === parseInt(user.recipientId)
                  ) {
                    return name;
                  }
                });

          const image =
            allUserImagesNames == null
              ? null
              : allUserImagesNames.find((chat) => {
                  const senderName =
                    chatsSender === null ? null : user.recipientName;

                  if (chat.userName === senderName) {
                    return chat;
                  }
                });

          const image3 = image === null ? null : image;

          const user3 =
            image === null || image === undefined ? null : image.userName;

          if (user3 !== userName) {
            return (
              <Chat
                src={image3}
                name={user}
                id={user.recipientId}
                messages={chatsSender}
                data={subData}
                myName={userName}
              />
            );
          }
        });

  const avatar2 =
    allNames === null || allNames === undefined
      ? null
      : allNames.map((user) => {
          const image =
            allUserImagesNames == null
              ? null
              : allUserImagesNames.find((chat) => {
                  const recName =
                    user === null || user === undefined ? null : user;

                  if (
                    chat.id === recName.userId ||
                    chat.id === recName.recipientId
                  ) {
                    return chat;
                  }
                });
          const image3 = image === null ? null : image.imageUrl;
          const user3 = image === null ? null : image.userName;

          if (user3 !== userName) {
            return (
              <Avatar alt="Remy Sharp" src={image3} className={classes.large} />
            );
          }
        });

  const dogAvatar =
    myDogs === null || myDogs === undefined
      ? null
      : myDogs.map((dog) => {
          return (
            <Avatar
              alt="Remy Sharp"
              src={dog.imageUrl}
              className={classes.large}
            />
          );
        });
  const dogAvatar2 =
    myDogs === null || myDogs === undefined
      ? null
      : myDogs.map((dog) => {
          return (
            <Chat
              src={dog.imageUrl}
              name={dog.name}
              id={dog.id}
              tagLine={dog.tagLin}
              data={dog}
              myId={user}
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
              {avatar2 === null ? (
                "No messages"
              ) : avatar2 === [] ? (
                "No messages"
              ) : avatar2.length === 0 ? (
                "No messages"
              ) : (
                <AvatarGroup max={4}>{avatar2}</AvatarGroup>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.spread}>{avatar}</Typography>
          </AccordionDetails>
        </Accordion>
        <Typography className={classes.heading}>My dogs</Typography>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              <AvatarGroup max={3}>{dogAvatar}</AvatarGroup>
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
