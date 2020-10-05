import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router
} from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  split
} from "@apollo/client";
import {
  getMainDefinition
} from "@apollo/client/utilities";

import {
  ApolloProvider
} from "@apollo/react-hooks";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import {
  WebSocketLink
} from "@apollo/client/link/ws";

import {
  setContext
} from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const token = localStorage.getItem("token");
const authLink = setContext((_, {
  headers
}) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
});

const splitLink = split(
  ({
    query
  }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

ReactDOM.render( <
  ApolloProvider client = {
    client
  } >
  <
  Router >
  <
  App / >
  <
  /Router> <
  /ApolloProvider>,

  document.getElementById("root")
);

serviceWorker.unregister();