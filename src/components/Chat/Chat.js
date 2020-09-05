import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_MESSAGES } from "../../graphql/queries";

export default function Chat() {
  const { loading, error, data } = useQuery(GET_ALL_MESSAGES);

  if (loading) return "Loading...";
  if (error) return <p>Error! ${error.message}</p>;
  console.log("data", data);

  return (
    <div>
      <h1>MESSAGES</h1>
    </div>
  );
}
