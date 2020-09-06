import React from "react";
import { Input, Container, Header, Message, Form } from "semantic-ui-react";
import RegisterBtn from "./RegisterBtn";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  onSubmit = (err) => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: "",
    });
    console.log(err);
    this.setState(err);
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError,
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    // !'' => true, !!'' => false
    return (
      <Container text>
        <Header>Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input
              onChange={this.onChange}
              name="username"
              value={username}
              placeholder="Username"
              fluid
            />
          </Form.Field>
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
          <Form.Field>
            <RegisterBtn
              username={username}
              password={password}
              email={email}
              onSubmit={this.onSubmit}
            />
          </Form.Field>
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

export default Register;
