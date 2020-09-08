import React from "react";
import { extendObservable } from "mobx";
import { Input, Container, Header, Form, Message } from "semantic-ui-react";
import { observer } from "mobx-react";
import CreateTeamBtn from "./CreateTeamBtn";

export default observer(
  class CreateTeam extends React.Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        name: "",
        errors: {},
      });
    }

    onSubmit = (response) => {
      console.log(response);
      const { ok, errors } = response;
      if (ok) {
        console.log(ok);
      } else {
        console.log(errors);
        this.setState({
          nameError: "",
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
        name,
        errors: { nameError },
      } = this;
      const errorList = [];

      if (nameError) {
        errorList.push(nameError);
      }

      return (
        <Container text>
          <Header as="h2"> Create a Team </Header>
          <Form>
            <Form.Field error={!!nameError}>
              <Input
                onChange={this.onChange}
                name="name"
                value={name}
                placeholder="name"
                fluid
              />
            </Form.Field>

            <CreateTeamBtn name={name} onSubmit={this.onSubmit} />
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
