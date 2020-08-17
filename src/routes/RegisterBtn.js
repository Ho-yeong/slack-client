import React from "react";
import { Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(input: { username: $username, email: $email, password: $password })
  }
`;

function RegisterBtn(input) {
  const [newRegister, { loading, error }] = useMutation(registerMutation, {
    onCompleted({ register }) {
      // register : the name of Query in BackEnd
      alert(`${register}`);
    },
  });

  const regist = () => {
    newRegister({
      variables: {
        username: input.username,
        email: input.email,
        password: input.password,
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
