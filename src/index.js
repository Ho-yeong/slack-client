import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import "semantic-ui-css/semantic.min.css";
import client from "./apollo";

import Routes from "./routes";
import * as serviceWorker from "./serviceWorker";

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
