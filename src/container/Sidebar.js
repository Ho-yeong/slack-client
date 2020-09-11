import React from "react";
import { gql, useQuery } from "@apollo/client";
import Channels from "../components/Channels";
import Teams from "../components/Teams";

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
  console.log(data);
  console.log(error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return [
    <Teams teams={data.allTeams} username="User Name" />,
    <Channels
      teamName="Team Name"
      channels={[
        { id: 1, name: "channel1" },
        { id: 2, name: "channel2" },
      ]}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />,
  ];
}

export default Sidebar;
