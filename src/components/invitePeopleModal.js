import React from "react";
import { Button, Modal, Input, Form, Message } from "semantic-ui-react";
import InvitePeopleModalBtn from "./InvitePeopleModalBtn";

import { extendObservable } from "mobx";
import { observer } from "mobx-react";

export default observer(
  class InvitePeopleModal extends React.Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        name: "",
        isSubmitting: false,
        errors: {},
      });
    }

    onSubmit = (response) => {
      this.setState({
        isSubmitting: true,
      });
      const { ok } = response;
      if (ok) {
        //window.location.href = `/view-team/${this.props.teamId}/${channel._id}/`;
        this.setState({ name: "" });
        this.name = "";
        this.props.onClose();
      } else {
        this.setState({
          isSubmitting: false,
          emailError: "",
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
        errors: { emailError },
      } = this;
      const errorList = [];

      if (emailError) {
        errorList.push(emailError);
      }
      return (
        <Modal open={this.props.open} onClose={this.props.onClose}>
          <Modal.Header>Invite People to the team</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field error={!!emailError}>
                <Input
                  value={name}
                  onChange={this.onChange}
                  name="name"
                  fluid
                  placeholder="User's Email"
                />
              </Form.Field>
              <Form.Group widths="equal">
                <InvitePeopleModalBtn
                  email={name}
                  onSubmit={this.onSubmit}
                  teamId={this.props.teamId}
                  disabled={this.isSubmitting}
                ></InvitePeopleModalBtn>
                <Button
                  disabled={this.isSubmitting}
                  fluid
                  content="Cancel"
                  labelPosition="right"
                  icon="x"
                  onClick={this.props.onClose}
                  negative
                />
              </Form.Group>
            </Form>
            {errorList.length ? (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            ) : null}
          </Modal.Content>
        </Modal>
      );
    }
  }
);
