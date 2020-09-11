import React from "react";
import { gql, useQuery } from "@apollo/client";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import findIndex from "lodash/findIndex";
import decode from "jwt-decode";

const allTeamsQuery = gql`
  {
    allTeams {
      _id
      name
      channels {
        _id
        name
      }
    }
  }
`;

function Sidebar({ currentTeamId }) {
  const { loading, error, data } = useQuery(allTeamsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const teamIdx = currentTeamId
    ? findIndex(data.allTeams, ["_id", currentTeamId])
    : 0;
  const team = data.allTeams[teamIdx];

  console.log(teamIdx);
  let username = "";

  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
    // eslint-disable-next-line
  } catch (err) {}

  return [
    <Teams
      key="team-sidebar"
      currentTeamId={currentTeamId}
      teams={data.allTeams}
      username={username}
    />,
    <Channels
      key="channels-sidebar"
      teamName={team.name}
      channels={team.channels}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />,
  ];
}

export default Sidebar;
