import React from "react";
import { extendObservable } from "mobx";
import { Input, Container, Header, Form, Message } from "semantic-ui-react";
import { observer } from "mobx-react";
import LoginBtn from "./LoginBtn";

export default observer(
  class Login extends React.Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        email: "",
        password: "",
        errors: {},
      });
    }

    onSubmit = (response) => {
      console.log(response);
      const { ok, token, refreshToken } = response;
      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.props.history.push("/view-team");
      } else {
        this.setState({
          emailError: "",
          passwordError: "",
        });
        this.errors = response;
      }
    };

    onChange = (e) => {
      const { name, value } = e.target;
      this[name] = value;
    };

    render() {
      const {
        email,
        password,
        errors: { emailError, passwordError },
      } = this;
      const errorList = [];

      if (emailError) {
        errorList.push(emailError);
      }
      if (passwordError) {
        errorList.push(passwordError);
      }

      return (
        <Container text>
          <Header as="h2"> Login </Header>
          <Form>
            <Form.Field error={!!emailError}>
              <Input
                onChange={this.onChange}
                name="email"
                value={email}
                placeholder="Email"
                fluid
              />
            </Form.Field>
            <Form.Field error={!!passwordError}>
              <Input
                onChange={this.onChange}
                name="password"
                value={password}
                placeholder="Password"
                type="password"
                fluid
              />
            </Form.Field>
            <LoginBtn
              email={email}
              password={password}
              onSubmit={this.onSubmit}
            />
          </Form>
          {errorList.length ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorList}
            />
          ) : null}
        </Container>
      );
    }
  }
);
