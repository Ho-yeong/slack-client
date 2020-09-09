import React from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";

const HeaderWrapper = styled.div`
  grid-column: 2;
  grid-row: 2;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
`;

export default ({ channelName }) => (
  <HeaderWrapper>
    <Header textAlign="left">#{channelName}</Header>
  </HeaderWrapper>
);
