import React from "react";
import { Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const createChannelMutation = gql`
  mutation($teamId: String!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        _id
      }
      errors {
        path
        message
      }
    }
  }
`;

const AddChannelModalBtn = (props) => {
  const err = {};

  const [newCreateChannel, { loading, error }] = useMutation(
    createChannelMutation,
    {
      onCompleted({ createChannel }) {
        const { ok, errors } = createChannel;
        console.log(loading);
        console.log(createChannel);
        if (ok) {
          // eslint-disable-next-line react/prop-types
          props.onSubmit(createChannel);
        } else {
          errors.forEach(({ path, message }) => {
            // err[`passwordError`] = "....";
            err[`${path}Error`] = message;
          });
          // eslint-disable-next-line react/prop-types
          props.onSubmit(err);
        }
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const CreateChannel = () => {
    newCreateChannel({
      variables: {
        teamId: props.teamId,
        name: props.name,
      },
    });
  };

  return (
    <>
      <Button
        fluid
        content="Complete!"
        labelPosition="right"
        icon="checkmark"
        onClick={CreateChannel}
        disabled={props.disabled}
        positive
      />
      {error && <p style={{ color: "red" }}>Error :(</p>}
    </>
  );
};

export default AddChannelModalBtn;
