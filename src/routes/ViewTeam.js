import React from "react";

import ApplyLayout from "../components/ApplyLayout";
import Header from "../components/Header";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

import Sidebar from "../container/Sidebar";

const ViewTeam = ({ match: { params } }) => (
  <ApplyLayout>
    <Sidebar currentTeamId={params.teamId}></Sidebar>
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

export default ViewTeam;
