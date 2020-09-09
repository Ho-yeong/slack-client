import React from "react";
import { gql, useQuery } from "@apollo/client";
import Channels from "../components/Channels";

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
    <Channels
      teamName="Team Name"
      channels={data.allTeams}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />,
  ];
}

export default Sidebar;
