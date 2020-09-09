import React from "react";
import styled from "styled-components";

const ChannelWrapper = styled.div`
  grid-column: 1;
  grid-row: 2 / 5;
  background-color: #3f0e40;
  color: #b4a0b4;
  min-width: 200px;
  max-width: 255px;
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
`;

const TeamNameText = styled.span`
  font-size: 1.2rem;
  font-weight: 900;
  margin-right: 8px;
`;

const channel = ({ id, name }) => <li key={`channel-${id}`}># {name}</li>;

const user = ({ id, name }) => <li key={`user-${id}`}>{name}</li>;

const Channels = ({ teamName, channels, users }) => (
  <ChannelWrapper>
    <TeamName>
      <div>
        <TeamNameText>{teamName}</TeamNameText>
        <i class="fas fa-caret-down"></i>{" "}
      </div>
    </TeamName>
    <div>
      <ul>
        <li>Channels</li>
        {channels.map(channel)}
      </ul>
    </div>
    <div>
      <ul>
        <li>Direct Messages</li>
        {users.map(user)}
      </ul>
    </div>
  </ChannelWrapper>
);

export default Channels;
