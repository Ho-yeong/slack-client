import React from "react";
import styled from "styled-components";

const paddingLeft = "padding-left : 10px";
const ChannelWrapper = styled.div`
  grid-column: 1;
  grid-row: 2 / 5;
  background-color: #3f0e40;
  color: #b4a0b4;
`;

const TeamName = styled.div`
  height: 65px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: rgb(82, 38, 83);
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background-color: #350d36;
  }
`;

const TeamNameText = styled.span`
  font-size: 1.2rem;
  font-weight: 900;
  margin-right: 8px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  ${paddingLeft};
`;

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background-color: #350d36;
  }
`;

const Green = styled.span`
  color: #38978d;
  margin-right: 5px;
  text-align: center;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : <Green>○</Green>);

const channel = ({ id, name }) => (
  <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble />
    {name}
  </SideBarListItem>
);

const Channels = ({ teamName, channels, users }) => (
  <ChannelWrapper>
    <TeamName>
      <div>
        <TeamNameText>{teamName}</TeamNameText>
        <i className="fas fa-caret-down"></i>
      </div>
    </TeamName>
    <div>
      <SideBarList>
        <li>Channels</li>
        {channels.map(channel)}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <li>Direct Messages</li>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
);

export default Channels;
