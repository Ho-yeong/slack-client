import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const SendMessageWrapper = styled.div`
  grid-column: 2;
  grid-row: 4;
  margin: 20px;
`;

const SendMessage = ({ channelName }) => (
  <SendMessageWrapper>
    <Input fluid placeholder={`Message  #${channelName}`}></Input>
  </SendMessageWrapper>
);

export default SendMessage;
