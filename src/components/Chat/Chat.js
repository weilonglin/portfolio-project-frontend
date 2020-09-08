import React, { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { SUB_MESSAGE, GET_ALL_MESSAGES } from "../../graphql/queries";
import myMessages from "./myMessages";
import { GET_USER } from "../../graphql/queries";

export default function Chat(props) {
  console.log("sender chat component", props.messages);
  console.log("props name", props.name);
  const [active, setActive] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [messageFilter, setMessageFilter] = useState([]);
  // const user = localStorage.getItem("user");

  // const { loading, error, data } = useQuery(GET_USER, {
  //   variables: {
  //     id: parseInt(user),
  //   },
  // });
  // console.log("user data in chat component", data);

  // useEffect(() => {

  //   console.log("chats", chats);
  //   if (active === false) {
  //     setMessageFilter([]);
  //   } else {
  //     setMessageFilter([]);
  //     setMessageFilter(chats);
  //   }
  // }, [active]);

  function toggleActive() {
    if (active === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  // const yourMessages =
  //   messageFilter == null
  //     ? null
  //     : messageFilter.map((message) => {
  //         return (
  //           <div>
  //             <p>{message.message}</p>
  //           </div>
  //         );
  //       });
  // console.log("messages state", messages);

  return (
    <div>
      <a onClick={toggleActive}>{props.name}</a>

      {/* <myMessages message={chats} active={active} /> */}
    </div>
  );
}
