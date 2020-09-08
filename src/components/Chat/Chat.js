import React, { useState, useEffect } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { SUB_MESSAGE, GET_ALL_MESSAGES } from "../../graphql/queries";

export default function Chat(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  );
}
