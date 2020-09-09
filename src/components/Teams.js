import React from "react";
import styled from "styled-components";

const TeamWrapper = styled.div`
  grid-column: 1 /4;
  grid-row: 1;
  background-color: #350d36;
  color: #a695a7;
`;

const Teams = ({ teamName, username }) => (
  <TeamWrapper>
    <div>{teamName}</div>
    <div>{username}</div>
  </TeamWrapper>
);

export default Teams;
