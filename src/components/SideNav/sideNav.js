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
import { SUB_MESSAGE, GET_USER_IMAGE } from "../../graphql/queries";

export default function SideNav(props) {
  const [allNames, setAllnames] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [sender, setSender] = useState([]);
  const [recipient, setRecipient] = useState([]);
  const [chat, setChat] = useState(``);
  const user = localStorage.getItem("user");

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id: parseInt(user),
    },
  });

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

  let id = null;
  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);

    id = user.user;
  } catch (err) {}

  useEffect(() => {
    const chats = loading
      ? null
      : data.user.sender.map((name) => {
          return name.recipientName;
        });

    const senderMessages = loading
      ? null
      : data.user.sender.map((name) => {
          return name;
        });
    const recipientMessages = loading
      ? null
      : data.user.sender.map((name) => {
          return name;
        });

    setAllnames(chats);

    setSender(recipientMessages);

    setRecipient(recipientMessages);
  }, [data]);
  // const subData = sloading ? null :

  useEffect(() => {
    const subChat = subLoading ? null : subData.chatMessage.recipientName;
    const subMessages = subLoading ? null : subData.chatMessage;

    const newNames = [...allNames, subChat];
    const newMessage = [...sender, subMessages];
    setAllnames(newNames);

    setSender(newMessage);
  }, [subData]);

  useEffect(() => {
    const names =
      allNames === null
        ? null
        : allNames.filter((val, id, array) => array.indexOf(val) == id);

    setChatUsers(names);
  }, [allNames]);

  // const avatar =
  //   chatUsers === null
  //     ? null
  //     : chatUsers.map((user) => {
  //         return <Chat name={user} messages={{ sender }} data={{ data }} />;
  //       });

  const avatar =
    sender === null
      ? null
      : chatUsers.map((user) => {
          const chats =
            loading || data == undefined
              ? null
              : data.user.sender.filter((name) => {
                  if (name.recipientName === user) {
                    return name;
                  }
                });

          const image =
            chats == null
              ? null
              : chats.map((chat) => {
                  return chat.imageUrl;
                });

          return (
            <Chat src={image} name={user} messages={chats} data={subData} />
          );
        });

  return (
    <div className="sidenav">
      <TopBar />
      {avatar == undefined ? null : avatar}
      <button className="signOutButton" onClick={logout}>
        Log out
      </button>
    </div>
  );
}
