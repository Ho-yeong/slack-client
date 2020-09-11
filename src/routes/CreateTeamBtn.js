import React from "react";
import { Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const CreateTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        _id
      }
      errors {
        path
        message
      }
    }
  }
`;

function CreateTeamBtn(props) {
  const err = {};

  const [newCreateTeam, { loading, error }] = useMutation(CreateTeamMutation, {
    onCompleted({ createTeam }) {
      // register : the name of Query in BackEnd
      const { ok, errors } = createTeam;
      if (ok) {
        // eslint-disable-next-line react/prop-types
        props.onSubmit(createTeam);
      } else {
        errors.forEach(({ path, message }) => {
          // err[`passwordError`] = "....";
          err[`${path}Error`] = message;
        });
        // eslint-disable-next-line react/prop-types
        props.onSubmit(err);
      }
    },
    onError() {
      window.location.href = "/login";
    },
  });
  const CreateTeam = () => {
    newCreateTeam({
      variables: {
        // eslint-disable-next-line react/prop-types
        name: props.name,
      },
    });
  };

  return (
    <>
      <Button onClick={CreateTeam} disabled={loading}>
        Submit
      </Button>
      {error && <p style={{ color: "red" }}>Error :(</p>}
    </>
  );
}

export default CreateTeamBtn;
