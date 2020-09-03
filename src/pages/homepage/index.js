import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_USER, GET_ALL_DOGS } from "../../graphql/queries";
export default function Homepage() {
  const { loading, error, data } = useQuery(GET_ALL_DOGS);

  if (loading) return "Loading...";
  if (error) return <p>Error! ${error.message}</p>;

  console.log("data", data);

  return (
    <div>
      <h1> hi</h1>
    </div>
  );
}
