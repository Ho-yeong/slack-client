import React from "react";
import styled from "styled-components";
import { Header, Icon } from "semantic-ui-react";

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

const header = ({ channelName, onInvitePeopleClick }) => (
  <HeaderWrapper>
    <Header textAlign="left">#{channelName}</Header>
    <div>
      <a href="#invite-people" onClick={onInvitePeopleClick}>
        <Icon name="user plus" size="big" />
      </a>
    </div>
  </HeaderWrapper>
);

export default header;
