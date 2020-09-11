import React from "react";
import styled from "styled-components";

const TeamWrapper = styled.div`
  grid-column: 1 /4;
  grid-row: 1;
  background-color: #350d36;
  color: #a695a7;
  display: flex;
  flex-direction: row;
`;

const SideBarList = styled.ul`
  display: flex;
  list-style: none;
`;

const team = ({ _id, name }) => <li key={`team-${_id}`}>{name}</li>;

const Teams = ({ teams, username }) => (
  <TeamWrapper>
    {username}
    <SideBarList>{teams.map(team)}</SideBarList>
  </TeamWrapper>
);

export default Teams;
