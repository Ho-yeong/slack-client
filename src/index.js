import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes";
import * as serviceWorker from "./serviceWorker";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "same-origin",
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      "x-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refreshToken"),
    },
  }));
  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();

  const token = headers["x-token"];
  const refreshToken = headers["x-refresh-token"];

  if (token) {
    localStorage.setItem("token", token);
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
  return forward(operation);
});

const link = middlewareLink.concat(afterwareLink.concat(httpLink));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
