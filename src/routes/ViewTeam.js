import React from "react";
import { gql, useQuery } from "@apollo/client";
import ApplyLayout from "../components/ApplyLayout";
import Header from "../components/Header";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

import Sidebar from "../container/Sidebar";

const ViewTeam = ({ match: { params } }) => {
  const { loading, error, data } = useQuery(allTeamsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <ApplyLayout>
      <Sidebar currentTeamId={params.teamId} data={data}></Sidebar>
      <Header channelName="anomynous" />
      <Messages>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName="anomynous" />
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
