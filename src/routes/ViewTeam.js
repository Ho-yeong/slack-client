import React from "react";
import { gql, useQuery } from "@apollo/client";
import { allTeamsQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";

import ApplyLayout from "../components/ApplyLayout";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

import Sidebar from "../container/Sidebar";
import { Redirect } from "react-router-dom";

const ViewTeam = ({
  match: {
    params: { teamId, channelId },
  },
}) => {
  const { loading, error, data } = useQuery(allTeamsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please Login</p>;

  const teams = [...data.allTeams, ...data.inviteTeams];
  console.log(teams);
  // loged in but when there is no team, redirect to create-team page
  if (!teams.length) {
    return <Redirect to="/create-team"></Redirect>;
  }

  // '!!' makes string to boolean
  const teamIdx = !!teamId ? findIndex(teams, ["_id", teamId]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  // if wrong teamid is written
  if (!team) {
    return <Redirect to="/create-team"></Redirect>;
  }

  const channelIdx = !!channelId
    ? findIndex(team.channels, ["_id", channelId])
    : 0;
  const channel =
    channelIdx === -1 ? team.channel[0] : team.channels[channelIdx];

  // { channel && something} === { channel ? something ? null}
  return (
    <ApplyLayout>
      {channel && (
        <Sidebar data={teams} team={team} channelName={channel.name}></Sidebar>
      )}
      {channel && (
        <Messages channelId={channel._id}>
          <ul className="message-list">
            <li></li>
            <li></li>
          </ul>
        </Messages>
      )}
      {channel && <SendMessage channelName={channel.name} />}
    </ApplyLayout>
  );
};

export default ViewTeam;
