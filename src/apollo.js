import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

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

const httpLinkWithMiddleware = middlewareLink.concat(
  afterwareLink.concat(httpLink)
);

//WebSocket
const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/subscriptions",
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithMiddleware
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
