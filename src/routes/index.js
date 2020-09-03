import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

// eslint-disable-next-line react/display-name
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/login" exact component={Login}></Route>
    </Switch>
  </BrowserRouter>
);
