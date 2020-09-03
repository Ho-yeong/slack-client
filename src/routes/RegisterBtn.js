import React from "react";
import { Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

function RegisterBtn(props) {
  const err = {};

  const [newRegister, { loading, error }] = useMutation(registerMutation, {
    onCompleted({ register }) {
      // register : the name of Query in BackEnd
      const { ok, errors } = register;
      if (ok) {
        window.location.href = "/";
      } else {
        errors.forEach(({ path, message }) => {
          // err[`passwordError`] = "....";
          err[`${path}Error`] = message;
        });
        props.onSubmit(err);
      }
    },
  });
  const regist = () => {
    newRegister({
      variables: {
        username: props.username,
        email: props.email,
        password: props.password,
      },
    });
  };

  return (
    <>
      <Button onClick={regist} disabled={loading}>
        Submit
      </Button>
      {error && <p style={{ color: "red" }}>Error :(</p>}
    </>
  );
}

export default RegisterBtn;
