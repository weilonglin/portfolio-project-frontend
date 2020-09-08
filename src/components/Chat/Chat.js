import React, { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { SUB_MESSAGE, GET_ALL_MESSAGES } from "../../graphql/queries";
import myMessages from "./myMessages";
import { GET_USER } from "../../graphql/queries";

import { Avatar, classes } from "@material-ui/core";

export default function Chat(props) {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const data =
      props.data === undefined
        ? props.messages
        : props.data.chatMessage.recipientName === props.name
        ? [...messages, props.data.chatMessage]
        : props.messages;
    setMessages(data);
  }, [props.data]);

  function toggleActive() {
    if (active === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  }
  const chat =
    messages === null
      ? null
      : messages.map((message) => {
          return <a>{message.message}</a>;
        });
  return (
    <div>
      <Avatar alt={props.name} src={props.src} onClick={toggleActive} />
      <div className="message">{active === false ? null : chat}</div>

      {/* <myMessages message={chats} active={active} /> */}
    </div>
  );
}
