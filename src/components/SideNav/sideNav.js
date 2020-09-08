import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import "./sideNav.css";
import Chat from "../Chat/Chat";
import { useAuthDispatch } from "../../context/auth";
import { useHistory, Link } from "react-router-dom";
import decode from "jwt-decode";
import { GET_USER } from "../../graphql/queries";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { Avatar, classes } from "@material-ui/core";
import { array } from "prop-types";
import { SUB_MESSAGE } from "../../graphql/queries";

export default function SideNav(props) {
  const [allNames, setAllnames] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [messages, setMessages] = useState([]);
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
    setAllnames(chats);
  }, [data]);
  // const subData = sloading ? null :

  useEffect(() => {
    const subChat = subLoading ? null : subData.chatMessage.recipientName;

    const newNames = [...allNames, subChat];
    setAllnames(newNames);
  }, [subData]);

  useEffect(() => {
    const names =
      allNames === null
        ? null
        : allNames.filter((val, id, array) => array.indexOf(val) == id);
    setChatUsers(names);
  }, [allNames]);

  const avatar =
    chatUsers === null
      ? null
      : chatUsers.map((user) => {
          // return <Avatar key={user}>{user}</Avatar>;
          return <p key={user}>{user}</p>;
        });

  return (
    <div className="sidenav">
      <TopBar />

      <Chat name={avatar} data={{ data }} />
      <button className="signOutButton" onClick={logout}>
        Log out
      </button>
    </div>
  );
}
