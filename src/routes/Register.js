import React from "react";
import { Input, Container, Header } from "semantic-ui-react";
import RegisterBtn from "./RegisterBtn";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header>Register</Header>
        <Input
          onChange={this.onChange}
          name="username"
          value={username}
          placeholder="Username"
          fluid
        />
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
        <RegisterBtn username={username} password={password} email={email} />
      </Container>
    );
  }
}

export default Register;
