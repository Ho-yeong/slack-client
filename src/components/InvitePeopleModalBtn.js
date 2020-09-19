import React from "react";
import { Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: String!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const AddChannelModalBtn = (props) => {
  const err = {};

  const [newAddTeamMember, { error }] = useMutation(addTeamMemberMutation, {
    onCompleted({ addTeamMember }) {
      const { ok, errors } = addTeamMember;

      console.log(addTeamMember);
      if (ok) {
        // eslint-disable-next-line react/prop-types
        props.onSubmit(addTeamMember);
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
  });

  const addTeamMember = () => {
    newAddTeamMember({
      variables: {
        teamId: props.teamId,
        email: props.email,
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
        onClick={addTeamMember}
        disabled={props.disabled}
        positive
      />
      {error && <p style={{ color: "red" }}>Error :(</p>}
    </>
  );
};

export default AddChannelModalBtn;
