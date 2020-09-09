import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import "./sideNav.css";
import Chat from "../Chat/Chat";
import { useAuthDispatch } from "../../context/auth";
import { useHistory, Link } from "react-router-dom";
import decode from "jwt-decode";
import { GET_USER } from "../../graphql/queries";
import { useQuery, useSubscription, useLazyQuery } from "@apollo/react-hooks";
import { Avatar, classes } from "@material-ui/core";
import { array } from "prop-types";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import {
  SUB_MESSAGE,
  GET_USER_IMAGE,
  GET_MESSAGES,
} from "../../graphql/queries";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

  const { loading: msgLoading, error: msgError, data: msgData } = useQuery(
    GET_MESSAGES,
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
    // store the comparison  values in array
    const unique =
      msgT === undefined || msgT === null
        ? null
        : arr
            .map((e) => e[comp])

            // store the indexes of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => arr[e])
            .map((e) => arr[e]);

    return unique;
  }

  useEffect(() => {
    const chats =
      msgT === undefined || msgT === null
        ? null
        : msgT.map((name) => {
            return name.recipientName + name.recipientId;
          });

    // console.log("ASDASDASDASDASASDASD", getUnique(msgT, "recipientName"));
    const filtered = getUnique(msgT, "recipientName");
    // console.log("filtered?", filtered);
    setAllnames(filtered);

    setSender(msgT);
  }, [msgData]);
  // const subData = sloading ? null :

  useEffect(() => {
    const subChat = subLoading ? null : subData.chatMessage;
    const subMessages = subLoading ? null : subData.chatMessage;

    const newNames = [...allNames, subChat];
    const newMessage = [...sender, subMessages];
    // console.log("newNames", newNames);
    // console.log("newMessage", newMessage);
    // console.log("ASDASDASDASDASASDASD", getUnique(newNames, "recipientName"));
    const filtered = getUnique(newNames, "recipientName");
    // console.log("filtered?", filtered);

    setAllnames(newNames);
    // console.log("allNames", allNames);
    setSender(newMessage);
  }, [subData]);

  // useEffect(() => {
  //   console.log("allNames", allNames);
  //   const names =
  //     allNames === null || allNames === undefined
  //       ? null
  //       : allNames.map((name) => {
  //           console.log("name??????", name);
  //           return name.recipientName;
  //         });
  //   console.log("filter names", allNames);
  //   setChatUsers(names);
  // }, [allNames]);

  // const avatar =
  //   chatUsers === null
  //     ? null
  //     : chatUsers.map((user) => {
  //         return <Chat name={user} messages={{ sender }} data={{ data }} />;
  //       });
  const userImage = data == undefined ? null : data.user.imageUrl;
  const userName = data == undefined ? null : data.user.userName;

  const avatar =
    allNames === null || allNames === undefined
      ? null
      : allNames.map((user) => {
          // console.log("chatUsers", allNames);
          // console.log("sender", sender);
          // console.log("user recipientname", user);

          const chatsSender =
            loading ||
            data == undefined ||
            sender === null ||
            sender === undefined
              ? null
              : sender.filter((name) => {
                  if (
                    name.recipientName === user.recipientName ||
                    parseInt(name.userId) === parseInt(user.recipientId)
                  ) {
                    return name;
                  }
                });

          const image =
            chatsSender == null
              ? null
              : chatsSender.map((chat) => {
                  return chat.imageUrl;
                });

          if (user !== userName) {
            console.log("user id?", user.recipientId);
            return (
              <Chat
                src={image}
                name={user}
                id={user.recipientId}
                messages={chatsSender}
                data={subData}
                myImage={userImage}
                myName={userName}
                // myPic={data.user.imageUrl}
              />
            );
          }
        });

  console.log("avatar", avatar);

  const avatar2 =
    allNames === null || allNames === undefined
      ? null
      : allNames.map((user) => {
          const chatsSender =
            loading || data == undefined
              ? null
              : sender.filter((name) => {
                  if (
                    name.recipientName === user.recipientName ||
                    parseInt(name.userId) === parseInt(user.recipientId)
                  ) {
                    console.log("nameasdasdasdasd", name);
                    return name;
                  }
                });
          const image =
            chatsSender == null
              ? null
              : chatsSender.map((chat) => {
                  console.log("chatsSender", chat.recipientName);
                  console.log("chatsender and user???", user);
                  if (chat.recipientName === user.recipientName) {
                    console.log("CHAT MAP IMAGE", chat);
                    return chat.imageUrl;
                  }
                });

          return (
            <Avatar alt="Remy Sharp" src={image} className={classes.large} />
          );
        });

  return (
    <div className="sidenav">
      <TopBar />

      <div className={classes.root}>
        <Typography className={classes.heading}>My messages</Typography>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              <AvatarGroup max={7}>{avatar2}</AvatarGroup>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{avatar == undefined ? null : avatar}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <button className="signOutButton" onClick={logout}>
        Log out
      </button>
    </div>
  );
}
