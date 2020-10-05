import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

import { gql, useMutation } from "@apollo/client";

import { observable } from "mobx";
import { useObserver } from "mobx-react";

const SendMessageWrapper = styled.div`
  grid-column: 2;
  grid-row: 4;
  margin: 20px;
  padding: 10px;
`;

const useFormik = (props) => {
  // useState to keep the same observable around without recreating it on each render
  const [formik] = React.useState(() =>
    observable({
      values: props.initialValues || {},
      touched: {},
    })
  );

  // useMutation
  const [newMessage] = useMutation(createMessageMutation, {
    onCompleted({ createMessage }) {
      console.log(createMessage);
    },
    onError(err) {
      console.log(err);
    },
  });

  const Message = () => {
    newMessage({
      variables: {
        text: formik.values.message,
        channelId: props.channelId,
      },
    });
  };

  // just mutate state, this function itself can be considered an action+reducer
  const handleChange = (fieldName) => (event) => {
    formik.values[fieldName] = event.target.value;
  };

  const handleBlur = (fieldName) => (event) => {
    formik.touched[fieldName] = true;
  };
  const handleSubmit = async () => {
    await Message();
    formik.values.message = "";
  };

  // props will be spread over the form inputs minimizing code necessary to setup such input
  const getFieldProps = (fieldName) => ({
    value: formik.values[fieldName],
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
  });

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    getFieldProps,
    ...formik,
  };
};

const ENTER_KEY = 13;

function SendMessage({ channelName, channelId }) {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    channelId,
  });
  const { getFieldProps, handleChange, handleBlur, handleSubmit } = formik;

  return useObserver(() => (
    <SendMessageWrapper>
      <Input
        onKeyDown={(e) => {
          if (e.keyCode === ENTER_KEY) {
            handleSubmit();
          }
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        name="message"
        fluid
        placeholder={`Message  #${channelName}`}
        {...getFieldProps("message")}
      ></Input>
    </SendMessageWrapper>
  ));
}

const createMessageMutation = gql`
  mutation($channelId: String!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default SendMessage;
