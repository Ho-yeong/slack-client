import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const TeamWrapper = styled.div`
  grid-column: 1 /4;
  grid-row: 1;
  background-color: #350d36;
  color: #a695a7;
  display: flex;
  flex-direction: row;
`;

const TeamList = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
`;

const team = ({ _id, name }) => (
  <TeamList key={`team-${_id}`}>
    {" "}
    <Link to={`/view-team/${_id}`}>{name}</Link>
  </TeamList>
);

const Teams = ({ teams, username }) => {
  return (
    <TeamWrapper>
      <Dropdown selection placeholder="Select Team" options={teams.map(team)} />
      {username}
    </TeamWrapper>
  );
};

export default Teams;
