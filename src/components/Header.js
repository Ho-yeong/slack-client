import React from "react";
import styled from "styled-components";
import { Header, Icon } from "semantic-ui-react";

const HeaderWrapper = styled.div`
  grid-column: 2;
  grid-row: 2;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
`;

const InviteTeamBtn = styled.div`
  margin: 0 10px;
  display: inline-block;
`;

const header = ({ channelName, onInvitePeopleClick, isOwner }) => (
  <HeaderWrapper>
    <Header textAlign="left">#{channelName}</Header>
    {isOwner && (
      <div>
        <InviteTeamBtn>
          <a href="#invite-people" onClick={onInvitePeopleClick}>
            <Icon name="user plus" size="big" />
          </a>
        </InviteTeamBtn>
      </div>
    )}
  </HeaderWrapper>
);

export default header;
