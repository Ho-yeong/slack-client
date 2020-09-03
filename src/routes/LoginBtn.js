import React from "react";
import { Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

function LoginBtn(props) {
  const err = {};

  const [newLogin, { loading, error }] = useMutation(loginMutation, {
    onCompleted({ login }) {
      // register : the name of Query in BackEnd
      const { ok, errors } = login;
      if (ok) {
        props.onSubmit(login);
      } else {
        errors.forEach(({ path, message }) => {
          // err[`passwordError`] = "....";
          err[`${path}Error`] = message;
        });
        props.onSubmit(err);
      }
    },
  });
  const login = () => {
    newLogin({
      variables: {
        email: props.email,
        password: props.password,
      },
    });
  };

  return (
    <>
      <Button onClick={login} disabled={loading}>
        Submit
      </Button>
      {error && <p style={{ color: "red" }}>Error :(</p>}
    </>
  );
}

export default LoginBtn;
