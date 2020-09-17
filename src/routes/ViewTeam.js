import React from "react";
import { gql, useQuery } from "@apollo/client";
import findIndex from "lodash/findIndex";

import ApplyLayout from "../components/ApplyLayout";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

import Sidebar from "../container/Sidebar";

const ViewTeam = ({
  match: {
    params: { teamId, channelId },
  },
}) => {
  const { loading, error, data } = useQuery(allTeamsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please Login</p>;

  // '!!' makes string to boolean
  const teamIdx = !!teamId ? findIndex(data.allTeams, ["_id", teamId]) : 0;
  const team = data.allTeams[teamIdx];

  const channelIdx = !!channelId
    ? findIndex(team.channels, ["_id", channelId])
    : 0;
  const channel = team.channels[channelIdx];

  return (
    <ApplyLayout>
      <Sidebar data={data} team={team} channelName={channel.name}></Sidebar>
      <Messages channelId={channel._id}>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </ApplyLayout>
  );
};

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

export default ViewTeam;
