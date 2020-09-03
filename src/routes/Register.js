import React from "react";
import { Input, Container, Header, Message } from "semantic-ui-react";
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
    // !'' => true, !!' => false
    return (
      <Container text>
        <Header>Register</Header>
        <Input
          error={!!usernameError}
          onChange={this.onChange}
          name="username"
          value={username}
          placeholder="Username"
          fluid
        />
        <Input
          error={!!emailError}
          onChange={this.onChange}
          name="email"
          value={email}
          placeholder="Email"
          fluid
        />
        <Input
          error={!!passwordError}
          onChange={this.onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          fluid
        />
        <RegisterBtn
          username={username}
          password={password}
          email={email}
          onSubmit={this.onSubmit}
        />
        {usernameError || emailError || passwordError ? (
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
