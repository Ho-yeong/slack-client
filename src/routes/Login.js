import React from "react";
import { extendObservable } from "mobx";
import { Input, Container, Header, Message, Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import LoginBtn from "./LoginBtn";

export default observer(
  class Login extends React.Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        email: "",
        password: "",
      });
    }

    onSubmit = (response) => {
      console.log(response);
      const { ok, token, refreshToken } = response;
      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      }
    };

    onChange = (e) => {
      const { name, value } = e.target;
      this[name] = value;
    };

    render() {
      const { email, password } = this;

      return (
        <Container text>
          <Header as="h2"> Login </Header>
          <Input
            onChange={this.onChange}
            name="email"
            value={email}
            placeholder="Email"
            fluid
          />
          <Input
            onChange={this.onChange}
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            fluid
          />
          <LoginBtn
            email={email}
            password={password}
            onSubmit={this.onSubmit}
          />
        </Container>
      );
    }
  }
);
