import React from "react";
import { Button, Modal, Input, Form } from "semantic-ui-react";
import AddChannelModalBtn from "./AddChannelModalBtn";

import { withFormik } from "formik";

const AddChannelModal = ({
  channelOpen,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  teamId,
}) => {
  return (
    <Modal open={channelOpen} onClose={onClose}>
      <Modal.Header>Make new Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              fluid
              placeholder="type new Channel Name"
            />
          </Form.Field>
          <Form.Group widths="equal">
            <AddChannelModalBtn
              name={values.name}
              onSubmit={handleSubmit}
              teamId={teamId}
              disabled={isSubmitting}
            ></AddChannelModalBtn>
            <Button
              disabled={isSubmitting}
              fluid
              content="Cancel"
              labelPosition="right"
              icon="x"
              onClick={onClose}
              negative
            />
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ name: "" }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    console.log("submitting...");
    setSubmitting(false);
  },
})(AddChannelModal);
