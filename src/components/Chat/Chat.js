import React, { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { SUB_MESSAGE, GET_ALL_MESSAGES } from "../../graphql/queries";
import myMessages from "./myMessages";
import { GET_USER } from "../../graphql/queries";

export default function Chat(props) {
  console.log("sender chat component", props.messages);
  console.log("props name", props.name);
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageFilter, setMessageFilter] = useState([]);
  const user = localStorage.getItem("user");

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id: parseInt(user),
    },
  });
  console.log("user data in chat component", data);

  const chats = loading
    ? null
    : data.user.sender.filter((name) => {
        if (name.recipientName === props.name) {
          return name;
        }
      });

  console.log("chats", chats);

  function toggleActive() {
    if (active === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  console.log("messages state", messages);

  // console.log("DOES IT WORK???? MESSAGES FILTER????", filter);
  return (
    <div>
      <p onClick={toggleActive}>{props.name}</p>
      <myMessages message={props.messages} active={active} />
    </div>
  );
}
